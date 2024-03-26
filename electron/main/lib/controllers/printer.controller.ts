import {ThermalPrinter, BreakLine, PrinterTypes} from 'node-thermal-printer'
import type { IModel } from '../types'
import logo from '../../../../resources/logo.png?asset'
import {isValidObject, convertToRupiah} from '../utils'
import nodePrinter from '@woovi/node-printer'
import child_process from 'child_process'

import util from 'util'
const exec = util.promisify(child_process.exec);
class Printer {
    private _thermalPrinter : ThermalPrinter
    private _printer : IModel.IPrinter
    private _nodePrinter: { getPrinter: any; getPrinters?: () => nodePrinter.PrinterDetails[]; getPrinterDriverOptions?: (printerName: string) => nodePrinter.PrinterDriverOptions; getSelectedPaperSize?: (printerName: string) => string; getDefaultPrinterName?: () => string; printDirect?: (options: nodePrinter.PrintDirectOptions) => void; printFile?: (options: nodePrinter.PrintFileOptions) => void; getSupportedPrintFormats?: () => string[]; getJob?: (printerName: string, jobId: number) => nodePrinter.JobDetails; setJob?: (printerName: string, jobId: number, command: string) => void; getSupportedJobCommands?: () => string[] } 
    constructor(printer : IModel.IPrinter) {
        this._thermalPrinter = this.initPrinter(printer)
        this._printer = printer
        this._nodePrinter = nodePrinter
    }

    private initPrinter = (printer : IModel.IPrinter) => {
        let thermalPrinter = new ThermalPrinter({
            type : PrinterTypes.EPSON,
            interface : printer.connectivity !== "network"? `printer:${printer.name}` : `tcp://${printer.ipAdress}`,
            removeSpecialCharacters : false,
            driver : nodePrinter,
            breakLine : BreakLine.WORD,
            options : {
                timeout : 3000
            }
        })
        return thermalPrinter
    }

    print = async (data : IModel.IBill, options? : IModel.IConfigPrinter) => {

        /** 
         * Mencetak logo 
        */
        if (options.logo) {
            this._thermalPrinter.alignCenter()
            await this._thermalPrinter.printImage(logo).catch(err => console.log(err))
        }

        /**
         * mencetak informasi toko, contoh :
         *          NAMA TOKO ANDA
         *    JL. KITA MASIH PANJANG NO.X
         *       Telp. 021-XXXXXXXXX
         *      No. Hp. 081xxxxxxxxxx
         * ------------------------------------
         */
        if (options.storeInfo && isValidObject(data.storeInfo)) {
            this._thermalPrinter.newLine()
            this._thermalPrinter.println(data.storeInfo.name)
            this._thermalPrinter.setTextSize(0, 0)
            if(data.storeInfo.address)
            this._thermalPrinter.println(data.storeInfo.address)
            if(data.storeInfo.phone)
            this._thermalPrinter.println(`Telp. ${data.storeInfo.phone}`)
            if(data.storeInfo.mobilePhone)
            this._thermalPrinter.println(`No. Hp. ${data.storeInfo.mobilePhone}`)
            this._thermalPrinter.drawLine()
        }

        // mencetak informasi Bill
        //
        // #202425030001
        // TANGGAL         25-03-2024 14:00
        // KASIR                    KASIR 1
        // ---------------------------------
        //             PELANGGAN
        //                 7
        // ---------------------------------

        if(isValidObject(data.billInfo)) {
            this._thermalPrinter.alignLeft()
            this._thermalPrinter.println(data.billInfo.invoice)
            this._thermalPrinter.leftRight('TANGGAL', data.billInfo.date)
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
            this._thermalPrinter.println(`TOTAL ITEM ${totalitems}`)
            this._thermalPrinter.drawLine()
            this._thermalPrinter.alignLeft()
        }
        

        // mencetak ringkasan pembayaran
        //
        // subtotal         25-03-2024 14:00
        // KASIR                    KASIR 1
        // ---------------------------------
        //             PELANGGAN
        //                 7
        // ---------------------------------
        if (options.summarize && isValidObject(data.summarize)) {
            this._thermalPrinter.leftRight('SUBTOTAL', `${convertToRupiah(data.summarize.subtotal)}`)
            if (isValidObject(data.summarize.discount) && data.summarize.discount.value !== 0) {
                let str = ''
                if (data.summarize.discount.percentage !== 0) str = `DISKON (${data.summarize?.discount?.percentage}%)`
                else str = 'DISKON'
                this._thermalPrinter.leftRight(str, `-${convertToRupiah(data.summarize?.discount?.value)}`)
            }
            if (isValidObject(data.summarize.tax) && data.summarize.tax.checked && data.summarize.tax.value) this._thermalPrinter.leftRight(`${data.summarize.tax.name} ${data.summarize.tax.value}%`, `${convertToRupiah(data.summarize.tax.value)}`)
            else if (isValidObject(data.summarize.tax) && data.summarize.tax.value) this._thermalPrinter.leftRight(`Pajak`, `${convertToRupiah(data.summarize.tax.value)}`)
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

        this._thermalPrinter.cut()
        this._thermalPrinter.getStatus()
        try {
			await this._thermalPrinter.execute({ waitForResponse: true , docname : data.billInfo?.invoice ?? 'doc'})
			return `Data berhasil dikirim ke ${this._printer.displayName}`
		} catch (error) {

			return new Error(error)
		}
            
    }
    private getIpAdress = () : string => {
        let printer = this._nodePrinter.getPrinter(this._printer.name)
        let pattern = new RegExp(/^[ip_]+[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/,'i')
        let ipAddress : string
        if(printer && printer.portName && pattern.test(printer.portName)) {
            ipAddress = printer.portName.replace('IP_','')
        }
    
        return ipAddress
    }

    getConnection = async () : Promise<boolean> => {
        let ipAddress = this.getIpAdress()
        
        if(ipAddress) {
            let networkPrinter = this._printer
            networkPrinter.connectivity = 'network'
            networkPrinter.ipAdress = ipAddress
            let thermalPrinter = this.initPrinter(networkPrinter)
            
            return await thermalPrinter.isPrinterConnected()
        }

        return false
    }

    getPrinterJobs = () : any[] => {
        let printer : {jobs : unknown} = this._nodePrinter.getPrinter(this._printer.name)
        /**
         * merubah properti nodepriter.jobs {[]|null|undefined} menjadi []
         */
        if (printer && printer.jobs && typeof printer.jobs === 'object' && Array.isArray(printer.jobs)) return printer.jobs
        
        
        return []
    }

    
    
    pingHostname = async () : Promise<boolean> => {
        
        
        try {
            
            let ipAddress = this.getIpAdress()
        
            if( ipAddress ) {
                const {stdout} = await exec(`ping -n 5 ${ipAddress}`);
                if(stdout && stdout.toString().includes('bytes')) return true
            }
          
        } catch (err) {
          console.log(err);
        }
        return false
    }

}

export default Printer

