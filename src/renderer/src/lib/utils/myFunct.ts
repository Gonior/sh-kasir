
import { createAvatar } from "@dicebear/core";
import { thumbs } from "@dicebear/collection";
import { theme } from "../store";
import toast from "@teddy-error/svelte-french-toast";
import {AxiosError} from 'axios'
import type { IService } from "../types";

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

export const catch_func = (error : AxiosError) => {
    // this portion is the same universally
	let message 
    if (error.response) {
		if(error.response.status === 401 || error.response.status === 403) {
			message = "Akses ditolak. silakan login terlebih dahulu"
		} else if (error.response.data) {
			let response = error.response.data as IService.IResponse<unknown>
			message = response.message
		}		
		console.log(error.response.headers);
    } else if (error.request) {
		message = error.request
      	console.log(error.request);
    } else {
		message = error.message
      	console.log('Error', error.message);
    }
    toast.error(
		`ERROR ${error.response.status}: 
		${message}
		Lihat console untuk informasi lebih lanjut.`,
		{
			duration: 4000,
			position: 'top-right',
		}
    );
    console.log(error.config);
}