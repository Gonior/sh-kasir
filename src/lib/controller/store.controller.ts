import toast from '@teddy-error/svelte-french-toast';
import {HttpService} from '@lib/services/http.service'
import {IService, IModel} from '@lib/types'
import { EEndPoint } from '@lib/types'
const http = new HttpService()

class Store implements IModel.IClass<IModel.Store> {

	private taxInfo: IModel.Tax
	private _id : string
	private storeInfo : IModel.StoreInfo
	private bankInfo : IModel.Bank

	async load(): Promise<boolean> {
		try {
			const response = await http.service().get<IService.IResponse<IModel.Store>>(EEndPoint.STORE);
			if(response && response.success) {
				this.taxInfo = response.data?.taxInfo
				this._id = response.data?._id
				this.storeInfo = response.data?.storeInfo
				this.bankInfo = response.data?.bankInfo
				return true
			}
		} catch(err) {
			console.log(err)
		}
		return false
	}
	async update(_id = "_", payload: IModel.Store) : Promise<void> {
		try {
			const response = await http.service().update<IService.IResponse<IModel.Store>, IModel.Store>(EEndPoint.STORE, payload);
			if(response && response.success) {
				toast.success(response.message, {position : 'top-right'})
			}
		} catch(err) {
			toast.error('ERROR: \nsee the console for informastion', {position : 'top-right'})
			console.log(err)
		}
	};

	getTaxInfo(){
		return this.taxInfo
	}

	getStoreInfo() {
		return this.storeInfo
	}

	getBankInfo() {
		return this.bankInfo
	}

	getStore() {
		return {
			_id: this._id ,
			storeInfo : this.storeInfo,
			bankInfo : this.bankInfo,
			taxInfo : this.taxInfo
		} as IModel.Store
	}
}

export default Store
