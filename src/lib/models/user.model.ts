import { IModel } from "../types"
import { generateAvatar } from "../utils"
import UserService from "../services/user.service"
import {toast} from 'svelte-sonner'
import { token, user } from '../store';
class User {
    private _name : string
    private __id : string | undefined
    private _passcode : string
    
    constructor(user : {name : string, passcode : string, _id? : string }) {
        this._name = user.name
        this._passcode = user.passcode
        if(user._id) this.__id = user._id
    }

    get avatar() {
        return generateAvatar(this._name)
    }

    get name() {
        return this.name
    }

    get _id() {
        return this.__id
    }
    private getProperties() {
        return {_id : this.__id, name : this._name, passcode : this._passcode } as IModel.IUser
    }

    save = async () : Promise<boolean> =>  {
        try {
            let response = await UserService.save({name : this._name, passcode : this._passcode})
            if( response && response.success ) {
                toast.success('Pengguna berhasil ditambahkan')
                return true
            }
        } catch (error) {
            console.log(error)
        }
        return false
    }

    login = async () : Promise<boolean> => {
        try {
            let response = await UserService.login(this.getProperties())
            if( response && typeof response === 'object' && "success" in response && response.success && "token" in response && typeof response.token === 'string' && "data" in response ) {
                toast.success('Login berhasil!')
                token.set(response.token)
				user.set(response.data)
                return true
            } else toast.error('login gagal!')
        } catch (error) {
            toast.error('Gagal Login!')
            console.log(error)
        }

        return false
    }

    delete = async () : Promise<boolean> => {
        try {
            if(!this._id) {
                toast.error('ID Penggunan tidak diketahui!')
                return false
            }
            let response = await UserService.delete(this.__id)
            if( response && response.success ) {
                toast.success('Pengguna berhasil dihapus.')
                return true
            }
        } catch (error) {

            console.log(error)
        }
        return false
    }





}

let Deica  = new User({name : 'dedi cahya', passcode : '141297', _id : 'default'})
Deica.avatar

export default User