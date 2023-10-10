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

	/*test(
		'props: start',
		createBrowserCtxEnvironment(async (browserCtx) => {
			const container = await browserCtx.page!.$('#k_v_list_start')
			await untilUpdated(async () => {
				const res = await container!.$('[data-kv-key="30"]');
				return !!res + '';
			}, 'true');
			await untilUpdated(async () => {
				const res = await container!.$('[data-kv-key="29"]');
				return !!res + '';
			}, 'false');
		})
	);*/

	test(
		'props: offset',
		createBrowserCtxEnvironment(async (browserCtx) => {
			const container = await browserCtx.page!.locator('#k_v_list_offset');
			await untilUpdated(async () => {
				await browserCtx.page!.waitForTimeout(100);
				const scrollTop = await container!.evaluate((el) => {
					return el.scrollTop;
				});
				return scrollTop + '';
			}, '100');
		})
	);
});
