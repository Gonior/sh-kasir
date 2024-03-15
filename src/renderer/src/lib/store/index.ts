import type { IModel } from '../types'
import { writable } from 'svelte/store'

const serverStored = !localStorage.server ? JSON.stringify({type : 'local', ip : 'localhost'}) : localStorage.server
const userStored = localStorage.user ?  localStorage.user : "{}"
export const theme = writable<string>(localStorage.theme || 'dark')
export const token = writable<string>(localStorage.token || '')
export const user = writable<IModel.User|{}>(JSON.parse(userStored))
export const server = writable<IModel.ServerConfig>(JSON.parse(serverStored))
theme.subscribe((val) => (localStorage.theme = val))
token.subscribe( val => localStorage.token = val)
server.subscribe( val => localStorage.server = JSON.stringify(val))
user.subscribe(val => localStorage.user = JSON.stringify(val))
