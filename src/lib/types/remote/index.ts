type TAction = 'Membuat' | 'Menghapus' | 'Menambahkan' | 'Mengubah'

export interface IUser {
    _id : string,
    name : string,
    passcode : string
	avatar? : string
}

export interface INewUser extends Omit<IUser, '_id' | 'avatar' > {}

export interface IPrinter {
    _id : string
    name : string
    type : 'main' | 'copy' | 'addon',
	displayName : string
}

export interface ICategory {
    _id : string,
    name : string,
    printer : string[]
}

export interface INewCategory extends Omit<ICategory, '_id'> {}

export interface IMenu {
    _id : string
    name : string
    price: number
    upc? : number
    category : string
}
export interface INewMenu extends Omit<IMenu, '_id'> {}

export interface Acitivity {
    _id?: string,
    user : IUser,
    createdAt : Date,
    records : IRecord[]
    orderId : string
}

export interface IRecord {
    action : TAction,
    createdAt : Date,
    value : any
    prefix? : 'pesanan' | 'menu' | 'catatan' | string
    props? : string
    item? : 'pesanan' | string
}

