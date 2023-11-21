import KSlider from '../src';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
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

describe('Test: KSlider', () => {
	test('props: value', async () => {
		const value = 10;
		const instance = new KSlider({
			target: host,
			props: {
				value
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		const sliderBarElm = host.getElementsByClassName('k-slider--bar')[0] as HTMLDivElement;
		const sliderButtonWrapperElm = host.getElementsByClassName(
			'k-slider--button__wrapper'
		)[0] as HTMLDivElement;
		expect(Number.parseFloat(sliderBarElm.style.width)).toBe(value);
		expect(Number.parseFloat(sliderButtonWrapperElm.style.left)).toBe(value);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: min and max', async () => {
		const value = 1;
		const instance = new KSlider({
			target: host,
			props: {
				value,
				min: 10,
				max: 20
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		const sliderBarElm = host.getElementsByClassName('k-slider--bar')[0] as HTMLDivElement;
		const sliderButtonWrapperElm = host.getElementsByClassName(
			'k-slider--button__wrapper'
		)[0] as HTMLDivElement;
		expect(Number.parseFloat(sliderBarElm.style.width)).toBe(0);
		expect(Number.parseFloat(sliderButtonWrapperElm.style.left)).toBe(0);
		instance.$set({
			value: 15
		});
		await tick();
		expect(Number.parseFloat(sliderBarElm.style.width)).toBe(50);
		expect(Number.parseFloat(sliderButtonWrapperElm.style.left)).toBe(50);
		instance.$set({
			value: 30
		});
		await tick();
		expect(Number.parseFloat(sliderBarElm.style.width)).toBe(100);
		expect(Number.parseFloat(sliderButtonWrapperElm.style.left)).toBe(100);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: disabled', async () => {
		const instance = new KSlider({
			target: host,
			props: {
				disabled: true
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(host.innerHTML.includes('k-cur-disabled')).toBe(true);
		instance.$set({
			disabled: false
		});
		await tick();
		expect(host.innerHTML.includes('k-cur-disabled')).toBe(false);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: cls', async () => {
		const instance = new KSlider({
			target: host,
			props: {
				cls: '窈窕淑女，君子好逑'
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(host.innerHTML.includes('窈窕淑女，君子好逑')).toBe(true);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: attrs', async () => {
		const instance = new KSlider({
			target: host,
			props: {
				attrs: {
					you: 'world'
				}
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		const sliderBaseElm = host.getElementsByClassName('k-slider--base')[0] as HTMLDivElement;
		expect(sliderBaseElm.getAttribute('you')).toBe('world');
		expect(host.innerHTML).matchSnapshot();
	});

	test('event: should trigger change event', async () => {
		const changeEvent = vi.fn();
		const instance = new KSlider({
			target: host,
			props: {
				value: 0
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		instance.$on('change', () => {
			changeEvent();
		});
		const sliderButtonWrapperElm = host.getElementsByClassName(
			' k-slider--button__wrapper'
		)[0] as HTMLDivElement;
		sliderButtonWrapperElm.dispatchEvent(new Event('mousedown'));
		window.dispatchEvent(new Event('mouseup'));
		await tick();
		expect(changeEvent).toBeCalled();
	});

	test('event: should trigger input event', async () => {
		const inputEvent = vi.fn();
		const instance = new KSlider({
			target: host,
			props: {
				value: 0
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		instance.$on('input', () => {
			inputEvent();
		});
		const sliderRunwayElm = host.getElementsByClassName(' k-slider--runway')[0] as HTMLDivElement;
		sliderRunwayElm.dispatchEvent(
			new MouseEvent('mousedown', {
				cancelable: true,
				clientX: 100
			})
		);
		await tick();
		expect(inputEvent).toBeCalled();
	});

	test('event: should not trigger event when disabled', async () => {
		const event = vi.fn();
		const instance = new KSlider({
			target: host,
			props: {
				disabled: true
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		instance.$on('change', event);
		instance.$on('input', event);
		const sliderButtonWrapperElm = host.getElementsByClassName(
			' k-slider--button__wrapper'
		)[0] as HTMLDivElement;
		sliderButtonWrapperElm.dispatchEvent(new Event('mousedown'));
		window.dispatchEvent(new Event('mouseup'));
		const sliderRunwayElm = host.getElementsByClassName(' k-slider--runway')[0] as HTMLDivElement;
		sliderRunwayElm.dispatchEvent(
			new MouseEvent('mousedown', {
				cancelable: true,
				clientX: 100
			})
		);
		await tick();
		expect(event).not.toBeCalled();
	});
});
