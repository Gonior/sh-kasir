import CategoryService from "../services/category.service"
import type { IModel } from "../types"
import {toast} from 'svelte-sonner'
import { isValidObject } from "../utils"
class Category {
    private __id : string
    private _name : string
    private _printer : string[] | IModel.IPrinter[] = []
    // private CategoryService : CategoryService = new CategoryService()

    // save = () => {}
    // update = () => {}
    // getMenu = () => {}
    // getPrinter = () => {} ? apa bedanya sama CategoryService.findPrinterValidateById()
    // delete = () => {}
    constructor(c : {_id? : string, name : string, printer : string[] | IModel.IPrinter[]}) {
        this._name = c.name
        this._printer = c.printer
        if(this._id) this.__id = c._id
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
            let printerStr : string[] = []
            this.printer.forEach((p: any) => {
                if (p && typeof p === 'object' && Object.hasOwn(p, '_id')) printerStr.push(p._id as string)
                else if (typeof p === 'string') printerStr.push(p)
            })
            
            let response = await CategoryService.save({name : this.name, printer : printerStr })
            if( response && response.success ) {
                toast.success('Kategori berhasil ditambahkan')
                return true
            }
        } catch (error) {
            console.log(error)
        }
        return false
        
    }
}

const goreng = new Category({name : "Goreng",printer : [], _id : 'bebas'})
goreng.save()
export default Category