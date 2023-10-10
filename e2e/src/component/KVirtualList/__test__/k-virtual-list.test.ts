import { describe, test } from 'vitest';
import type { E2EPlaywrightContext } from '../../../test-utils';
import { createBrowserContext, freeBrowserContext, untilUpdated } from '../../../test-utils';
describe('k-virtual-list e2e test', () => {
	const createBrowserCtxEnvironment = (
		testRunner: (browserCtx: E2EPlaywrightContext) => Promise<void>
	) => {
		return async () => {
			const browserCtx = await createBrowserContext();
			await testRunner(browserCtx);
			freeBrowserContext(browserCtx);
		};
	};

	test(
		'props: offset',
		createBrowserCtxEnvironment(async (browserCtx) => {
			await untilUpdated(async () => {
				const res = await browserCtx.page!.$('[data-kv-key="30"]');
				return !!res + '';
			}, 'true');
			await untilUpdated(async () => {
				const res = await browserCtx.page!.$('[data-kv-key="29"]');
				return !!res + '';
			}, 'false');
		})
	);
});
