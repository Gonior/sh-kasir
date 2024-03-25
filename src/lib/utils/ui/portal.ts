const portal = (node: HTMLElement) => {
	document.querySelector('body')?.appendChild(node).focus();
}

export default portal
