import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import Printer from './lib/controllers/printer.controller'
import {readConfigPrinterFile, writeConfigPrinterFile, writeDefaultConfigPrinter} from './lib/utils'

function createWindow(): void {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 1280,
		height: 1024,
		show: false,
		autoHideMenuBar: true,
		icon : icon,
		webPreferences: {
			preload: join(__dirname, '../preload/index.js'),
			sandbox: false
		}
	})

	mainWindow.on('ready-to-show', () => {
		mainWindow.show()
	})

	mainWindow.webContents.setWindowOpenHandler(details => {
		shell.openExternal(details.url)
		return { action: 'deny' }
	})

	ipcMain.handle('get-printers-async', async (_event) => {
		return mainWindow.webContents.getPrintersAsync()
	})

	// HMR for renderer base on electron-vite cli.
	// Load the remote URL for development or the local html file for production.
	if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
		mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
	} else {
		mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
	}
}


app.whenReady().then(() => {
	if (!readConfigPrinterFile()) writeDefaultConfigPrinter()
	// const printerController = new Printer({name : 'Kasir 79', _id : 'main-pr', type : 'main' })
	// printerController.getConnection().then(connected => console.log({connected}))
	
	// execute()
	// 	.then(data => console.log(data))
	// 	.catch(err => console.log(err))
	electronApp.setAppUserModelId('com.electron')

	app.on('browser-window-created', (_, window) => {
		optimizer.watchWindowShortcuts(window)
	})

	// IPC test
	ipcMain.handle('ping', async (_event, printer) => {
		const printerController = new Printer(printer)
		let result = await printerController.pingHostname()
		return result
	} )

	ipcMain.handle('print', async (_event, {printer, data, options}) => {
		try {
			const printerController = new Printer(printer)
			let result = await printerController.print(data, options)
			return result	
		} catch (error) {
			throw new Error(error)
		}

	})

	ipcMain.handle('write-printer-config', async (_event, data) => {
		return writeConfigPrinterFile(data)
	})

	ipcMain.handle('read-printer-config', async (_event) => {
		return readConfigPrinterFile()
	})



	createWindow()

	app.on('activate', function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
