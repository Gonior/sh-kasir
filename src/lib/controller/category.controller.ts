import toast from '@teddy-error/svelte-french-toast'
import Printer from './printer.controller'
import {HttpService} from '../services/http.service'
import { type IModel, EEndPoint, type IService, Constant } from '../types'

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

	getDefaultCategory = () => {
		return this.categories.find(c =>  c._id === Constant.DEFAULT_CATEGORY_ID)
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


    static update = async (_id: string | number, payload: IModel.Category) : Promise<boolean> => {
        try {
            let response = await http.service().update<IService.IResponse<IModel.Category>, IModel.Category>(EEndPoint.CATEGORY+'/'+_id, payload)
            if (response && response.success) {
                toast.success("Kategori berhasil diperbarui", {position : 'top-right'})
				return true
            }
        } catch (error) {
            console.log(error)
        }
        return false
    }

    static delete = async (_id: string | number) : Promise<boolean> => {
        try {
            let response = await http.service().remove<IService.IResponse<null>>(EEndPoint.CATEGORY+`/${_id}`)
            if (response && response.success) {
				toast.success("Kategori berhasil dihapus", {position : 'top-right'})
                return true
            }
        } catch (error) {
            console.log(error)
        }
        return false;
    }

}

export default Category
