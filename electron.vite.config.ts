/* eslint-env node */
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { fileURLToPath } from 'node:url'

export default defineConfig({
	main: {
		plugins: [externalizeDepsPlugin()]
	},
	preload: {
		plugins: [externalizeDepsPlugin()]
	},
	renderer: {
		resolve : {
			alias: [
				{
					find: '@',
					replacement: fileURLToPath(new URL('./src/renderer/src', import.meta.url))
				},
				{
					find: '@lib',
					replacement: fileURLToPath(new URL('./src/renderer/src/lib', import.meta.url))
				},
				{
					find: '@assets',
					replacement: fileURLToPath(new URL('./src/renderer/src/assets', import.meta.url))
				},
				{
					find: '@routes',
					replacement: fileURLToPath(new URL('./src/renderer/src/routes', import.meta.url))
				},
				{
					find: '@components',
					replacement: fileURLToPath(new URL('./src/renderer/src/lib/components', import.meta.url))
				},
				{
					find: '@store',
					replacement: fileURLToPath(new URL('./src/renderer/src/lib/store', import.meta.url))
				}
			]
		}, 
		plugins: [svelte()]
	}
})
