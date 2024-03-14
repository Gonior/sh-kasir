import {HttpService} from '../../lib/services/http.service'
import {IService, IModel} from '../../lib/types'
import { catch_func} from '../../lib/utils/myFunct'
const http = new HttpService()

export const getStoreInfo = async () : Promise<IModel.Store|undefined> => {
	try {
		const response = await http.service().get<IService.IResponse<IModel.Store>>(`/store`);
		if(response.success) {
			return response.data
		}	
	} catch (error) {
		catch_func(error)
	}
	
	return

}
