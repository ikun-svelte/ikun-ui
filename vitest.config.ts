import { defineConfig, Plugin } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
export default defineConfig({
	plugins: [
		svelte({
			hot: !process.env.VITEST,
			preprocess: [sveltePreprocess({ typescript: true })]
		}),
		{
			name: 'compatible:svelte:kit',
			post: 'pre',
			resolveId(id: string) {
				if (id === '$app/environment') return '\0$app/environment';
			},
			load(id: string) {
				if (id === '\0$app/environment') return 'export const browser = true';
			}
		} as Plugin
	],
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['components/**/*.{test,spec}.{js,ts}']
	}
});
