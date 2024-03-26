import CategoryService from "../services/category.service"
import type { IModel } from "../types"
import {toast} from 'svelte-sonner'

class Category {
    private __id : string
    private _name : string
    private _printer : string[] | IModel.IPrinter[] = []

    // getMenu = () => {}
    // getPrinter = () => {} ? apa bedanya sama CategoryService.findPrinterValidateById()
    
    constructor(c : {_id? : string, name : string, printer : string[] | IModel.IPrinter[]}) {
        this._name = c.name
        this._printer = c.printer
        if(c._id) this.__id = c._id
    }

    get _id() {
        return this.__id
    }

    get name() {
        return this._name
    }

    get printer() {
        return this._printer
    }

    save = async () :Promise<boolean> => {
        try {

            let response = await CategoryService.save({name : this.name, printer : this.printerObjToStr() })
            if( response && response.success ) {
                toast.success('Kategori berhasil ditambahkan')
                return true
            }

        } catch (error) {
            console.log(error)
        }
        return false
    }

    update = async () => {
        try {
            
            if(this.validateId() === false) return false
            let response = await CategoryService.update(this._id, {name : this.name, printer : this.printerObjToStr(), _id : this._id})
            if (response && response.success) {
                toast.success("Kategori berhasil diperbarui")
				return true
            }
        } catch (error) {
            console.log(error)
        }
        return false
    }

    delete = async () => {
        try {
            
            if(this.validateId() === false) return false
            let response = await CategoryService.delete(this._id)
            if (response && response.success) {
				toast.success("Kategori berhasil dihapus")
                return true
            }
        } catch (error) {
            console.log(error)
        }
        return false;
    }

    private printerObjToStr = () => {
        let printerStr : string[] = []
        
        this.printer.forEach((p: any) => {
            if (p && typeof p === 'object' && Object.hasOwn(p, '_id')) printerStr.push(p._id as string)
            else if (typeof p === 'string') printerStr.push(p)
        })
        return printerStr
    }

    private validateId = () : boolean => {
        if(!this._id) {
            toast.error('ID Kategori tidak diketahui!')
            return false
        } else return true
    }

}

export default Category