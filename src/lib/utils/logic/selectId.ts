
const selectId = <T extends { selected?: boolean, [index : string] : any}>(items : T[], params : number | string, callback? : (id: string) => void ) : T[] => {
    let result : T[] = [] 
    if (!items || items.length === 0 ) return null

    result = [...items.map((item : T) => {
        if(item.id === params || item._id === params) {
            item.selected = true
            if( callback && typeof callback === "function") {
                if(item.id) callback(item.id)
                else if (item._id) callback(item._id)

            }
        }
        else item.selected = false
        return item
    })]

    return result
}

export default selectId