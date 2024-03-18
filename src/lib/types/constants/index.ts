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

export const DEFAULT_PAGE_SIZE = 10

export const DEFAULT_MAIN_PRINTER : IModel.Printer = {
	_id : "printer-main",
	name : '',
	type : 'main',
	displayName : 'Printer Kasir'
}

export const DEFAULT_COPY_PRINTER : IModel.Printer = {
	_id : "printer-copy",
	name : '',
	type : 'copy',
	displayName : 'Printer Rekap Pesanan'
}

export const LIST_PRINTER_ADDS : IModel.Printer[] = [
	{
		_id : 'printer-add-1',
		name : '',
		type : 'adds',
		displayName : 'Printer Tambahan 1'
	},
	{
		_id : 'printer-add-2',
		name : '',
		type : 'adds',
		displayName : 'Printer Tambahan 2'
	},
	{
		_id : 'printer-add-3',
		name : '',
		type : 'adds',
		displayName : 'Printer Tambahan 3'
	},
	{
		_id : 'printer-add-4',
		name : '',
		type : 'adds',
		displayName : 'Printer Tambahan 4'
	},
	{
		_id : 'printer-add-5',
		name : '',
		type : 'adds',
		displayName : 'Printer Tambahan 5'
	},
	{
		_id : 'printer-add-6',
		name : '',
		type : 'adds',
		displayName : 'Printer Tambahan 6'
	},{
		_id : 'printer-add-7',
		name : '',
		type : 'adds',
		displayName : 'Printer Tambahan 7'
	},
	{
		_id : 'printer-add-8',
		name : '',
		type : 'adds',
		displayName : 'Printer Tambahan 8'
	},
	{
		_id : 'printer-add-9',
		name : '',
		type : 'adds',
		displayName : 'Printer Tambahan 9'
	},{
		_id : 'printer-add-10',
		name : '',
		type : 'adds',
		displayName : 'Printer Tambahan 10'
	},
]
