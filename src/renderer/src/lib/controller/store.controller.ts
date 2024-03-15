import toast from '@teddy-error/svelte-french-toast';
import {HttpService} from '@lib/services/http.service'
import {IService, IModel} from '@lib/types'

const http = new HttpService()

export const getStoreConfig = async () : Promise<IModel.Store|undefined> => {
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

export const updateStoreConfig = async (store : IModel.Store) : Promise<void> => {
	try {
		const response = await http.service().update<IService.IResponse<IModel.Store>, IModel.Store>(`/store`, store);
		if(response && response.success) {
			toast.success(response.message, {position : 'top-right'})
		} else toast.error(response?.message, {position : 'top-right'})
	} catch(err) {
		toast.error('ERROR: \nsee the console for informastion', {position : 'top-right'})
		console.log(err)
	}
}

