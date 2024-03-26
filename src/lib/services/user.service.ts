import {HttpService} from '@lib/services/http.service'
import {IService, IModel, IRemote} from '@lib/types'
import { EEndPoint } from '@lib/types'

const http = new HttpService()

class UserService {
	private users :IModel.IUser[] = []

	load = async () : Promise<boolean> =>  {
		try {
			const response = await http.service().get<IService.IResponse<IModel.IUser[]>>(EEndPoint.LOGIN);
			if(response && response.success) {
				this.users = response.data
				return true
			}
		} catch (error) {
			console.log(error)
		}

		return false
	};

	getData = () : IModel.IUser[] => {
		return this.users
	};

	static save = async (payload : IRemote.INewUser) : Promise<{success : boolean, data : any}>=> {		
		return http.push<{success : boolean, data : any}, IRemote.INewUser>(EEndPoint.USER, payload)
	};

	static login = async (payload : IModel.IUser) : Promise<{success : boolean, data? : any, token : string}> => {
		return http.service().push<{success : boolean, data? : any, token : string}, IModel.IUser>(EEndPoint.LOGIN, payload);
	}

	static delete = async (_id: string) : Promise<{success : boolean}> => {
		return http.service().remove<{success : boolean}>(EEndPoint.USER+`/${_id}`);
	}
	

	

}

export default UserService
