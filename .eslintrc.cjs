module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	],
	rules: {
		'@typescript-eslint/nk-explicit-any': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'svelte/nk-at-html-tags': 'off',
		'svelte/valid-compile': 'off',
		'@typescript-eslint/nk-non-null-assertion': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'svelte/no-at-html-tags': 'off'
	}
};
