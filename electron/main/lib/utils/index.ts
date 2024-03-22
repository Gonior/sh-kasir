import jetpack from 'fs-jetpack'
import process from 'process'
import path from 'path'
// import exec from 'child_process'
// import bin from '../../../resources/server/sh-server.exe?asset&asarUnpack'
export const NAME_CONFIG_PRINTER = 'config/printer.json'


export const getFilePath = (nameOfFile : string) => {
	let result : string
	if (import.meta.env.PROD)
	result = path.join(process.cwd(), `/resources/app.asar.unpacked/resources/${nameOfFile}`)
	else result = result = path.join(process.cwd(), `resources/${nameOfFile}`)
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

export const execute = () => {
	return new Promise((resolve, _reject) => {
		resolve('server is running bla bla')
		// let cwd = import.meta.env.PROD ? path.join(process.cwd(), '/resources/app.asar.unpacked/resources/server') : path.join(process.cwd(), 'resources/server')
		// exec.execFile(bin, {cwd }, (err, _data) => {
		// 	err ? reject(err) : resolve('server is running')
		// })
	})
}

export const convertToRupiah = (num : number = 0) => {
    try {
        let rupiah = ''
        let angkarev = num.toString().split('').reverse().join('')
        for (let i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.'
        return rupiah
            .split('', rupiah.length - 1)
            .reverse()
            .join('')    
    } catch (error) {
        return '0'
    }
	
}

export const isValidObject = (obj : any) : boolean => {
    if (obj && typeof obj === 'object' && Object.keys(obj).length > 0) return true

    return false
}