import { toast } from 'svelte-sonner'
import Printer from './printer.service'
import {HttpService} from './http.service'
import { type IModel, EEndPoint, type IService, Constant, IRemote } from '../types'
const printer = new Printer()
const http = new HttpService()

class CategoryService {
    private categories : IModel.ICategory[] = []

    load = async () : Promise<boolean>  => {
        try {
            await printer.load()
            let response = await http.service().get<IService.IResponse<IRemote.ICategory[]>>(EEndPoint.CATEGORY)
            if(response && response.success) {
                let dataMap = response.data.map((c) => {
                    let category : IModel.ICategory = {
                        name : '',
                        _id : '',
                        printer : []
                    }
                    
                    category.name = c.name
                    category._id = c._id
                    c.printer.forEach(p =>{ 
                        let findP = printer.findPrinterById(p)
                        if (findP) category.printer.push(findP)
                    })
                    return category
                })
                
                this.categories = [...dataMap]
                return true
            }

        } catch (error) {
            console.log(error)
        }

        return false
    }

    getData = () : IModel.ICategory[] => {

        return this.categories
    }

	getDefaultCategory = () => {
		return this.categories.find(c =>  c._id === Constant.DEFAULT_CATEGORY_ID)
	}

    dataById = async (_id: string | number) : Promise<IModel.ICategory|undefined> => {
        try {
            let response = await http.service().get<IService.IResponse<IModel.ICategory>>(EEndPoint.CATEGORY+`/${_id}`)
            if(response && response.success) {
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
        return undefined
    }

    findCategory = (_id : string) : IModel.ICategory => {
		return this.categories.find((category) => category._id === _id) ?? null
	}

    static save = async (payload: IRemote.INewCategory) : Promise<{success : boolean, data? : any, message? : string}> => {
        return http.push<{success : boolean, data? : any, message? : string}, IRemote.INewCategory>(EEndPoint.CATEGORY, payload)
    }

    static update = async (_id: string, payload: IRemote.ICategory) : Promise<boolean> => {
        try {
            let response = await http.service().update<{success : boolean}, IRemote.ICategory>(EEndPoint.CATEGORY+'/'+_id, payload)
            if (response && response.success) {
                toast.success("Kategori berhasil diperbarui")
				return true
            }
        } catch (error) {
            console.log(error)
        }
        return false
    }

    static delete = async (_id: string) : Promise<boolean> => {
        try {
            let response = await http.service().remove<{success : boolean}>(EEndPoint.CATEGORY+`/${_id}`)
            if (response && response.success) {
				toast.success("Kategori berhasil dihapus")
                return true
            }
        } catch (error) {
            console.log(error)
        }
        return false;
    }

}

export default CategoryService
