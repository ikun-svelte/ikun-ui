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
		'props: clearable',
		createBrowserCtxEnvironment(async (browserCtx) => {
			const container = await browserCtx.page!.$('#k_select_clearable_container');

			await untilUpdated(async () => {
				const result = await container!.$('#k_select_clearable_value');
				return result?.textContent()
			}, '200');

			await untilUpdated(async () => {
				const trigger =  await container!.$('[data-popover-trigger]')
				trigger?.click()
				await browserCtx.page!.waitForTimeout(200);
				const clearBtn =  await container!.$('[data-k-select-clear]')
				clearBtn?.click()
				await browserCtx.page!.waitForTimeout(200);
				const result = await container!.$('#k_select_clearable_value');
				return result?.textContent();
			}, 'undefined');
		})
	);

	test(
		'event: should trigger updateValue event',
		createBrowserCtxEnvironment(async (browserCtx) => {
			const container = await browserCtx.page!.$('#k_select_updated_container');
			 await untilUpdated(async () => {
			 	const trigger =  await container!.$('[data-popover-trigger]')
				 trigger?.click()
			 	await browserCtx.page!.waitForTimeout(200);
				const content = await container?.innerHTML()
			 	return (content || '').includes('contentEl') + '';
			 }, 'true');

			await untilUpdated(async () => {
				const result = await container!.$('#k_select_updated_value');
				return result?.textContent()
			}, '200');

			await untilUpdated(async () => {
				const contentEl = await container!.$('[data-kv-key="203"]')
				const option = await contentEl!.$('option')
				option?.dispatchEvent('click', { bubbles: true });
				await browserCtx.page!.waitForTimeout(200);
				const result = await container!.$('#k_select_updated_value');
				return result?.textContent();
			}, '203');
		})
	);

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
