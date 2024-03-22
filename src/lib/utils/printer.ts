import {isValidObject} from './myFunct'
import {IModel} from '@lib/types'

export const needToPrint = (items: IModel.IItem[] = []):boolean => {
    if (items.length === 0) return false
    for (const item of items) {
        if (isValidObject(item) && Object.hasOwn(item, 'printed') && item.printed === false) return true
    }
    return false
}