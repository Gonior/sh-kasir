const searchHandler =  <T>(keyword : string, props : string[], dataDuplicate : T[]) : T[] => {
	let filtered = []
	let regex = new RegExp(`${keyword}`, 'i')
	filtered = [...dataDuplicate.filter((aaa) => {

		if(props.length > 0) {
			for (let i = 0; i < props.length; i++) {
				if(regex.test(aaa[props[i]])) return true
			}
			return false
		}
		return false
	})]

	if (keyword === '') return dataDuplicate
	else return filtered


}

export default searchHandler
