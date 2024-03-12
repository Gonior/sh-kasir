import type { Icon, IconName } from './Icon'

interface Printer {
    _id : string
    name : string
    type : 'main' | 'copy' | 'adds'
}

interface Menu {
    _id : string
    name : string
    upc : number | null
    category : string | Category
    price : number
}

interface Category {
    _id : string
    name : string
    printer : string | Printer
}

interface MenuOrder extends Menu {
    qty : number
    total : number
    printed : boolean
}

export type {
    Icon,
    Menu,
    Category,
    MenuOrder,
    IconName,
    Printer
}