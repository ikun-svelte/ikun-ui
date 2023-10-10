import { fileURLToPath } from 'node:url';
import { expect } from 'vitest';
import { type Browser, type BrowserContext, type Page, chromium } from 'playwright-chromium';
import type { InlineConfig, ViteDevServer } from 'vite';
import { createServer, loadConfigFromFile, mergeConfig } from 'vite';

type Nil = null | undefined;

export interface E2EPlaywrightContext {
	browser: Browser | undefined;
	browserCtx: BrowserContext | undefined;
	page: Page | undefined;
	viteServer: ViteDevServer | undefined;
	viteTestUrl?: string;
}

const timeout = (n: number) => new Promise((resolve) => setTimeout(resolve, n));

async function startDefaultServe(e2eTestCtx: E2EPlaywrightContext) {
	const __dirname = fileURLToPath(new URL('../../', import.meta.url));
	const options: InlineConfig = {
		logLevel: 'info',
		configFile: false,
		server: {
			watch: {
				// During tests we edit the files too fast and sometimes chokidar
				// misses change events, so enforce polling for consistency
				usePolling: true,
				interval: 1e2
			},
			host: true,
			fs: {
				strict: true
			}
		},
		build: {
			// esbuild do not minify ES lib output since that would remove pure annotations and break tree-shaking
			// skip transpilation during tests to make it faster
			target: 'esnext',
			// tests are flaky when `emptyOutDir` is `true`
			emptyOutDir: false
		}
	};

	const res = await loadConfigFromFile(
		{
			command: 'serve',
			mode: 'development'
		},
		undefined,
		__dirname
	);

	process.env.VITE_INLINE = 'inline-serve';
	const testConfig = mergeConfig(options, res?.config || {});
	e2eTestCtx.viteServer = await (await createServer(testConfig)).listen();
	// use resolved port/base from server
	const devBase = e2eTestCtx.viteServer.config.base;
	e2eTestCtx.viteTestUrl = `http://localhost:${e2eTestCtx.viteServer.config.server.port}${
		devBase === '/' ? '' : devBase
	}`;
}

export async function createBrowserContext() {
	const e2eBrowserCtx: E2EPlaywrightContext = {
		browser: undefined,
		browserCtx: undefined,
		page: undefined,
		viteServer: undefined
	};
	e2eBrowserCtx.browser = await chromium.launch();
	e2eBrowserCtx.browserCtx = await e2eBrowserCtx.browser.newContext();
	e2eBrowserCtx.page = await e2eBrowserCtx.browserCtx.newPage();
	await startDefaultServe(e2eBrowserCtx);
	await e2eBrowserCtx.page?.goto(e2eBrowserCtx.viteTestUrl!);
	return e2eBrowserCtx;
}

export async function freeBrowserContext(ctx: E2EPlaywrightContext) {
	await ctx.page?.close();
	if (ctx.browser) {
		await ctx.browser.close();
	}
}

export async function untilUpdated(
	poll: () => (string | Nil) | Promise<string | Nil>,
	expected: string
) {
	const maxTries = 50;
	for (let tries = 0; tries < maxTries; tries++) {
		const actual = (await poll()) ?? '';
		if (actual.includes(expected) || tries === maxTries - 1) {
			expect(actual).toMatch(expected);
			break;
		} else {
			await timeout(50);
		}
	}
}

export async function getColor(e2eTestCtx: E2EPlaywrightContext, selector: string, page?: Page) {
	const pageCtx = page ?? e2eTestCtx.page;
	return await pageCtx?.$eval(selector, (el) => getComputedStyle(el).color);
}
