import toast from '@teddy-error/svelte-french-toast'
import {Printer} from './printer.controlle'
import {HttpService} from '../services/http.service'
import { type IModel, EEndPoint, type IService } from '../types'


const printer = new Printer()
const http = new HttpService()

class Category implements IModel.IClass<IModel.Category> {
    private categories : IModel.Category[] = []
        
    load = async () : Promise<boolean>  => {
        try {
            await printer.load()
            let response = await http.service().get<IService.IResponse<IModel.Category[]>>(EEndPoint.CATEGORY)
            if(response && response.success) {
                this.categories = response.data
                this.categories = this.categories.map((category) => {

                    category.printer = printer.findPrinter(category.printer as string) ?? category.printer
                    return category
                })
                return true
            }

        } catch (error) {
            console.log(error)
        }

        return false
    }

    getData = () : IModel.Category[] => {
       
        return this.categories
    }

    static save = async (payload: IModel.NewCategory) : Promise<boolean> => {
        try {
			const response = await http.push<IService.IResponse<IModel.Category>, IModel.NewCategory>(EEndPoint.CATEGORY, payload)
			if (response && response.success) {
				toast.success("Kategori berhasil ditambahkan.", {position : 'top-right'})
				return true
			}
		} catch (error) {
			console.log(error)
		}

		return false
    } 
    
    
    dataById = async (_id: string | number) : Promise<IModel.Category|undefined> => {
        try {
            let response = await http.service().get<IService.IResponse<IModel.Category>>(EEndPoint.CATEGORY+`/${_id}`)
            if(response && response.success) {
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
        return undefined
    }

    findCategory = (_id : string) : IModel.Category => {
		return this.categories.find((category) => category._id === _id) ?? null
	}

   
    update = async (_id: string | number, payload: IModel.Category) : Promise<boolean> => {
        try {
            let response = await http.service().update<IService.IResponse<IModel.Category>, IModel.Category>(EEndPoint.CATEGORY, payload)
            if (response && response.success) {
                toast.success("Kategori berhasil diperbarui", {position : 'top-right'})
            }
        } catch (error) {
            console.log(error)
        }
        return false
    }

    delete = async (_id: string | number) : Promise<boolean> => {
        try {
            let response = await http.service().remove<IService.IResponse<null>>(EEndPoint.CATEGORY+`/${_id}`)
            if (response && response.success) {
                return true
            }
        } catch (error) {
            console.log(error)
        }
        return false;
    }
    
}

export {
    Category 
}