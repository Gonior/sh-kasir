import MenuService from "../services/menu.service"
import { Constant, IModel } from "../types"
import {toast} from 'svelte-sonner'

class Menu  {
    private __id : string
    private _name : string
    private _price: number
    private _upc: number
    private _category : IModel.ICategory | string
    

    // getMenu = () => {}
    // getPrinter = () => {} ? apa bedanya sama CategoryService.findPrinterValidateById()
    
    constructor(m : {_id? : string, name : string, category : IModel.ICategory | string, price : number, upc? : number}) {
        this._name = m.name
        this._category = m.category
        this._price = m.price
        if(m._id) this.__id = m._id
        if(m.upc) this._upc = m.upc
    }
    

    get _id() {
        return this.__id
    }

    get name() {
        return this._name
    }

    get category() {
        return this._category
    }

    get price() {
        return this._price
    }

    get upc() {
        return this._upc
    }

    save = async () :Promise<boolean> => {
        try {
            let menu = {
                category : this.categoryObjToStr() ?? Constant.DEFAULT_CATEGORY_ID,
                name : this.name,
                price: this.price,
                upc : this.upc
            }

            let response = await MenuService.save(menu)
            if( response && response.success ) {
                toast.success('Menu berhasil ditambahkan')
                return true
            }

        } catch (error) {
            console.log(error)
        }
        return false
    }

    update = async () => {
        try {
            let menu = {
                category : this.categoryObjToStr() ?? Constant.DEFAULT_CATEGORY_ID,
                name : this.name,
                price: this.price,
                upc : this.upc,
                _id : this._id
            }
            if(this.validateId() === false) return false
            let response = await MenuService.update(this._id, menu)
            if (response && response.success) {
                toast.success("Menu berhasil diperbarui")
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
            let response = await MenuService.delete(this._id)
            if (response && response.success) {
				toast.success("Menu berhasil dihapus")
                return true
            }
        } catch (error) {
            console.log(error)
        }
        return false;
    }

    private categoryObjToStr = () => {
        let str : string 
        if (this._category && typeof this._category === 'object' && Object.hasOwn(this._category, '_id')) str = this._category._id
        else if (typeof this._category === 'string' ) str = this._category
        return str
    }

    private validateId = () : boolean => {
        if(!this._id) {
            toast.error('ID Menu tidak diketahui!')
            return false
        } else return true
    }

}

export default Menu