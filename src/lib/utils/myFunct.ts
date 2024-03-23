
import { createAvatar } from "@dicebear/core";
import { thumbs } from "@dicebear/collection";
import { theme } from "../store";


export const convertToRupiah = (num : number = 0) => {
	let rupiah = ''
	let angkarev = num.toString().split('').reverse().join('')
	for (let i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.'
	return rupiah
		.split('', rupiah.length - 1)
		.reverse()
		.join('')
}
export const handleSwitchTheme = (isDarkMode : boolean ) : void => {
	if(isDarkMode) {
		document.documentElement.classList.add('dark')
		theme.set('dark')
	} else {
		document.documentElement.classList.remove('dark')
		theme.set('light')
	}
}

export const dateFormat = (date : Date, optDate :Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', weekday:'long', year:"numeric" }, optHours : Intl.DateTimeFormatOptions = { hour: '2-digit', minute: 'numeric', second:'numeric', hour12: false }) => {
	const myDate = new Date(date)
	let datestring: string
	let time : string
	try {
		datestring = new Intl.DateTimeFormat('id-ID', optDate).format(myDate)
		time = new Intl.DateTimeFormat('id-ID', optHours).format(myDate)
	} catch (error) {
		console.log(error)
	}
	return { datestring, time, full : `${datestring} ${time}` }
}

export const capitalize = (str : string) => {
	return `${str[0].toUpperCase()}${str.slice(1)}`
}

export const scrollToElement = async (elementId : string, options : ScrollIntoViewOptions = { behavior: 'instant', block: 'nearest' }) => {
	let el = document.querySelector(`#${elementId}`)
	if (!el) return
	el.scrollIntoView(options)
}

export const generateAvatar = (seed = "") => {
	return createAvatar(thumbs, {
		seed, radius:50, size : 64
	}).toDataUriSync()
}

export const parsingDate = (array=[]) => {
	return array.map((a) => {
		a.createdAt = new Date(a.createdAt)
		return a
	})
}

export const setFilter = (data = [], props : string, value : any ) => {
    let result = data.filter((d) => d[props] === value)
    return result
}

export const isEqual = (obj1: { [x: string]: any; }, obj2: { [x: string]: any; }) : boolean => {
    // customer, orders
    if( obj1.customer !== obj2.customer ) return false

    let orders1 = obj1.orders
    let orders2 = obj1.orders
    if(orders1.length !== orders2.length) return false

    for (let i = 0; i < orders1.length; i++) {
        if (!orders1[i].forId) {
            if (orders1[i].name !== orders2[i].name) return false
            if (orders1[i].qty !== orders2[i].qty) return false
            if (orders1[i].price !== orders2[i].price) return false
            if (orders1[i].total !== orders2[i].total) return false
            if (orders1[i].printed !== orders2[i].printed) return false
        } else {
            if (orders1[i].name !== orders2[i].name) return false
            if (orders1[i].forId !== orders2[i].forId) return false
            if (orders1[i].printed !== orders2[i].printed) return false
        }
    }
	return true
}

export const removeDuplicates = (array) => {
	let newArray = []
	let uniqueObject = {}
	for (let i in array) {
		if (array[i]) {
			let _id = array[i]['_id']
			uniqueObject[_id] = array[i]
		}
	}
	for (let i in uniqueObject) {
		newArray.push(uniqueObject[i])
	}
	return newArray
}



