
export type TStatus = 'simpan' | 'lunas' | 'arsip' | 'batal'


export interface IBill {
    _id : string
    status : TStatus
    user : string, 
    invoice : string
    createdAt : Date,
    updatedAt : Date,
    customer : string,
    orders : IItem[],
    totalitems : number,
    subtotal : number,
    discount : number,
    tax : number, 
    downpayment : number,  
    grandtotal : number, 
    cash : number, 
    change : number 
}

export interface IMenu {
    _id : string
    name : string
    price: number
    upc? : number
    category : ICategory
}

export interface ICategory {
    _id : string
    name : string
    printer : IPrinter[],
    selected ? : boolean
}

export interface ILayoutCData {
    category : ICategory,
    data : IMenu[]
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
    selected? : boolean
}

export interface IDiscount {
    percentage : number,
    value : number
}

// user
export interface IUser {
    _id : string,
    name : string,
    passcode : string
	avatar? : string
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


export interface IPrinter {
    readonly _id : string
    name : string
	readonly displayName : string
}

export interface ISortItem {
    value : string,
    id : string
}

