const ascendingAlphabetByName = (a : any, b : any) => {
	if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
	if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
	return 0
}

export default ascendingAlphabetByName