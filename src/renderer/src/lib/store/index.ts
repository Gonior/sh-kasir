import { writable } from 'svelte/store'

export const theme = writable<string>(localStorage.theme || 'dark')
theme.subscribe((val) => (localStorage.theme = val))
