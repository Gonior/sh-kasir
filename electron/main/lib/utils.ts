import jetpack from 'fs-jetpack'
import process from 'process'
import path from 'path'
export const NAME_CONFIG_PRINTER = 'config/printer.json'

export const getFilePath = (nameOfFile : string) => {
	let result : string
	if (import.meta.env.PROD)
		result = path.join(process.cwd(), `/resources/app.asar.unpacked/resources/${nameOfFile}`)
	else result = path.join(process.cwd(), `resources/${nameOfFile}`)
	return result
}

export const writeConfigPrinterFile = (configFile) => {
	jetpack.write(getFilePath(NAME_CONFIG_PRINTER), JSON.stringify(configFile), { jsonIndent: 2 })
	return 'Berhasil Menyimpan Konfigurasi Printer'
}

export const writeDefaultConfigPrinter = () => {
	jetpack.write(getFilePath(NAME_CONFIG_PRINTER), JSON.stringify([]), {
		jsonIndent: 2
	})
	return 'initial config printer written'
}

export const readConfigPrinterFile = () => {
	return jetpack.read(getFilePath(NAME_CONFIG_PRINTER), 'json')
}
