import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KFlex from '../src';
import KFlexWrap from './fixture/wrap.svelte';
import KFlexJustify from './fixture/justify.svelte';
import KFlexAlign from './fixture/align.svelte';
import KFlexGap from './fixture/gap.svelte';
let host;

const initHost = () => {
	host = globalThis.document.createElement('div');
	host.setAttribute('id', 'host');
	globalThis.document.body.appendChild(host);
};
beforeEach(() => {
	initHost();
	vi.useFakeTimers();
});
afterEach(() => {
	host.remove();
	vi.useRealTimers();
});

describe('Test: KFlex', () => {
	test('props: cls', async () => {
		//@ts-ignore
		const instance = new KFlex({
			target: host,
			props: {
				cls: 'k-flex--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-flex--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: vertical', async () => {
		//@ts-ignore
		const instance = new KFlex({
			target: host,
			props: {
				vertical: true
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-flex--col')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: flex', async () => {
		//@ts-ignore
		const instance = new KFlex({
			target: host,
			props: {
				flex: 1
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('style="flex: 1;"')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: elm', async () => {
		//@ts-ignore
		const instance = new KFlex({
			target: host,
			props: {
				elm: 'p'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('</div>')).not.toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: wrap', async () => {
		//@ts-ignore
		const instance = new KFlexWrap({
			target: host
		});
		expect(instance).toBeTruthy();
		const flexElms = host.querySelectorAll('.k-flex');
		expect(flexElms[0].className.includes('k-flex--wrap-wrap')).toBeTruthy();
		expect(flexElms[1].className.includes('k-flex--wrap-nowrap')).toBeTruthy();
		expect(flexElms[2].className.includes('k-flex--wrap-wrap-reverse')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: justify', async () => {
		//@ts-ignore
		const instance = new KFlexJustify({
			target: host
		});
		expect(instance).toBeTruthy();
		const flexElms = host.querySelectorAll('.k-flex');
		expect(flexElms[0].className.includes('k-flex--justify-normal')).toBeTruthy();
		expect(flexElms[1].className.includes('k-flex--justify-start')).toBeTruthy();
		expect(flexElms[2].className.includes('k-flex--justify-end')).toBeTruthy();
		expect(flexElms[3].className.includes('k-flex--justify-center')).toBeTruthy();
		expect(flexElms[4].className.includes('k-flex--justify-between')).toBeTruthy();
		expect(flexElms[5].className.includes('k-flex--justify-around')).toBeTruthy();
		expect(flexElms[6].className.includes('k-flex--justify-evenly')).toBeTruthy();
		expect(flexElms[7].className.includes('k-flex--justify-stretch')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: align', async () => {
		//@ts-ignore
		const instance = new KFlexAlign({
			target: host
		});
		expect(instance).toBeTruthy();
		const flexElms = host.querySelectorAll('.k-flex');
		expect(flexElms[0].className.includes('k-flex--align-normal')).toBeTruthy();
		expect(flexElms[1].className.includes('k-flex--align-start')).toBeTruthy();
		expect(flexElms[2].className.includes('k-flex--align-end')).toBeTruthy();
		expect(flexElms[3].className.includes('k-flex--align-center')).toBeTruthy();
		expect(flexElms[4].className.includes('k-flex--align-baseline')).toBeTruthy();
		expect(flexElms[5].className.includes('k-flex--align-stretch')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: gap', async () => {
		//@ts-ignore
		const instance = new KFlexGap({
			target: host
		});
		expect(instance).toBeTruthy();
		const flexElms = host.querySelectorAll('.k-flex');
		expect(flexElms[0].style.gap).toBe('90px');
		expect(flexElms[1].style.gap).toBe('16px');
		expect(flexElms[2].style.gap).toBe('8px');
		expect(flexElms[3].style.gap).toBe('24px');
		expect(host.innerHTML).matchSnapshot();
	});
});
