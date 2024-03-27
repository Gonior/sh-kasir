import type { IModel } from '@lib/types'
import removeDuplicates from './removeDuplicateArrat'
import SortFormat from '@lib/models/sortFormat.model'
const sortFormat = new SortFormat()
const letsSorting = async (orders= []) => {
	let format : IModel.ISortItem[] = []
	let isSuccess = await sortFormat.load()
	if( isSuccess) {
		format = sortFormat.values
	}

	let menus = orders.filter(order => !order.forId)
	let notes = orders.filter(order => order.forId)
	let sortedOrders = []
	let sortedFormat = []
	for( const f of format) {
		let result = menus.filter(menu => menu.category._id === f.value)
		let obj = {
			format : f,
			data : result
		}
		// sortedFormat.push(obj)
		// switch(f.type)  {
		// 	case "category"  : {
				
		// 		break;
		// 	}
		// 	case "printer"  : {
		// 		let result = menus.filter(menu => menu.category.printer._id === f.id)
		// 		let obj = {
		// 			format : f,
		// 			data : result
		// 		}
		// 		sortedFormat.push(obj)
		// 		break;
		// 	}
		// 	default : {

		// 		let obj = {
		// 			format : f,
		// 			data : menus
		// 		}
		// 		sortedFormat.push(obj)
		// 	}
		// }
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