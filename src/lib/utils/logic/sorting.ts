import removeDuplicates from './removeDuplicateArrat'
import {Constant} from '@lib/types'

const letsSorting = (orders= [], format = Constant.DEFAULT_FORMAT_SORTING ) => {
    
	let menus = orders.filter(order => !order.forId)
	let notes = orders.filter(order => order.forId)
	let sortedOrders = []
	let sortedFormat = []
	for( const f of format) {
		switch(f.type)  {
			case "category"  : {
				let result = menus.filter(menu => menu.category._id === f._id)
				let obj = {
					format : f,
					data : result
				}
				sortedFormat.push(obj)
				break;
			}
			case "printer"  : {
				let result = menus.filter(menu => menu.category.printer._id === f._id)
				let obj = {
					format : f,
					data : result
				}
				sortedFormat.push(obj)
				break;
			}
			default : {

				let obj = {
					format : f,
					data : menus
				}
				sortedFormat.push(obj)
			}
		}
	}
	let sortedOrdersID = []
	for(const i in sortedFormat) {
		if(Object.keys(sortedFormat[i].format).length !== 0) {
			sortedOrdersID.push(...sortedFormat[i].data)
		}
	}
	sortedOrdersID = [...sortedOrdersID.map(menu => menu._id)]
	for(const i in sortedFormat) {
		if(Object.keys(sortedFormat[i].format).length === 0) {
			sortedFormat[i].data = sortedFormat[i].data.filter(d => sortedOrdersID.indexOf(d._id) === -1)
		}
	}
	if(sortedFormat.length > 0) {
		let result = []
		for(const i in sortedFormat) {
			result.push(...sortedFormat[i].data)
		}
		for(const i in result) {
			let filterNotes = notes.filter(note => note.forId === result[i]._id)
			if( filterNotes.length > 0) sortedOrders.push(result[i], ...filterNotes)
			else sortedOrders.push(result[i])
		}

	} else sortedOrders = [...orders]


	sortedOrders = [...removeDuplicates(sortedOrders)]
	return sortedOrders

}

export default letsSorting