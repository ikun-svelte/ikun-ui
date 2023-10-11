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
		'props: start',
		createBrowserCtxEnvironment(async (browserCtx) => {
			const container = await browserCtx.page!.$('#k_v_list_start');
			await untilUpdated(async () => {
				const res = await container!.$('[data-kv-key="30"]');
				return !!res + '';
			}, 'true');
			await untilUpdated(async () => {
				const res = await container!.$('[data-kv-key="29"]');
				return !!res + '';
			}, 'false');
		})
	);

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

	test(
		'slot: default',
		createBrowserCtxEnvironment(async (browserCtx) => {
			const container = await browserCtx.page!.$('#k_v_list_slot_default');
			await untilUpdated(async () => {
				const res = await container!.$('[data-kv-key="1"]');
				return !!res + '';
			}, 'true');
		})
	);

	test(
		'slot: header',
		createBrowserCtxEnvironment(async (browserCtx) => {
			const container = await browserCtx.page!.$('#k_v_list_slot_header');
			await untilUpdated(async () => {
				const res = await container!.$('[data-kv-key="header"]');
				return !!res + '';
			}, 'true');
		})
	);

	test(
		'slot: footer',
		createBrowserCtxEnvironment(async (browserCtx) => {
			const container = await browserCtx.page!.$('#k_v_list_slot_footer');
			await untilUpdated(async () => {
				const res = await container!.$('[data-kv-key="footer"]');
				return !!res + '';
			}, 'true');
		})
	);

	test(
		'event: scroll',
		createBrowserCtxEnvironment(async (browserCtx) => {
			const container = await browserCtx.page!.locator('#k_v_list_event_scroll');
			await untilUpdated(async () => {
				const result = await browserCtx.page!.locator('#scroll_result');
				return result.textContent();
			}, '');

			await untilUpdated(async () => {
				await container!.evaluate((el) => {
					el.scrollTop = 100;
				});
				container.dispatchEvent('scroll', { bubbles: true });
				await browserCtx.page!.waitForTimeout(200);
				const result = await browserCtx.page!.locator('#scroll_result');
				const text = await result.textContent();
				return !!text + '';
			}, 'true');
		})
	);

	test(
		'event: top & bottom',
		createBrowserCtxEnvironment(async (browserCtx) => {
			const container = await browserCtx.page!.locator('#k_v_list_event_tb');
			await untilUpdated(async () => {
				const result = await browserCtx.page!.locator('#scroll_result_tb');
				return result.textContent();
			}, '');

			await untilUpdated(async () => {
				await container!.evaluate((el) => {
					el.scrollTop = 99999;
				});
				container.dispatchEvent('scroll', { bubbles: true });
				await browserCtx.page!.waitForTimeout(200);
				const result = await browserCtx.page!.locator('#scroll_result_tb');
				return result.textContent();
			}, 'bottom');

			await untilUpdated(async () => {
				await container!.evaluate((el) => {
					el.scrollTop = 0;
				});
				container.dispatchEvent('scroll', { bubbles: true });
				await browserCtx.page!.waitForTimeout(200);
				const result = await browserCtx.page!.locator('#scroll_result_tb');
				return result.textContent();
			}, 'top');
		})
	);
});
