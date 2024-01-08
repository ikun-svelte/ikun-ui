import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KSegmented from '../src';
import KSegmentedValue from './fixture/value.svelte';
import KSegmentedBlock from './fixture/block.svelte';
import KSegmentedSize from './fixture/size.svelte';
import KSegmentedLabel from './fixture/label.svelte';
import KSegmentedIcon from './fixture/icon.svelte';
import KSegmentedOnly from './fixture/only.svelte';
import KSegmentedClick from './fixture/click.svelte';
import KSegmentedDisabled from './fixture/disabled.svelte';
import KSegmentedCustom from './fixture/custom.svelte';
import { tick } from 'svelte';
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

describe('Test: KSegmented', () => {
	test('props: cls', async () => {
		//@ts-ignore
		const instance = new KSegmented({
			target: host,
			props: {
				cls: 'k-segmented--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-segmented--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: value', async () => {
		//@ts-ignore
		const instance = new KSegmentedValue({
			target: host
		});
		expect(instance).toBeTruthy();
		const valElm = host.querySelector('#test_value');
		expect(valElm.innerHTML.includes('Daily-value')).toBeTruthy();

		const items = host.querySelectorAll('.k-segmented-item');
		items[2].click();
		await tick();
		expect(valElm.innerHTML.includes('Monthly-value')).toBeTruthy();
	});

	test('props: block', async () => {
		//@ts-ignore
		const instance = new KSegmentedBlock({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: size', async () => {
		//@ts-ignore
		const instance = new KSegmentedSize({
			target: host
		});
		expect(instance).toBeTruthy();
		const lgBtn = host.querySelector('#test_lg');
		lgBtn.click();
		await tick();
		expect(host.innerHTML).matchSnapshot();

		const mdBtn = host.querySelector('#test_md');
		mdBtn.click();
		await tick();
		expect(host.innerHTML).matchSnapshot();

		const smBtn = host.querySelector('#test_sm');
		smBtn.click();
		await tick();
		expect(host.innerHTML).matchSnapshot();
	});

	test('events: change', async () => {
		//@ts-ignore
		const instance = new KSegmentedValue({
			target: host
		});
		expect(instance).toBeTruthy();
		const valElm = host.querySelector('#test_value');
		expect(valElm.innerHTML.includes('Daily-value')).toBeTruthy();

		const items = host.querySelectorAll('.k-segmented-item');
		items[2].click();
		await tick();
		expect(valElm.innerHTML.includes('Monthly-value')).toBeTruthy();
	});
});

describe('Test: KSegmentedItem', () => {
	test('props: value', async () => {
		//@ts-ignore
		const instance = new KSegmentedValue({
			target: host
		});
		expect(instance).toBeTruthy();
		const items = host.querySelectorAll('.k-segmented-item');
		expect(items[0].innerHTML.includes('k-segmented-item--active')).toBeTruthy();

		items[2].click();
		await tick();
		expect(items[2].innerHTML.includes('k-segmented-item--active')).toBeTruthy();
	});

	test('props: block', async () => {
		//@ts-ignore
		const instance = new KSegmentedLabel({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: icon', async () => {
		//@ts-ignore
		const instance = new KSegmentedIcon({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: onlyIcon', async () => {
		//@ts-ignore
		const instance = new KSegmentedOnly({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: disabled', async () => {
		//@ts-ignore
		const instance = new KSegmentedDisabled({
			target: host
		});
		expect(instance).toBeTruthy();
		const valElm = host.querySelector('#test_value');
		expect(valElm.innerHTML.includes('Daily-value')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();

		const items = host.querySelectorAll('.k-segmented-item');
		items[2].click();
		await tick();
		expect(valElm.innerHTML.includes('Daily-value')).toBeTruthy();
	});

	test('slots: default', async () => {
		//@ts-ignore
		const instance = new KSegmentedCustom({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('events: click', async () => {
		//@ts-ignore
		const instance = new KSegmentedClick({
			target: host
		});
		expect(instance).toBeTruthy();
		const valElm = host.querySelector('#test_value');
		expect(valElm.innerHTML.includes('Daily-value')).toBeTruthy();

		const items = host.querySelectorAll('.k-segmented-item');
		items[2].click();
		await tick();
		expect(valElm.innerHTML.includes('Monthly-value')).toBeTruthy();
	});
});
