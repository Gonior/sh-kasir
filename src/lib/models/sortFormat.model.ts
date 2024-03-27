import { toast } from 'svelte-sonner';
import { HttpService } from '@lib/services/http.service'
import { IModel } from '@lib/types'
import { EEndPoint } from '@lib/types'
import { isValidObject } from '../utils';

const http = new HttpService()


class SortFormat {
	private _values: IModel.ISortItem[] = []
	async load(): Promise<boolean> {
		try {
			const response = await http.service().get<{data : IModel.ISortItem[], success : boolean}>(EEndPoint.SORT_FORMAT);
			if( isValidObject(response) && isValidObject(response.data)) {
				
				this._values = response.data
				return true
			}
		} catch(err) {
			console.log(err)
		}
		return false
	}
	get values() {

		return this._values
	}
	async update(payload: IModel.ISortItem[]) : Promise<void> {
		try {
			const response = await http.service().update<{success : boolean, message : string}, {values : IModel.ISortItem[]}>(EEndPoint.SORT_FORMAT, {values : payload});
			if(response && response.success) {
				toast.success(response.message)
			}
		} catch(err) {
			toast.error('ERROR: \nsee the console for information')
			console.log(err)
		}
	};

}

export default SortFormat
