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
			resolveId(id: string) {
				if (id === '$app/environment') return '\0$app/environment';
			},
			load(id: string) {
				if (id === '\0$app/environment') return 'export const browser = true';
			}
		} as Plugin
	],
	build: {
		chunkSizeWarningLimit: 999999
	}
});
