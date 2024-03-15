import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import {readConfigPrinterFile, writeConfigPrinterFile, writeDefaultConfigPrinter} from './lib/utils'

function createWindow(): void {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 1280,
		height: 1024,
		show: false,
		autoHideMenuBar: true,
		...(process.platform === 'linux' ? { icon } : {}),
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

	ipcMain.handle('list-printer', async (_event) => {
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

	electronApp.setAppUserModelId('com.electron')

	app.on('browser-window-created', (_, window) => {
		optimizer.watchWindowShortcuts(window)
	})

	// IPC test
	ipcMain.on('ping', () => console.log('pong'))

	ipcMain.handle('print', (_event, data) => {
		console.log(data)
		return {success : true, message : "you success!!"}
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
