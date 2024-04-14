import type { IModel, TPage, ServerConfig } from '../types'
import { writable } from 'svelte/store'

const serverStored = !localStorage.server ? JSON.stringify({type : 'local', ip : 'localhost'}) : localStorage.server
const userStored = localStorage.user ?  localStorage.user : "{}"
const storeInfoStored = localStorage.storeInfo ? localStorage.storeInfo : "{}"
const taxInfoStored = localStorage.taxInfo ? localStorage.taxInfo : "{}"
export const theme = writable<string>(localStorage.theme || 'dark')
export const token = writable<string>(localStorage.token || '')
export const page = writable<TPage>(localStorage.page || "Home")
export const user = writable<IModel.IUser|{}>(JSON.parse(userStored))
export const server = writable<ServerConfig>(JSON.parse(serverStored))
export const storeInfo = writable<IModel.IStoreInfo>(JSON.parse(storeInfoStored))
export const taxInfo = writable<IModel.ITax>(JSON.parse(taxInfoStored))

theme.subscribe((val) => (localStorage.theme = val))
token.subscribe( val => localStorage.token = val)
page.subscribe( val => localStorage.page = val)
server.subscribe( val => localStorage.server = JSON.stringify(val))
user.subscribe(val => localStorage.user = JSON.stringify(val))
storeInfo.subscribe(val => localStorage.storeInfo = JSON.stringify(val))
taxInfo.subscribe(val => localStorage.taxInfo = JSON.stringify(val))

