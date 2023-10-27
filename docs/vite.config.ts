import { defineConfig, type Plugin } from 'vite';
import UnoCSS from 'unocss/vite';
// @ts-ignore
import { svelte } from '@sveltejs/vite-plugin-svelte';
export default defineConfig({
	plugins: [
		svelte(),
		UnoCSS(),
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
	build: {
		chunkSizeWarningLimit: 999999
	}
});
