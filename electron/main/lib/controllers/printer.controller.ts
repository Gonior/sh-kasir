import {ThermalPrinter, BreakLine, PrinterTypes} from 'node-thermal-printer'
import type { IModel } from '../types'
import logo from '../../../../resources/logo.png'
import {isValidObject, convertToRupiah} from '../utils'
import nodePrinter from '@woovi/node-printer'
import child_process from 'child_process'
import util from 'util'
const exec = util.promisify(child_process.exec);
class Printer {
    private _thermalPrinter : ThermalPrinter
    private _printer : IModel.IPrinter
    private _nodePrinter
    constructor(printer : IModel.IPrinter) {
        this._thermalPrinter = new ThermalPrinter({
            type : PrinterTypes.EPSON,
            interface : printer.connectivity !== "network"? `printer:${printer.name}` : `tcp://${printer.name}`,
            removeSpecialCharacters : false,
            driver : nodePrinter,
            breakLine : BreakLine.WORD,
            options : {
                timeout : 3000
            }
        })
        this._printer = printer
        this._nodePrinter = nodePrinter
    }

    get thermalPrinter() {
        return this._thermalPrinter
    }

    print = async (data : IModel.IBill, options : IModel.IConfigPrinter = {
        logo : false,
        storeInfo : false,
        price : false,
        summarize : false,
        whiteSpace : false
    }) => {
        if (options.logo) {
            this._thermalPrinter.alignCenter()
            await this._thermalPrinter.printImage(logo)
        }
        if (options.storeInfo && isValidObject(data.storeInfo)) {
            this.thermalPrinter.newLine()
            this.thermalPrinter.println(data.storeInfo.name)
            this.thermalPrinter.setTextSize(0, 0)
            this.thermalPrinter.println(data.storeInfo.address)
            this.thermalPrinter.println(`Telp. ${data.storeInfo.phone}`)
            if(data.storeInfo.mobilePhone)
            this.thermalPrinter.println(`No. Hp. ${data.storeInfo.mobilePhone}`)
            this.thermalPrinter.drawLine()
        
        }

        if(isValidObject(data.billInfo)) {
            this._thermalPrinter.alignLeft()
            this._thermalPrinter.leftRight('TANGGAL', data.billInfo.date)
            this._thermalPrinter.leftRight('INVOICE', data.billInfo.invoice)
            this._thermalPrinter.leftRight('KASIR', data.billInfo.user as string)
            this._thermalPrinter.drawLine()
            this._thermalPrinter.alignCenter()
            this._thermalPrinter.println('PELANGGAN')
            this._thermalPrinter.bold(true)
            this._thermalPrinter.setTextSize(0, 0)
            this._thermalPrinter.println(data.billInfo.customer as string)
            this._thermalPrinter.bold(false)
            this._thermalPrinter.drawLine()
            this._thermalPrinter.alignLeft()
        }

        let totalitems = 0
        for (const item of data.items) {
            if(isValidObject(item)) {
                
                if (Object.hasOwn(item, 'qty') && Object.hasOwn(item, 'price') && Object.hasOwn(item, 'total')) {
                    if(options.price) {
                        this._thermalPrinter.println(`${item.qty} x ${item.name}`)
                        this._thermalPrinter.leftRight(`@${convertToRupiah(item.price)}`, convertToRupiah(item.total))
                    } else {
                        this._thermalPrinter.println(`     ${item.qty} x ${item.name}`)
                    }
                    totalitems += item.qty
                } else if (Object.hasOwn(item, 'forId') && !options.price) this._thermalPrinter.println(`       - ${item.name}`)
                if(options.whiteSpace) {
                    this._thermalPrinter.newLine()
                }
            }
        }

        if(totalitems) {
            this._thermalPrinter.alignCenter()
            this._thermalPrinter.println(`${totalitems}`)
            this._thermalPrinter.alignLeft()
        }
        
        if (options.summarize && isValidObject(data.summarize)) {
            this._thermalPrinter.leftRight('SUBTOTAL', `${convertToRupiah(data.summarize.subtotal)}`)
            if (isValidObject(data.summarize.discount) && data.summarize.discount.value !== 0) {
                let str = ''
                if (data.summarize.discount.percentage !== 0) str = `DISKON (${data.summarize?.discount?.percentage}%)`
                else str = 'DISKON'
                this._thermalPrinter.leftRight(str, `-${convertToRupiah(data.summarize?.discount?.value)}`)
            }
            if (data.summarize.tax.checked && isValidObject(data.summarize.tax) && data.summarize.tax.value) this._thermalPrinter.leftRight(`${data.summarize.tax.name} ${data.summarize.tax.value}%`, `${convertToRupiah(data.summarize.tax.value)}`)
            else if (data.summarize.tax.value) this._thermalPrinter.leftRight(`Pajak`, `${convertToRupiah(data.summarize.tax.value)}`)
            if (data.summarize.downpayment) this._thermalPrinter.leftRight('DP', `-${convertToRupiah(data.summarize.downpayment)}`)
            this._thermalPrinter.drawLine()
            this._thermalPrinter.bold(true)
            this._thermalPrinter.leftRight('TOTAL', `${convertToRupiah(data.summarize.grandtotal)}`)
            this._thermalPrinter.bold(false)
            this._thermalPrinter.drawLine()
            this._thermalPrinter.leftRight('TUNAI', `${convertToRupiah(data.summarize.cash)}`)
            this._thermalPrinter.leftRight('KEMBALIAN', `${convertToRupiah(data.summarize.change)}`)
            this._thermalPrinter.drawLine()
            this._thermalPrinter.alignCenter()
        }
        
        if (options.storeInfo && isValidObject(data.storeInfo) && data.storeInfo.footerNote) {
            this._thermalPrinter.print(data.storeInfo.footerNote)
        }

        try {
			let status = await this._thermalPrinter.execute({ waitForResponse: true , docname : data.billInfo.invoice})
			return {printer : this._printer, status}
		} catch (error) {

			return new Error(error)
		}
            
    }

    pingHostname = async () => {
        try {
            return this._thermalPrinter.isPrinterConnected
            // let printer = this._nodePrinter.getPrinter(this._printer.name)
            // let pattern = new RegExp(/^[ip_]+[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/,'i')
            // let ipAddress : string
            // if(printer && printer.portName && pattern.test(printer.portName)) {
            //     ipAddress = printer.portName.replace('IP_','')
            // }
        
            // if(ipAddress) {
            //     const {stdout} = await exec(`ping -n 5 ${ipAddress}`);
            //     console.log(stdout)
            //     if(stdout && stdout.toString().includes('bytes')) return true
            // }
          return false
        } catch (err) {
          // console.log(err);
          return false
        }
      }

}

export default Printer

