import toast from '@teddy-error/svelte-french-toast';
import {HttpService} from '@lib/services/http.service'
import {IService, IModel} from '@lib/types'
import { EEndPoint } from '@lib/types'
import { token, user } from '../store';

const http = new HttpService()

class User implements IModel.IClass<IModel.User> {
	private users :IModel.User[] = []

	load = async () : Promise<boolean> =>  {
		try {
			const response = await http.service().get<IService.IResponse<IModel.User[]>>(EEndPoint.LOGIN);
			if(response && response.success) {
				this.users = response.data
				return true
			}
		} catch (error) {
			console.log(error)
		}

		return false
	};
	save = async (payload : {name : string, passcode : string}) : Promise<boolean>=> {
		try {
			const response = await http.push<IService.IResponse<IModel.User>, {name : string, passcode : string}>(EEndPoint.USER, payload)
			if (response && response.success) {
				toast.success("Pengguna berhasil ditambahkan.", {position : 'top-right'})
				return true
			}
		} catch (error) {
			console.log(error)
		}

		return false


	};

	static login = async (payload : IModel.User) : Promise<boolean> => {
		try {
			let response = await http.service().push<IService.IResponse<IModel.User>, IModel.User>(EEndPoint.LOGIN, payload);
			if(response && response.success) {
				toast.success('Login berhasil berhasil', {position : 'top-right'})
				token.set(response.token)
				user.set(response.data)
				return true
			}
		} catch (error) {
			console.log(error)
		}
		return false
	}
	getData = () : IModel.User[] => {
		return this.users
	};

	delete = async (_id: string | number) : Promise<boolean> => {
		try {
			let response = await http.service().remove<IService.IResponse<IModel.User>>(EEndPoint.USER+`/${_id}`);
			if(response && response.success) {
				toast.success('Pengguna berhasil dihapus', {position : 'top-right'})
				return true
			}
		} catch (error) {
			console.log(error)
		}
		return false
	}

}

export { User }
