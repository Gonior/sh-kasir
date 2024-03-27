export type IconName = 'file-edit' | 'save' | 'archive'  | 'eraser' | 'file-text' | 'repeat' | 'repeat-1' | 'arrow-left-right' | 'grip-vertical' | 'receipt' | 'filter' |'edit' | 'stack' | 'emoji-sad' | 'loading' | 'book' | 'folder' | 'power' | 'building' | 'printer' | 'server'| 'receipt-percent' | 'icon' |'minus' | 'question-mark' | 'home' | 'cog-8-tooth' | 'cube' | 'user-circle' | 'user' | 'ellipsis-vertical' | 'information-circle' | 'key' | 'plus' | 'trash' | 'close' | 'bell' | 'search' | 'bar' | 'refresh' | 'arrow' | 'arrow-long' | 'chevron-up-down' | 'chevron' | 'check' | 'logout' | 'bag' | 'calc' | 'wallet' | 'sun' | 'moon'

export type TPage = 'Home' | 'Admin' | 'Cashier'

export type Connection = 'local' | 'network'

export interface ITableHeaderItem  {
	value : string,
	width? : string,
	textAlign? : string,
	paddingRight? : string
	bgColor? : string
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

export interface ServerConfig {
	ip : string,
	type : Connection
}