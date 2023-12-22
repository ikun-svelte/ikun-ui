import { afterEach, expect, test, describe, beforeEach, vi } from 'vitest';
import KAffix from '../src';
import { tick } from 'svelte';

const initHost = () => {
	document.body.style.height = '100px';
	document.body.style.overflow = 'auto';
};

beforeEach(() => {
	initHost();
	vi.useFakeTimers();
});
afterEach(() => {
	document.body.innerHTML = '';
	vi.restoreAllMocks();
});

describe('Test: KAffix', () => {
	vi.mock('svelte', async () => {
		const actual = (await vi.importActual('svelte')) as object;
		return {
			...actual,
			// @ts-ignore
			onMount: (await import('svelte/internal')).onMount
		};
	});

	test('props: cls', async () => {
		const instance = new KAffix({
			target: document.body,
			props: {
				cls: 'k-affix--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(
			(document.documentElement as HTMLElement)!.innerHTML.includes('k-affix--test')
		).toBeTruthy();
		expect(document.documentElement.innerHTML).matchSnapshot();
	});

	test('should work with `top` prop', async () => {
		const instance = new KAffix({
			target: document.body,
			props: {
				cls: 'k-affix--test',
				top: 120
			}
		});
		expect(instance).toBeTruthy();
		expect(
			(document.documentElement as HTMLElement)!.innerHTML.includes('k-affix--affixed')
		).not.toBeTruthy();
		document.documentElement.scrollTop = 200;
		document.documentElement.dispatchEvent(new Event('scroll', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(document.body.innerHTML).toContain('top: 120px;');
		expect(document.documentElement.innerHTML).matchSnapshot();
	});

	test('should work with `position` prop', async () => {
		const instance = new KAffix({
			target: document.body,
			props: {
				positionOption: 'absolute'
			}
		});
		expect(instance).toBeTruthy();
		expect(
			(document.documentElement as HTMLElement)!.innerHTML.includes('k-affix--absolute-positioned')
		).toBeTruthy();
		expect(document.documentElement.innerHTML).matchSnapshot();
	});
});
