import { afterAll, describe, test } from 'vitest';
import type { E2EPlaywrightContext } from '../../../test-utils';
import { createBrowserContext, freeBrowserContext, untilUpdated } from '../../../test-utils';
describe('k-select e2e test', () => {
	let browserCtx: any = null;
	const createBrowserCtxEnvironment = (
		testRunner: (browserCtx: E2EPlaywrightContext) => Promise<void>
	) => {
		return async () => {
			if (!browserCtx) {
				browserCtx = await createBrowserContext('select');
			}
			await testRunner(browserCtx!);
		};
	};
	afterAll(() => {
		browserCtx && freeBrowserContext(browserCtx);
	});

	test(
		'[k-select](style): Locate item',
		createBrowserCtxEnvironment(async (browserCtx) => {
			const container = await browserCtx.page!.locator('#k_select_located_container');
			await untilUpdated(async () => {
				const trigger = await container!.locator('[data-popover-trigger]');
				trigger?.click();
				await browserCtx.page!.waitForTimeout(500);
				const content = await container?.innerHTML();
				return (content || '').includes('contentEl') + '';
			}, 'true');

			await untilUpdated(async () => {
				const contentEl = await container!.locator('[data-kv-key="200"]');
				return contentEl?.innerHTML();
			}, 'k-select--option__active');
		})
	);
});
