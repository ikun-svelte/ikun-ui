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
			enforce: 'pre',
			resolveId(id: string) {
				if (id === 'esm-env') return '\0esm-env';
			},
			load(id: string) {
				if (id === '\0esm-env') return 'export const BROWSER = true';
			}
		} as Plugin
	],
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['components/**/*.{test,spec}.{js,ts}']
	}
});
