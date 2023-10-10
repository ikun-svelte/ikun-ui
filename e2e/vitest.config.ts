import { defineConfig } from 'vitest/config';

const timeout = process.env.CI ? 50000 : 30000;
export default defineConfig({
	test: {
		include: ['./src/**/*.test.[tj]s'],
		testTimeout: timeout,
		hookTimeout: timeout,
		reporters: 'dot',
		onConsoleLog(log) {
			if (log.match(/experimental|jit engine|emitted file|tailwind/i)) return false;
		}
	},
	esbuild: {
		target: 'node14'
	}
});
