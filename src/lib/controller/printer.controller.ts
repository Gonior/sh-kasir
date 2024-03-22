import toast from "@teddy-error/svelte-french-toast";
import { IModel } from "../types";

class Printer implements IModel.IClass<IModel.IPrinter> {
	private listInstalledPrinter : {name : string, displayName : string}[]= []
	private listPrinter :IModel.IPrinter[] = []

	public load = async () : Promise<boolean> => {
		this.listInstalledPrinter = await window.electron.ipcRenderer.invoke('get-printers-async')
		this.listPrinter = await window.electron.ipcRenderer.invoke('read-printer-config')

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

	getListPrinterRaw = () : IModel.IPrinter[] => {
		return this.listPrinter
	}
	getListPrinterValidate = () : IModel.IPrinter[] => {
		let result = []
		this.listPrinter.forEach(printer => {
			if(this.isValid(printer.name)) result.push(printer)
		})
		return result
	}
	getListAddonPrinterSkeleton = () : IModel.IPrinter[] => {
		let ps : IModel.IPrinter[] = []
		for (let i = 0; i < 10; i++) {
			const addonPrinter : IModel.IPrinter = {
				_id : `addon-pr-${i+1}`,
				name : '',
				type : 'addon',
				displayName : `Printer Tambahan ${i+1}`
			}
			ps.push(addonPrinter)
		}

		return ps.map((printer) => {
			let findPrinter = this.listPrinter.find((p) => p._id === printer._id)
			if( findPrinter && this.isValid(findPrinter.name)) printer.name = findPrinter.name
			return printer
		})
	}

	getMainPrinter = () : IModel.IPrinter => {
		return this.getListPrinterValidate().find(p => p.type === "main") ?? {name : '', _id : 'main-pr', type : 'main', displayName : 'Printer Kasir'}
	}

	getCopyPrinter = () : IModel.IPrinter => {
		return this.getListPrinterValidate().find(p => p.type === "copy") ?? {name : '', _id : 'copy-pr', type : 'copy', displayName : 'Printer Rekap Pesanan'}
	}

	getAddonPrinters = () : IModel.IPrinter[] => {

		return this.getListPrinterValidate().filter((p: { type: string; }) => p.type === "addon") ?? []
	}

	findPrinter = (_id : string) : IModel.IPrinter => {
		let findPrinter = this.listPrinter.find((p) => p._id === _id)
		if( findPrinter && this.isValid(findPrinter.name)) return findPrinter
		else return this.getListAddonPrinterSkeleton().find(p => p._id === _id) ?? null
	}


	isValid = (name : string) : boolean => {
		if (!name) return false
		return this.getListInstalledPrinter().find(ipr => ipr.name === name) ? true : false
	}

	validatePrinterId = (id : string) : IModel.IPrinter => {
		let printer = this.listPrinter.find(p => p._id === id)
		if(printer) {
			let isInstalled = this.getListInstalledPrinter().find(ipr => ipr.name === printer.name)
			if( isInstalled ) return printer
		}
		return null
	}


	static testPrint = (name : string) => {
		console.log(name)

	}

	static print = async (printer : IModel.IPrinter, data : any, options?) : Promise<boolean> => {
		console.log({printer, data, options})
		return false

	}


}

export default Printer
