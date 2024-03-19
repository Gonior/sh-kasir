
import type {Tailwindest} from 'tailwindest'

export type IconName = 'edit' | 'stack' | 'emoji-sad' | 'loading'|'book' | 'folder' | 'power' | 'building' | 'printer' | 'server'| 'receipt-percent' | 'icon' |'minus' | 'question-mark' | 'home' | 'cog-8-tooth' | 'cube' | 'user-circle' | 'user' | 'ellipsis-vertical' | 'information-circle' | 'key' | 'plus' | 'trash' | 'close' | 'bell' | 'search' | 'bar' | 'refresh' | 'arrow' | 'arrow-long' | 'chevron-up-down' | 'chevron' | 'check' | 'logout' | 'bag' | 'calc' | 'wallet' | 'sun' | 'moon'

export type Icon = {
    name : IconName,
    path : string,
}

export interface ITableHeaderItem  {
	value : string,
	width? : Tailwindest['width'],
	textAlign? : Tailwindest['textAlign'],
	paddingRight? :  Tailwindest['paddingRight']
	bgColor? : Tailwindest['backgroundColor']
}
type Action = 'Membuat' | 'Menghapus' | 'Menambahkan' | 'Mengubah'

type Status = 'tunda' | 'lunas' | 'arsip' | 'cancel'

export type Connection = 'local' | 'network'

export interface Printer {
    _id : string
    name : string
    type : 'main' | 'copy' | 'addon',
	displayName? : string
}

export interface User {
    _id : string,
    name : string,
    passcode : string
	avatar? : string
}

export interface NewUser extends Omit<User, '_id' | 'avatar' > {}

export interface Menu {
    _id : string
    name : string
    upc? : number
    category? : string | Category
    price? : number
	forId? :string
}

export interface NewMenu extends Omit<Menu, '_id'> {}


export interface MenuOrder extends Menu {
    qty? : number
    total? : number
    printed : boolean
}

export interface Category {
    _id : string
    name : string
    printer : string[]
}

export interface NewCategory extends Omit<Category, '_id'> {}

export interface Order {
    _id : string,
    invoice : string,
    createdAt : Date,
    updateAt : Date,
    status : Status
    user : User,
    customer : string,
    orders : MenuOrder[]
    totalitems : number,
    subtotal : number,
    discount : number,
    tax : number,
    downpayment : number,
    grandtotal : number,
    cash : number
    change : number
}
export interface NewOrder extends Omit<Order, "_id" | "createdAt" | "updateAt"> {

}

export interface Record {
    action : Action,
    value : any
    prefix? : 'pesanan' | 'menu' | 'catatan' | string
    props? : string
    item? : 'pesanan' | string
}

export interface Acitivity {
    _id?: string,
    user : User,
    createdAt : Date,
    records : Record[]
    orderId : string
}


export interface IChips {
	id : string | number
	name : string
	selected : boolean

}

export interface ISubMenu extends IChips {
	component? : any
	icon? : IconName
}

export interface StoreInfo {
    name : string
    address : string
    phone : string
    mobilePhone? : string
    footerNote : string
}

export interface Bank {
    accountNumber : string | number
    holder : string
    bank : string
}

export interface Tax {
    checked : boolean
    name? : string
    value? : number
}

export interface Store {
    _id : 'storeid'
    storeInfo : StoreInfo
    taxInfo : Tax
    bankInfo : Bank
}
export interface ServerConfig {
	ip : string,
	type : Connection
}

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

