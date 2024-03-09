module.exports = {
	parserOptions: {
		extraFileExtensions: ['.svelte']
	},
	root: true,
	extends: ['eslint:recommended', 'plugin:svelte/recommended', 'prettier'],
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	],
	globals: {
		window: true,
		module: true
	},
	env: {
		browser: true,
		node: true,
	},
	rules: {
		// 'svelte/no-unused-svelte-ignore': 'off'
	}
}
