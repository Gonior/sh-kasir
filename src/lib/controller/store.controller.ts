import { toast } from 'svelte-sonner';
import {HttpService} from '@lib/services/http.service'
import {IService, IModel} from '@lib/types'
import { EEndPoint } from '@lib/types'
import { isValidObject } from '../utils';

const http = new HttpService()

class Store {

	private taxInfo: IModel.ITax
	private _id : string
	private storeInfo : IModel.IStoreInfo
	private bankInfo : IModel.IBank

	async init(): Promise<boolean> {
		try {
			const response = await http.service().get<{data : Store, success : boolean}>(EEndPoint.STORE);
			if( isValidObject(response) && isValidObject(response.data)) {
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
				toast.success(response.message)
			}
		} catch(err) {
			toast.error('ERROR: \nsee the console for information')
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
