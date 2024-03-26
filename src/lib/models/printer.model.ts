import PrinterService from "../services/printer.service"
import { Constant, IModel, IRemote } from "../types"
import {toast} from 'svelte-sonner'

class Printer  {
    private _id : string
    private name : string
    private type : "main" | "copy" | "addon"
    private displayName : string
    protected service : PrinterService = new PrinterService()

    constructor(props : IModel.IPrinter) {
        this._id = props._id
        this.name = props.name
        this.displayName = props.displayName
        this.type = props.type
    }

    isValidPrinter = async () : Promise<boolean> => {
        await this.service.load()
        return this.service.isValid(this.name)
    }

    private getProperties = () => {
        return {_id : this._id, name : this.name, type : this.type, displayName : this.displayName} as IModel.IPrinter
    }

    testPrint = async () : Promise<void> => {
        
        if(await this.isValidPrinter()) {
            toast.promise(PrinterService.print(this.getProperties(), Constant.TEST_BILL_PRINT ,
                // coOptions { whiteSpace : true }
                {logo : true, storeInfo : true, summarize : true, price : true, whiteSpace : false}
                ), {
                loading : 'Mengirim data ...',
                success : (response) => {
                    return response
                },
                error : 'Gagal mengirim data ke printer ..'
            })
        } else toast.error('Printer tidak valid!')
    }

    print = async (data : any, options? : IRemote.IConfigPrinter) : Promise<void> => {
        // co print options { whiteSpace : true }
        // bill print options {logo : true, storeInfo : true, summarize : true, price : true, whiteSpace : false}
        if(await this.isValidPrinter()) {
            toast.promise(PrinterService.print(this.getProperties(), data,{...options}), {
                loading : 'Mengirim data ...',
                success : (response) => {
                    return response
                },
                error : 'Gagal mengirim data ke printer ..'
            })
        } else toast.error('Printer tidak valid!')
    }

}

export default Printer