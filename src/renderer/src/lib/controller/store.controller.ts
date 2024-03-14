import {HttpService} from '../../lib/services/http.service'
import {IService, IModel} from '../../lib/types'

const http = new HttpService()

export const getStoreInfo = async () : Promise<IModel.Store|undefined> => {
	try {
		const response = await http.service().get<IService.IResponse<IModel.Store>>(`/store`);
		if(response && response.success) {
			return response.data
		}	
	} catch(err) {
		console.log(err)
		return undefined
	}
	return undefined

}
