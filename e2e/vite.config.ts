// @ts-ignore
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import Unocss from 'unocss/vite';
export default defineConfig({
	plugins: [sveltekit(), Unocss()]
	/*	test: {
		include: ['components/!**!/!*.{test,spec}.{js,ts}']
	}*/
});
