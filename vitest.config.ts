import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
export default defineConfig({
	plugins: [
		svelte({
			hot: !process.env.VITEST,
			preprocess: [sveltePreprocess({ typescript: true })]
		})
	],
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['components/**/*.{test,spec}.{js,ts}']
	}
});
