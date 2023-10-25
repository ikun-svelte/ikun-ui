import { describe, test } from 'vitest';
import type { E2EPlaywrightContext } from '../../../test-utils';
import { createBrowserContext, freeBrowserContext, untilUpdated } from '../../../test-utils';
describe('k-select e2e test', () => {
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
		'event: should not trigger updateValue event when disabled',
		createBrowserCtxEnvironment(async (browserCtx) => {
			const container = await browserCtx.page!.$('#k_select_disabled_container');
			await untilUpdated(async () => {
				const trigger =  await container!.$('[data-popover-trigger]')
				trigger?.click()
				await browserCtx.page!.waitForTimeout(200);
				const content = await container?.innerHTML()
				return (content || '').includes('contentEl') + '';
			}, 'false');

			await untilUpdated(async () => {
				const result = await container!.$('#k_select_disabled_value');
				return result?.textContent()
			}, '200');
		})
	);
});
