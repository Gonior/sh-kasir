const removeDuplicateArray = (array : any[]) => {
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

export default removeDuplicateArray