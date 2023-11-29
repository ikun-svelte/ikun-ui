import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import { KMain, KAside, KHeader, KFooter } from '../src';
import KContainerSlot from './fixture/container.slot.svelte';
import KContainerDirection from './fixture/container.direction.svelte';
import { tick } from 'svelte';
let host: HTMLElement;

const initHost = () => {
	host = document.createElement('div');
	host.setAttribute('id', 'host');
	document.body.appendChild(host);
};
beforeEach(() => {
	initHost();
});
afterEach(() => {
	host.remove();
});

describe('Test: KMain', () => {
	test('KMain class render', () => {
		const instance = new KMain({
			target: host
		});

		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('k-main k-main--base')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});

describe('Test: KAside', () => {
	test('props: width', () => {
		const instance = new KAside({
			target: host,
			props: {
				width: '666px'
			}
		});

		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('k-aside k-aside--base')).toBeTruthy();
		expect(host.innerHTML.includes('style="width: 666px;"')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});

describe('Test: KHeader', () => {
	test('props: height', () => {
		const instance = new KHeader({
			target: host,
			props: {
				height: '666px'
			}
		});

		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('k-header k-header--base')).toBeTruthy();
		expect(host.innerHTML.includes('style="height: 666px;"')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});

describe('Test: KFooter', () => {
	test('props: height', () => {
		const instance = new KFooter({
			target: host,
			props: {
				height: '666px'
			}
		});

		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('k-footer k-footer--base')).toBeTruthy();
		expect(host.innerHTML.includes('style="height: 666px;"')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});

describe('Test: KContainer', () => {
	test('props: direction', async () => {
		const instance = new KContainerDirection({
			target: host,
			props: {
				direction: 'horizontal'
			}
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('k-header k-header--base')).toBeTruthy();
		expect(host.innerHTML.includes('k-main k-main--base')).toBeTruthy();
		expect(host.innerHTML.includes('k-footer k-footer--base')).toBeTruthy();
		expect(
			host.innerHTML.includes('k-container--base k-container--base__vertical')
		).not.toBeTruthy();
		instance.$set({ direction: 'vertical' });
		await tick();
		expect(host.innerHTML.includes('k-container--base k-container--base__vertical')).toBeTruthy();
	});

	test('slot: default & header & footer', async () => {
		const instance = new KContainerSlot({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('k-header k-header--base')).toBeTruthy();
		expect(host.innerHTML.includes('k-main k-main--base')).toBeTruthy();
		expect(host.innerHTML.includes('k-footer k-footer--base')).toBeTruthy();
		expect(host.innerHTML.includes('k-container--base k-container--base__vertical')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
