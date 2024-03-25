import { theme } from "@lib/store";

const switchTheme = (isDarkMode : boolean ) : void => {
	if(isDarkMode) {
		document.documentElement.classList.add('dark')
		theme.set('dark')
	} else {
		document.documentElement.classList.remove('dark')
		theme.set('light')
	}
}

export default switchTheme

