const scrollToElement = (elementId : string, options? : ScrollIntoViewOptions) : void=> {
	let el = document.querySelector(`#${elementId}`)
	if (!el) return
	el.scrollIntoView(options)
}

export default scrollToElement