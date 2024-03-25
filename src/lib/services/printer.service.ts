import { IModel, EPrinterID, EPrinterDisplayName, EPrinterType } from "../types";

class PrinterService {
    private listInstalledPrinter : {name : string, displayName : string}[]= []
	private listConfigPrinter :IModel.IPrinter[] = []

    init = async () : Promise<boolean> => {
        this.listInstalledPrinter = await window.electron.ipcRenderer.invoke('get-printers-async')
		this.listConfigPrinter= await window.electron.ipcRenderer.invoke('read-printer-config')
        
		return true
    }
}

export default PrinterService