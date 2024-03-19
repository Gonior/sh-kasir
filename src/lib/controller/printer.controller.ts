import toast from "@teddy-error/svelte-french-toast";
import { IModel } from "../types";

class Printer implements IModel.IClass<IModel.Printer> {
	private listInstalledPrinter : {name : string, displayName : string}[]= []
	private listPrinter :IModel.Printer[] = []

	public load = async () : Promise<boolean> => {
		this.listInstalledPrinter = await window.electron.ipcRenderer.invoke('get-printers-async')
		this.listPrinter = await window.electron.ipcRenderer.invoke('read-printer-config')

		return true
	}
	static save = async (payload: IModel.Printer[]) : Promise<boolean> => {
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

	getListPrinterRaw = () : IModel.Printer[] => {
		return this.listPrinter
	}
	getListPrinterValidate = () : IModel.Printer[] => {
		let result = []
		this.listPrinter.forEach(printer => {
			if(this.isValid(printer.name)) result.push(printer)
		})
		return result
	}
	getListAddonPrinterSkeleton = () : IModel.Printer[] => {
		let ps : IModel.Printer[] = []
		for (let i = 0; i < 10; i++) {
			const addonPrinter : IModel.Printer = {
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

	getMainPrinter = () : IModel.Printer => {
		return this.getListPrinterValidate().find(p => p.type === "main") ?? {name : '', _id : 'main-pr', type : 'main', displayName : 'Printer Kasir'}
	}

	getCopyPrinter = () : IModel.Printer => {
		return this.getListPrinterValidate().find(p => p.type === "copy") ?? {name : '', _id : 'copy-pr', type : 'copy', displayName : 'Printer Rekap Pesanan'}
	}

	getAddonPrinters = () : IModel.Printer[] => {

		return this.getListPrinterValidate().filter((p: { type: string; }) => p.type === "addon") ?? []
	}

	findPrinter = (_id : string) : IModel.Printer => {
		let findPrinter = this.listPrinter.find((p) => p._id === _id)
		if( findPrinter && this.isValid(findPrinter.name)) return findPrinter
		else return this.getListAddonPrinterSkeleton().find(p => p._id === _id) ?? null
	}



	public isValid = (name : string) : boolean => {
		if (!name) return false
		return this.getListInstalledPrinter().find(ipr => ipr.name === name) ? true : false
	}


	static testPrint = (name : string) => {
		console.log(name)

	}

	static print = async (printer : IModel.Printer, data : any, options?) : Promise<boolean> => {
		console.log({printer, data, options})
		return false

	}


}

export {Printer}
