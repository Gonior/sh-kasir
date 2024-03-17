function handleKeydown(keyCode : number, selector : string, cb?) {
	if (keyCode !== 38 && keyCode !== 40 && keyCode !== 13) return
	const current = <HTMLElement>document.activeElement

	const items =  [...document.querySelectorAll(selector)]
	const currentIndex = items.indexOf(current)
	let newIndex : number
	if (currentIndex === -1) {
		newIndex = 0
	} else {
		if (keyCode === 38) newIndex = (currentIndex + items.length - 1) % items.length
		else if (keyCode === 40) newIndex = (currentIndex + 1) % items.length
		else if (keyCode === 13) if (cb && typeof cb === 'object') cb(current)

	}

	(items[newIndex] as HTMLElement)?.focus()
	current?.blur()
}

export default handleKeydown
