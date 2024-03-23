export enum EHttpMethod {
	GET = "GET",
	POST = "POST",
	PATCH = "PATCH",
	DELETE = "DELETE",
}

export enum EEndPoint {
	LOGIN = '/login',
	USER = '/user',
	CATEGORY = '/category',
	MENU = '/menu',
	MENU_SEARCH = '/menu/search',
	ACTIVITY = '/activity',
	STORE = '/store',
	TEMP = '/temp',
	ORDER = '/order',
	ORDER_LAST = '/order/last',
	ORDER_NOT_PAID = '/order/notPaid',
	ORDER_BATCH = '/order/batch'
}

export enum EPrinterType {
	MAIN = 'main',
	COPY = 'copy',
	ADDON = 'addon'
}

export enum EPrinterID {
	MAIN_PRINTER = 'main-pr',
	COPY_PRINTER = 'copy-pr',
	ADDON_PRINTER = 'addon-pr-'
}

export enum EPrinterDisplayName {
	MAIN_PRINTER = 'Printer Kasir',
	COPY_PRINTER = 'Printer Rekap Pesanan',
	ADDON_PRINTER = 'Printer Tambahan '
}
