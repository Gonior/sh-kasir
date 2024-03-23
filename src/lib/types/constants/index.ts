import type { IModel } from ".."


export const TEMPLATE_NOTE = [
	{
		name: 'DD'
	},
	{
		name: 'PH'
	},
	{
		name: 'DDPH'
	},
	{
		name: 'TANPA KECAP'
	},
	{
		name: 'MINTA HANGAT'
	},
	{
		name: 'SEDANG'
	},
	{
		name: 'PEDES'
	},
	{
		name: 'JANGAN PEDES'
	},
	{
		name: 'TANPA SAYUR'
	},
	{
		name: 'KERING'
	},
	{
		name: 'JANGAN KERING'
	},
	{
		name: 'ES DIKIT'
	},
	{
		name: 'GULA DIKIT'
	},
	{
		name: 'SET MATANG'
	},
	{
		name: 'TANPA  SAYUR'
	},
	{
		name: 'SAMBAL GOANG'
	},
	{
		name: 'SAMBAL TERASI'
	},
	{
		name: 'S. PENYET'
	},
	{
		name: 'SAMBAL MATAH'
	},
	{
		name: 'SAMBAL IJO'
	}
]

export const PAGE_SIZE = [
	{
		value : 10
	},
	{
		value : 20
	},
	{
		value : 30
	},
	{
		value : 40
	},
	{
		value : 50
	},

]

export const DEFAULT_FORMAT_SORTING = [
	{
		type : 'category',
		_id :'j0bd3G8hd7TtqJuC',

	},

	{
		type : 'category',
		_id :'pEk8GVyRAHmYV0U5',

	},
	{
		type : 'category',
		_id :'iqBdgsWKYeIBgioN',

	},
	{

	},
	{
		type : "printer",
		_id :'addon-pr-2',
	},
	{
		type : "printer",
		_id :'addon-pr-1',
	},

]

export const DEFAULT_PAGE_SIZE = 10

export const DEFAULT_CATEGORY_ID = 'defaultcategory'

export const TEST_BILL_PRINT : IModel.IBill = {
	_id: "",
	status: "simpan",
	
	storeInfo: {
		name: "Nama Toko Anda",
		address: "Jl. Kita Masih Panjang No XX  ",
		phone: "021xxxxxxxx",
		mobilePhone : '081xxxxxxx',
		footerNote: "TERIMAKASIH"
	},
	billInfo: {
		customer : "Test Print #1",
		date : '23-03-2024 00:01',
		invoice : '#202303230000',
		user : 'Kasir'
	},
	items: [
		{
			_id : 'menu-1',
			name : 'ITEM 1',
			printed : false,
			price : 10000,
			qty : 1,
			total : 10000,
		},
		{
			_id : 'menu-2',
			name : 'ITEM 2',
			printed : false,
			price : 5000,
			qty : 2,
			total : 10000,
		},
		{
			_id : 'menu-3',
			name : 'ITEM 3',
			printed : false,
			price : 15000,
			qty : 2,
			total : 30000,
		},
		{
			_id : 'note-3',
			name : 'Catatan 1',
			printed : false,
			forId : 'menu-3'
		},
		{
			_id : 'menu-4',
			name : 'ITEM 4',
			printed : false,
			price : 10000,
			qty : 1,
			total : 10000,
		},
	],
	summarize: {
		cash: 100000,
		subtotal: 60000,
		discount: undefined,
		tax: undefined,
		downpayment: 0,
		change: 40000,
		grandtotal: 60000
	},
	createAt: undefined,
	updateAt: undefined
} as const
