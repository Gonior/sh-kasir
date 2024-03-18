import toast from "@teddy-error/svelte-french-toast";
import { IModel } from "../types";

class Printer implements IModel.IClass<IModel.Printer> {
	private listPrinterName = []
	private listPrinter :IModel.Printer[] = []

	public normalize = (name : string, type : any, _id?: any, displayName?: any) : IModel.Printer => {
		let obj = {
			name : name,
			type : type,
			_id : _id ? _id : `printer-${type}`,
			displayName : displayName ? displayName : null
		}

		return obj as IModel.Printer
	}
	public load = async () : Promise<boolean> => {
		this.listPrinterName = await window.electron.ipcRenderer.invoke('list-printer')
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
	getListPrinterName = () => {
		return this.listPrinterName
	}
	getListPrinter= () : IModel.Printer[] => {
		return this.listPrinter
	}
	getMainPrinter = () : IModel.Printer => {
		return this.listPrinter.find(p => p.type === "main") ?? null
	}
	getMainPrinterName = () : string => {
		return this.listPrinter.find(p => p.type === "main")?.name ?? ''
	}
	getCopyPrinter = () : IModel.Printer => {
		return this.listPrinter.find(p => p.type === "copy") ?? null
	}
	getCopyPrinterName = () : string => {
		return this.listPrinter.find(p => p.type === "copy")?.name ?? ""
	}
	getAddsPrinter = () : IModel.Printer[] => {
		return this.listPrinter.filter((p: { type: string; }) => p.type === "adds") ?? []
	}

	findPrinter = (_id : string) : IModel.Printer => {
		return this.listPrinter.find((p) => p._id === _id) ?? null
	}

	static isValid = (printer : IModel.Printer) : boolean => {
		if(printer.name !== "") return true
		return false
	}

	static generateObjectPrinter = (name : string, type : any, _id?, displayName?) : IModel.Printer => {
		let obj = {
			name : name,
			type : type,
			_id : _id ? _id : `printer-${type}`,
			displayName : displayName ? displayName : null
		}

		return obj as IModel.Printer
	}
	static testPrint = (name : string) => {
		console.log(name)

	}

	static print = async (printer : IModel.Printer, data : any, options?) : Promise<boolean> => {
		console.log({printer, data, options})
		return false
		// throw 'Not Implement yet'
	}


}

export {Printer}
