

export type IconName = 'building' | 'printer' | 'server'| 'receipt-percent' | 'icon' |'minus' | 'question-mark' | 'home' | 'cog-8-tooth' | 'cube' | 'user-circle' | 'user' | 'ellipsis-vertical' | 'information-circle' | 'key' | 'plus' | 'trash' | 'close' | 'bell' | 'search' | 'bar' | 'refresh' | 'arrow' | 'arrow-long' | 'chevron-up-down' | 'chevron' | 'check' | 'logout' | 'bag' | 'calc' | 'wallet' | 'sun' | 'moon'

export type Icon = {
    name : IconName,
    path : string,
}

type Action = 'Membuat' | 'Menghapus' | 'Menambahkan' | 'Mengubah'

type Status = 'tunda' | 'lunas' | 'arsip' | 'cancel'


export interface Store {
    _id : 'storeid'
    name : string
    address : string
    phone : string
    mobilePhone? : string
    footerNote : string
    norek : string | number
    holder : string
    bank : string
}

export interface Printer {
    _id : string
    name : string
    type : 'main' | 'copy' | 'adds'
}

export interface User {
    _id : string,
    name : string,
    passcode : string
	avatar? : string
}

export interface Menu {
    _id : string
    name : string
    upc? : number
    category? : string | Category
    price? : number
	forId? :string
}

export interface MenuOrder extends Menu {
    qty? : number
    total? : number
    printed : boolean
}

export interface Category {
    _id : string
    name : string
    printer : string | Printer
}

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
	component : any
	icon? : IconName
}

export interface Store {
    _id : 'storeid'
    name : string
    address : string
    phone : string
    mobilePhone? : string
    footerNote : string
    norek : string | number
    holder : string
    bank : string
}

