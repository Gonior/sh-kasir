import toast from "@teddy-error/svelte-french-toast";
import { IModel, EPrinterID, EPrinterDisplayName, EPrinterType } from "../types";

class Printer {
	private listInstalledPrinter : {name : string, displayName : string}[]= []
	private listConfigPrinter :IModel.IPrinter[] = []

	public load = async () : Promise<boolean> => {
		this.listInstalledPrinter = await window.electron.ipcRenderer.invoke('get-printers-async')
		this.listConfigPrinter= await window.electron.ipcRenderer.invoke('read-printer-config')

		return true
	}
	static save = async (payload: IModel.IPrinter[]) : Promise<boolean> => {
		let response = await window.electron.ipcRenderer.invoke('write-printer-config', payload)
		if(response) {
			toast.success(response, {position : 'top-right'})
			return true
		} else toast.error("Gagal menyimpan konfigurasi", {position : 'top-right'})

		return false
	};

	getListInstalledPrinter = () => {
		return this.listInstalledPrinter
	}

	isValid = (name : string) : boolean => {
		if (!name) return false
		return this.getListInstalledPrinter().find(ipr => ipr.name === name) ? true : false
	}

	getListConfigPrinter = () : IModel.IPrinter[] => {
		return this.listConfigPrinter
	}

	getListConfigPrinterValidate = () : IModel.IPrinter[] => {
		let result = []
		this.listConfigPrinter.forEach(printer => {
			if(this.isValid(printer.name)) result.push(printer)
		})
		return result
	}

	getListAddonPrinterSkeleton = (n=10) : IModel.IPrinter[] => {
		let ps : IModel.IPrinter[] = []
		for (let i = 0; i < n; i++) {
			const addonPrinter : IModel.IPrinter = {
				_id : `${EPrinterID.ADDON_PRINTER}${i+1}`,
				name : '',
				type : 'addon',
				displayName : `${EPrinterDisplayName.ADDON_PRINTER}${i+1}`
			}
			ps.push(addonPrinter)
		}

		return ps.map((printer) => {
			let findPrinter = this.listConfigPrinter.find((p) => p._id === printer._id)
			if( findPrinter && this.isValid(findPrinter.name)) printer.name = findPrinter.name
			return printer
		})
	}

	getMainPrinter = () : IModel.IPrinter => {
		return this.getListConfigPrinterValidate().find(p => p.type === EPrinterType.MAIN) ?? {name : '', _id : EPrinterID.MAIN_PRINTER, type : EPrinterType.MAIN, displayName : EPrinterDisplayName.MAIN_PRINTER}
	}

	getCopyPrinter = () : IModel.IPrinter => {
		return this.getListConfigPrinterValidate().find(p => p.type === EPrinterType.COPY) ?? {name : '', _id : EPrinterID.COPY_PRINTER, type : EPrinterType.COPY, displayName : EPrinterDisplayName.COPY_PRINTER}
	}

	getAddonPrinters = () : IModel.IPrinter[] => {

		return this.getListConfigPrinterValidate().filter((p: { type: string; }) => p.type === EPrinterType.ADDON) ?? []
	}

	findPrinterById = (_id : string) : IModel.IPrinter => {
		let findPrinter = this.getListConfigPrinterValidate().find((p) => p._id === _id)
		if( findPrinter && this.isValid(findPrinter.name)) return findPrinter
		
		return null
	}

	// findPrinterByCategory = (category : IModel.ICategory) : IModel.IPrinter[] => {
	// 	let result = []
	// 	if(category && category.printer && category.printer.length > 0) {
	// 		category.printer.forEach(printer => {
	// 			let findPrinter = this.getListConfigPrinterValidate().find((p) => p._id === printer)
	// 			if( findPrinter && this.isValid(findPrinter.name)) result.push(findPrinter)
	// 		})
	// 	}
		
	// 	return result
	// }

	// findPrinterByMenu = (menu : IModel.IMenu) : IModel.IPrinter[] => {
	// 	let result = []
	// 	if (menu && menu.category && menu.category.printer && menu.category.printer.length > 0) {
	// 		menu.category.printer.forEach(printer => {
	// 			let findPrinter = this.getListConfigPrinterValidate().find((p) => p._id === printer)
	// 			if( findPrinter && this.isValid(findPrinter.name)) result.push(findPrinter)
	// 		})
	// 	}
		
	// 	return result
	// }

	validatePrinterId = (id : string) : IModel.IPrinter => {
		let printer = this.getListConfigPrinterValidate().find(p => p._id === id)
		if(printer) {
			let isInstalled = this.getListInstalledPrinter().find(ipr => ipr.name === printer.name)
			if( isInstalled ) return printer
		}
		return null
	}

	static testPrint = (name : string) => {
		// await window.electron.ipcRenderer.invoke('print', )
		console.log(name)

	}

	static print = async (printer : IModel.IPrinter, data : any, options? : IModel.IConfigPrinter) : Promise<boolean> => {
		try {

			let response = 
			toast.promise(window.electron.ipcRenderer.invoke('print', {printer, data, options}),
				{
					loading : 'Mengirim data ke printer..',
					success  : `Berhasil terkirim ke printer ${printer.name}`,
					error : `Gagal mengirim data printer ${printer.name}`
				}, {
					position : 'top-right'
				})
			
			console.log(response)
			return true
		} catch (error) {
			toast.error(error.message, {position : 'top-right'})
		}
		
		return false

	}


}

export default Printer
