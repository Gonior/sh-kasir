import toast from '@teddy-error/svelte-french-toast'
import Category from './category.controller'
import {HttpService} from '../services/http.service'
import { type IModel, EEndPoint, type IService } from '../types'

const http = new HttpService()
const category = new Category()

class Menu implements IModel.IClass<IModel.Menu> {
	private menus : IModel.Menu[] = []
	private categories : IModel.Category[] = []

	load = async () : Promise<boolean> => {
		try {
			let resCategory = await category.load()
			if (resCategory) this.categories = category.getData()
			let response = await http.service().get<IService.IResponse<IModel.Menu[]>>(EEndPoint.MENU)
			let localMenus  : IModel.Menu[] = []
			if (response && response.success && response.data.length > 0 ) {
				response.data.forEach((data) => {
					data.category = category.findCategory(data.category as string)
					localMenus.push(data)
				})
				this.menus = localMenus
				return true
			}
		} catch (error) {
			console.log(error)
		}

		return false
	}

	getData = () : IModel.Menu[] => {
		return this.menus
	}

	static save = async (payload: IModel.NewMenu) : Promise<boolean> => {
        try {
			const response = await http.push<IService.IResponse<IModel.Menu>, IModel.NewMenu>(EEndPoint.MENU, payload)
			if (response && response.success) {
				toast.success("Menu berhasil ditambahkan.", {position : 'top-right'})
				return true
			}
		} catch (error) {
			console.log(error)
		}

		return false
    }


    dataById = async (_id: string | number) : Promise<IModel.Menu> => {
        try {
            let response = await http.service().get<IService.IResponse<IModel.Menu>>(EEndPoint.MENU+`/${_id}`)
            if(response && response.success) {
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
        return undefined
    }

    findMenu = (_id : string) : IModel.Menu => {
		return this.menus.find((m) => m._id === _id) ?? null
	}

	sortMenuByCategory = () => {
		let result : {category : IModel.Category, menus : IModel.Menu[]}[] = []
		this.categories.forEach(c => {
			result.push({category : c, menus : this.menus.filter(m => (m.category as IModel.Category)._id === c._id)})
		})
		return result
	}
	
	sortMenuByIdCategory = (arrayCategoryId : string[] = []) : IModel.Menu[] => {
		// let result : IModel.Menu[] = []
		// this.menus.forEach(menu => {
		// 	if((menu.category as IModel.Category)._id)
		// 	result.push()
		// })
		return this.menus.filter(menu => arrayCategoryId.indexOf((menu.category as IModel.Category)._id) !== -1)
	}

    static update = async (_id: string | number, payload: IModel.Menu) : Promise<boolean> => {
        try {
            let response = await http.service().update<IService.IResponse<IModel.Menu>, IModel.Menu>(EEndPoint.MENU+'/'+_id, payload)
            if (response && response.success) {
                toast.success("Menu berhasil diperbarui", {position : 'top-right'})
				return true
            }
        } catch (error) {
            console.log(error)
        }
        return false
    }

    static delete = async (_id: string | number) : Promise<boolean> => {
        try {
            let response = await http.service().remove<IService.IResponse<null>>(EEndPoint.MENU+`/${_id}`)
            if (response && response.success) {
				toast.success("Menu berhasil dihapus", {position : 'top-right'})
                return true
            }
        } catch (error) {
            console.log(error)
        }
        return false;
    }


}

export default Menu
