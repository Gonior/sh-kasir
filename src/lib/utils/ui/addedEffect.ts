import { theme } from '@lib/store'
import { get } from 'svelte/store'
const addedEffect = (_node: HTMLElement ) => {
    function getBgColor(t : number) {
        return get(theme) === 'light' ? `rgb(253, 230, 138, ${t})` : `rgb(120, 53, 15, ${t})`
    }
    return {
        duration : 500,
        css(t : number) {
            if (t < 0.3) {
                return `
                    background: ${getBgColor(t)} ;
                    `;
            } else if( t > 0.7) {
                return `
                    background: ${getBgColor(1-t)} ;
                    `;
            } else {
                //#78350f
                return `
                    background: ${getBgColor(1)} ;
                `;
            }
        },
    }
}

export default addedEffect