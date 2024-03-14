import {HttpService} from '../../lib/services/http.service'
import {IService, IModel} from '../../lib/types'
const http = new HttpService()

export const getStoreInfo = async () => {
	const response = await http.service().get<IService.IResponse<IModel.Store>>(`/store`);
	if(response && response.success) {
		return response.data
	} else return

}
