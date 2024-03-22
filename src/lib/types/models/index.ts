
import type {Tailwindest} from 'tailwindest'

type TAction = 'Membuat' | 'Menghapus' | 'Menambahkan' | 'Mengubah'

type TStatus = 'simpan' | 'lunas' | 'arsip' | 'batal'

export type IconName = 'filter' |'edit' | 'stack' | 'emoji-sad' | 'loading'|'book' | 'folder' | 'power' | 'building' | 'printer' | 'server'| 'receipt-percent' | 'icon' |'minus' | 'question-mark' | 'home' | 'cog-8-tooth' | 'cube' | 'user-circle' | 'user' | 'ellipsis-vertical' | 'information-circle' | 'key' | 'plus' | 'trash' | 'close' | 'bell' | 'search' | 'bar' | 'refresh' | 'arrow' | 'arrow-long' | 'chevron-up-down' | 'chevron' | 'check' | 'logout' | 'bag' | 'calc' | 'wallet' | 'sun' | 'moon'

export type TPage = 'Home' | 'Admin' | 'Cashier'

export type Connection = 'local' | 'network'

export interface IBill {
    _id : string
    status : TStatus
    storeInfo : IStoreInfo,
    billInfo : IBillInfo,
    items : IItem[]
    summarize : ISummarize,
    createAt : Date,
    updateAt : Date
}
export interface IBillInfo {
    invoice : string,
    customer : string | number,
    date : string,
    user : string
}

export interface IMenu {
    _id : string
    name : string
    price: number
    upc? : number
    category : ICategory
}

export interface IItem {
    _id : string
    name : string
    printed : boolean
    upc? : number
    qty? : number
    category? : ICategory
    price?: number
    total?: number
    forId?: string
}

export interface INewMenu extends Omit<IMenu, '_id' | 'category'> {
    category : string
}

export interface ISummarize {
    subtotal : number,
    discount : IDiscount,
    tax : ITax,
    downpayment : number,
    cash : number,
    change : number,
    grandtotal : number
}


export interface IDiscount {
    percentage : number,
    value : number
}

//category
export interface ICategory {
    _id : string,
    name : string,
    printer : string[]
}
export interface INewCategory extends Omit<ICategory, '_id'> {}

// user
export interface IUser {
    _id : string,
    name : string,
    passcode : string
	avatar? : string
}

export interface INewUser extends Omit<IUser, '_id' | 'avatar' > {}


//activity
export interface IRecord {
    action : TAction,
    createdAt : Date,
    value : any
    prefix? : 'pesanan' | 'menu' | 'catatan' | string
    props? : string
    item? : 'pesanan' | string
}

export interface Acitivity {
    _id?: string,
    user : IUser,
    createdAt : Date,
    records : IRecord[]
    orderId : string
}

//store
export interface Store {
    _id : 'storeid'
    storeInfo : IStoreInfo
    taxInfo : ITax
    bankInfo : IBank
}

export interface IStoreInfo {
    name : string
    address : string
    phone : string
    mobilePhone? : string
    footerNote : string
}

export interface ITax {
    checked : boolean
    name? : string
    value? : number
}

export interface IBank {
    accountNumber : string | number
    holder : string
    bank : string
}

// server
export interface ServerConfig {
	ip : string,
	type : Connection
}


// printer

export interface IConfigPrinter {
    logo? : boolean,
    storeInfo? : boolean,
    whiteSpace? : boolean,
    price? : boolean,
    summarize? : boolean,
}

export interface IPrinter {
    _id : string
    name : string
    type : 'main' | 'copy' | 'addon',
	displayName? : string
}

//svelte components
export interface ITableHeaderItem  {
	value : string,
	width? : Tailwindest['width'],
	textAlign? : Tailwindest['textAlign'],
	paddingRight? :  Tailwindest['paddingRight']
	bgColor? : Tailwindest['backgroundColor']
}

export interface IChips {
	id : string | number
	name : string
	selected : boolean

}

export type IIcon = {
    name : IconName,
    path : string,
}

export interface ISubMenu extends IChips {
	component? : any
	icon? : IconName
}



// class
export interface LoadData<T> {
	(params? : string) : T
}

export interface GetData<T> {
	(_id : string|number):T
}
export interface InsertData<T> {
	(payload : T) : any
}

export interface DeleteData {
	(_id : string|number) : any
}

export interface UpdateData<T> {
	(_id:string|number, payload:T ) : any
}

export interface IClass<T> {
	load : () => Promise<boolean>
	save? : (payload : any|T) => Promise<T|any|void>
	getData? : (params? : string) => T[]
	dataById? : (_id : string | number) => Promise<T|undefined>
	delete? : (_id : string | number) => Promise<any|void>
	update? : (_id:string|number, payload : T) =>  Promise<any|void>
}

