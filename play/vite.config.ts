// @ts-ignore
import { sveltekit } from '@sveltejs/kit/vite';
import Inspect from 'vite-plugin-inspect';
import { defineConfig } from 'vitest/config';
import Unocss from 'unocss/vite';
export default defineConfig({
	plugins: [sveltekit(), Unocss(), Inspect()],
	test: {
		include: ['components/**/*.{test,spec}.{js,ts}']
	}
});
