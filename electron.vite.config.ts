/* eslint-env node */
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { fileURLToPath } from 'node:url'
import { resolve } from 'path'

export default defineConfig({
	main: {
		build : {
			rollupOptions : {
				input : {
					index : resolve(__dirname, 'electron/main/index.ts')
				}
			}
		},
		resolve : {
			alias : {
				find: '@lib',
				replacement: fileURLToPath(new URL('../../src/lib', import.meta.url))
			},
		},
		plugins: [externalizeDepsPlugin()]
	},
	preload: {
		build : {
			rollupOptions : {
				input : {
					index : resolve(__dirname, 'electron/preload/index.ts')
				}
			}
		},
		plugins: [externalizeDepsPlugin()]
	},
	renderer: {
		root : '.',
		build : {
			rollupOptions : {
				input : {
					index : resolve(__dirname, 'index.html')
				}
			}
		},
		resolve : {
			alias: [
				{
					find: '@',
					replacement: fileURLToPath(new URL('src', import.meta.url))
				},
				{
					find: '@lib',
					replacement: fileURLToPath(new URL('src/lib', import.meta.url))
				},
				{
					find: '@assets',
					replacement: fileURLToPath(new URL('src/assets', import.meta.url))
				},
				{
					find: '@routes',
					replacement: fileURLToPath(new URL('src/routes', import.meta.url))
				},
				{
					find: '@components',
					replacement: fileURLToPath(new URL('src/lib/components', import.meta.url))
				},
				{
					find: '@store',
					replacement: fileURLToPath(new URL('src/lib/store', import.meta.url))
				}
			]
		},
		plugins: [svelte()]
	}
})
