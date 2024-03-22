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
    connectivity? : 'local' | 'network',
    ipAdress? : string,
	displayName? : string
}

export interface IStoreInfo {
    name : string
    address : string
    phone : string
    mobilePhone? : string
    footerNote : string
}

export interface IDiscount {
    percentage : number,
    value : number
}

export interface ITax {
    checked : boolean
    name? : string
    value? : number
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



export interface IBillInfo {
    invoice : string,
    customer : string | number,
    date : string,
    user : string
}

export interface ICategory {
    _id : string,
    name : string,
    printer : string[]
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

export interface IBill {
    storeInfo : IStoreInfo,
    billInfo : IBillInfo,
    items : IItem[]
    summarize : ISummarize,
}