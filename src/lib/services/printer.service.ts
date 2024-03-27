import {toast} from "svelte-sonner";
import { IModel, EPrinterID, EPrinterDisplayName, IRemote } from "../types";

class PrinterService {
	private listInstalledPrinter : {name : string, displayName : string}[]= []
	private configJson : IRemote.IConfigPrinterFile

	public load = async () : Promise<boolean> => {
		this.listInstalledPrinter = await window.electron.ipcRenderer.invoke('get-printers-async')
		this.configJson = await window.electron.ipcRenderer.invoke('read-printer-config')
		if (this.configJson) {
			if (!this.configJson.main || !this.isValid(this.configJson.main.name)) this.configJson.main = {_id : EPrinterID.MAIN_PRINTER, displayName : EPrinterDisplayName.MAIN_PRINTER, name : ""}
			if (!this.configJson.copy || !this.isValid(this.configJson.copy.name))	this.configJson.copy = {_id : EPrinterID.COPY_PRINTER, displayName : EPrinterDisplayName.COPY_PRINTER, name : ""}
			if (this.configJson.addon && this.configJson.addon.length > 0) {
				this.configJson.addon = this.configJson.addon.map(addonP => {
					if(!this.isValid(addonP.name)) addonP.name = ""
					return addonP
				})
			} else {
				this.configJson.addon = []

				for (let i = 0; i < 10; i++ ) {
					this.configJson.addon.push({
						name : "",
						_id : EPrinterID.ADDON_PRINTER+(i+1),
						displayName : EPrinterDisplayName.ADDON_PRINTER+(i+1)
					})
				}
			}
		}
		return true
	}
	static save = async (payload : IRemote.IConfigPrinterFile) : Promise<boolean> => {
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
	getConfigJson = () : IRemote.IConfigPrinterFile => {
		return this.configJson
	}

	useCopyPrinter = () : boolean => {
		return this.configJson.useCopyPrinter
	}

	useAddonPrinter = () : boolean => {
		return this.configJson.useAddonPrinter
	}

	getMainPrinter = () : IModel.IPrinter => {
		if (this.configJson && this.configJson.main && this.isValid(this.configJson.main.name)) return this.configJson.main

		return {_id : EPrinterID.MAIN_PRINTER, displayName : EPrinterDisplayName.MAIN_PRINTER, name : ""}
	}

	getCopyPrinter = () : IModel.IPrinter => {
		if (this.configJson && this.configJson.copy && this.isValid(this.configJson.copy.name)) return this.configJson.copy

		return {_id : EPrinterID.COPY_PRINTER, displayName : EPrinterDisplayName.COPY_PRINTER, name : ""}
	}

	getAddonPrinters = () : IModel.IPrinter[] => {

		return this.configJson.addon
	}
	/**
	 * Mencari printer tambahan dengan id
	 * 
	 * @param _id {string}
	 * @returns {IModel.IPrinter}
	 */
	findAddonPrinterById = (_id : string) : IModel.IPrinter|null => {
		return this.getAddonPrinters().find((p) => p._id === _id) ?? null
	}

	static print = async (printer : IModel.IPrinter, data : any, options? : IRemote.IConfigPrint) : Promise<string> => {
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

