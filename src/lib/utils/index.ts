import httpErrorHandler from './handler/httpErrorHandler'
import keydownHandler from './handler/keydownHandler';
import searchHandler from "./handler/searchHandler";
import isValidObject from "./logic/isValidObject";
import needToPrint from "./logic/needToPrint";
import removeDuplicateArray from "./logic/removeDuplicateArrat";
import sorting from './logic/sorting'
import * as validator from './logic/validator'
import ascendingAlphabetByName from './logic/arraySortByName';
import clickOutside from "./ui/clickoutside";
import scrollToBottom from './ui/scrollToBottom';
import scrollToElement from './ui/scrollToElement';
import generateAvatar from "./ui/generateAvatar";
import portal from "./ui/portal";
import switchTheme from './ui/switchTheme';
import formatCurrency from './ui/formatCurrency'
import addedEffect from './ui/addedEffect';
export {
    addedEffect,
    ascendingAlphabetByName,
    clickOutside,
    portal,
    sorting,
    isValidObject,
    httpErrorHandler,
    generateAvatar,
    searchHandler,
    validator,
    removeDuplicateArray,
    needToPrint,
    keydownHandler,
    switchTheme,
    formatCurrency,
    scrollToBottom,
    scrollToElement
}
