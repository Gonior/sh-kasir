import CategoryService from "./category.service";
import { HttpService } from "./http.service";
import { IModel, EEndPoint, IService, IRemote } from '@lib/types'

const http = new HttpService()
const categoryService = new CategoryService()
class MenuService {
    private listMenus : IModel.IMenu[] = []
    private listCategories : IModel.ICategory[] = []
    load = async () : Promise<boolean> => {
        try {
			let isSuccessCategories= await categoryService.load()
			if (isSuccessCategories) this.listCategories = categoryService.getData()
			let response = await http.service().get<IService.IResponse<IRemote.IMenu[]>>(EEndPoint.MENU)
            if (response && response.success && response.data.length > 0 ) {
                let localMenus  : IModel.IMenu[] = []
				response.data.forEach((data) => {
                    let menu : IModel.IMenu =  {
                        _id: "",
                        name: "",
                        price: 0,
                        category: undefined
                    }
                    menu._id = data._id
                    menu.name = data.name
                    menu.price = data.price
                    menu.category = this.listCategories.find(c => c._id === data.category)
                    if(data.upc) menu.upc = data.upc
					localMenus.push(menu)
				})
				this.listMenus = localMenus
				return true
			}
		} catch (error) {
			console.log(error)
		}
        return false
    }

    getData = () : IModel.IMenu[] => {
		return this.listMenus
	}

    sortMenuByIdCategory = (arrayCategoryId : string[] = []) : IModel.IMenu[] => {
		
		return this.listMenus.filter(menu => arrayCategoryId.indexOf((menu.category as IModel.ICategory)._id) !== -1)
	}

    static save = async (payload: IRemote.INewMenu) : Promise<{success : boolean, data? : any, message? : string}> => {
        return http.push<{success : boolean, data? : any, message? : string}, IRemote.INewMenu>(EEndPoint.MENU, payload)
    }

    static update = async (_id: string, payload: IRemote.IMenu) : Promise<{success : boolean}> => {
        return http.service().update<{success:boolean}, IRemote.INewMenu>(EEndPoint.MENU+'/'+_id, payload)
    }

    static delete = async (_id: string) : Promise<{success : boolean}> => {
        return http.service().remove<{success : boolean}>(EEndPoint.MENU+`/${_id}`)
    }

    

}

export default MenuService