import { IModel } from ".."

type TAction = 'Membuat' | 'Menghapus' | 'Menambahkan' | 'Mengubah'

export interface IPrinter {
    _id : string
    name : string
    type : 'main' | 'copy' | 'addon',
	displayName : string
}

export interface IUser {
    _id : string,
    name : string,
    passcode : string
}

export interface INewUser extends Omit<IUser, '_id' | 'avatar' > {}

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

export interface IItemMenu extends IMenu {
    printed : boolean
    qty : number
    total : number
}

export interface IItemNote {
    _id : string
    name : string
    forId : string
    printed : boolean
}

export type IItem = IItemMenu | IItemNote

export interface INewMenu extends Omit<IMenu, '_id'> {}

export interface IBill {
    _id : string
    status : IModel.TStatus
    storeInfo : IModel.IStoreInfo,
    billInfo : IBillInfo,
    items : IItem[]
    summarize : ISummarize,
    createAt : Date,
    updateAt : Date
}

export interface IBillInfo {
    customer : string | number,
    date : string,
    user : string,
    invoice : string
}


export interface ISummarize {
    subtotal : number,
    discount : IModel.IDiscount,
    tax : IModel.ITax,
    downpayment : number,
    cash : number,
    change : number,
    grandtotal : number
}

export interface Acitivity {
    _id?: string,
    user : IUser,
    createdAt : Date,
    records : IRecord[]
    orderId : string
}

export interface IRecord {
    action : TAction,
    value : any
    prefix? : 'pesanan' | 'menu' | 'catatan' | string
    props? : string
    item? : 'pesanan' | string
}

export interface IConfigPrinter {
    logo? : boolean,
    storeInfo? : boolean,
    whiteSpace? : boolean,
    price? : boolean,
    summarize? : boolean,
}



