/* eslint-env node */
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path'

export default defineConfig({
	main: {
		plugins: [externalizeDepsPlugin()]
	},
	preload: {
		plugins: [externalizeDepsPlugin()]
	},
	renderer: {
		resolve : {
			alias : {
				'@components' : resolve(__dirname, 'src/renderer/src/lib/components'),
				'@types' : resolve(__dirname, 'src/renderer/src/lib/types'),
				'@utils' : resolve(__dirname, 'src/renderer/src/lib/utils'),
				'@routes' : resolve(__dirname, 'src/renderer/src/routes')
			}
		},
		plugins: [svelte()]
	}
})
