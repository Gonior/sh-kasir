import {toast} from "svelte-sonner";
import { IModel, EPrinterID, EPrinterDisplayName, EPrinterType } from "../types";

class PrinterService {
	private listInstalledPrinter : {name : string, displayName : string}[]= []
	private listConfigPrinter = []

	public load = async () : Promise<boolean> => {
		this.listInstalledPrinter = await window.electron.ipcRenderer.invoke('get-printers-async')
		this.listConfigPrinter= await window.electron.ipcRenderer.invoke('read-printer-config')

		return true
	}
	static save = async (payload) : Promise<boolean> => {
		let response = await window.electron.ipcRenderer.invoke('write-printer-config', payload)
		if(response) {
			toast.success(response)
			return true
		} else toast.error("Gagal menyimpan konfigurasi")

		return false
	};

	/**
	 * Menampilkan list printer yang terpasang dimesin
	 * @returns {{name : string, displayName : string}[]}
	 */
	getListInstalledPrinter = (): { name: string; displayName: string; }[] => {
		return this.listInstalledPrinter
	}
	/**
	 * validasi apakah printer tersebut terpasang dimesin atau tidak
	 * @param name {string}
	 * @returns {boolean}
	 */
	isValid = (name : string) : boolean => {
		if (!name) return false
		return this.getListInstalledPrinter().find(ipr => ipr.name === name) ? true : false
	}

	/**
	 * Menampilkan list printer yang tersimpan di file konfigurasi 
	 * @returns {IModel.IPrinter[]}
	 */
	getListConfigPrinter = () : IModel.IPrinter[] => {
		return this.listConfigPrinter
	}

	/**
	 * Menampilkan list printer yang tersimpan di file konfigurasi 
	 * 
	 * dan sudah divalidasi apakah printer tersebut terpasang dimesin atau tidak
	 * 
	 * @returns {IModel.IPrinter[]}
	 */
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
	/**
	 * Khusus untuk menapilkan saja!
	 * jika diperuntukan proses cetak gunakanan function {@linkcode findPrinterValidateById()}
	 * @param _id {string}
	 * @returns {IModel.IPrinter}
	 */
	findPrinterById = (_id : string) : IModel.IPrinter => {
		let findPrinter = this.getListConfigPrinter().find((p) => p._id === _id)
		if( findPrinter ) {
			if (this.isValid(findPrinter.name)) return findPrinter 
			else return {name : '', _id : findPrinter._id, type : findPrinter.type, displayName : findPrinter.displayName} as IModel.IPrinter
		}
		
		return undefined
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

	/**
	 * Meskipun ada di konfigurasi, harus dilakukan validasi!
	 * Apakah Printer tersebuh terpasang di mesin atau tidak.
	 * @param _id {string}
	 * @returns {IModel.IPrinter}
	 */
	findPrinterValidateById = (id : string) : IModel.IPrinter => {
		let findPrinter = this.getListConfigPrinterValidate().find(p => p._id === id)
		if( findPrinter && this.isValid(findPrinter.name)) return findPrinter

		return undefined
	}

	static print = async (printer : IModel.IPrinter, data : any, options? : any) : Promise<string> => {
		return new Promise((resolve, reject) => {
			try {
				resolve(window.electron.ipcRenderer.invoke('print', {printer, data, options}))
			} catch (err) {
				reject(err)
			}
		})
	}
}

export default PrinterService

