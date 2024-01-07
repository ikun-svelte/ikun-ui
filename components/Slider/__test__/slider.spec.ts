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
	vi.useFakeTimers();
});
afterEach(() => {
	host.remove();
	vi.useRealTimers();
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
		const sliderBarElm = host.querySelector('.k-slider--bar') as HTMLElement;
		const sliderButtonWrapperElm = host.querySelector('.k-slider--button-wrapper') as HTMLElement;
		const triggerElm = sliderButtonWrapperElm.children[0];
		triggerElm.dispatchEvent(
			new MouseEvent('mouseenter', {
				cancelable: true
			})
		);
		vi.runAllTimers();
		await tick();
		expect(host.innerHTML.includes('10')).toBeTruthy();
		expect(host.innerHTML.includes('data-popper-arrow-bottom')).toBeTruthy();
		expect(Number.parseFloat(sliderBarElm.style.width)).toBe(value);
		expect(Number.parseFloat(sliderButtonWrapperElm.style.left)).toBe(value);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: format', async () => {
		const instance = new KSlider({
			target: host,
			props: {
				format: 'Ikun'
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		const sliderButtonWrapperElm = host.querySelector('.k-slider--button-wrapper') as HTMLElement;
		const triggerElm = sliderButtonWrapperElm.children[0];
		triggerElm.dispatchEvent(
			new MouseEvent('mouseenter', {
				cancelable: true
			})
		);
		vi.runAllTimers();
		await tick();
		expect(host.innerHTML.includes('data-popper-arrow-bottom')).toBeTruthy();
		expect(host.innerHTML.includes('Ikun')).toBeTruthy();
	});

	test('props: vertical', async () => {
		const instance = new KSlider({
			target: host,
			props: {
				vertical: true
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		expect((host as HTMLElement)!.innerHTML.includes('k-slider--base__vertical')).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-slider--runway__vertical')).toBeTruthy();
		expect(
			(host as HTMLElement)!.innerHTML.includes('k-slider--button-wrapper__vertical')
		).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-slider--bar__vertical')).toBeTruthy();
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
		const sliderBarElm = host.querySelector('.k-slider--bar') as HTMLElement;
		const sliderButtonWrapperElm = host.querySelector('.k-slider--button-wrapper') as HTMLElement;
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
		expect(host.innerHTML.includes('k-slider--runway__disabled')).toBe(true);
		instance.$set({ disabled: false });
		await tick();
		expect(host.innerHTML.includes('k-slider--runway__disabled')).toBe(false);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: size', async () => {
		const instance = new KSlider({
			target: host,
			props: {
				size: 'sm'
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(host.innerHTML.includes('k-slider--sm')).toBeTruthy();
		expect(host.innerHTML.includes('k-slider--button--sm')).toBeTruthy();
		expect(host.innerHTML.includes('k-slider--runway--sm')).toBeTruthy();
		instance.$set({ size: 'md' });
		await tick();
		expect(host.innerHTML.includes('k-slider--md')).toBeTruthy();
		expect(host.innerHTML.includes('k-slider--button--md')).toBeTruthy();
		expect(host.innerHTML.includes('k-slider--runway--md')).toBeTruthy();
		instance.$set({ size: 'lg' });
		await tick();
		expect(host.innerHTML.includes('k-slider--lg')).toBeTruthy();
		expect(host.innerHTML.includes('k-slider--button--lg')).toBeTruthy();
		expect(host.innerHTML.includes('k-slider--runway--lg')).toBeTruthy();
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
		const sliderBaseElm = host.querySelector('.k-slider--base') as HTMLElement;
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
		const sliderButtonWrapperElm = host.querySelector('.k-slider--button-wrapper') as HTMLElement;
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
		const sliderRunwayElm = host.querySelector('.k-slider--runway') as HTMLElement;
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
		const sliderButtonWrapperElm = host.querySelector('.k-slider--button-wrapper') as HTMLElement;
		sliderButtonWrapperElm.dispatchEvent(new Event('mousedown'));
		window.dispatchEvent(new Event('mouseup'));
		const sliderRunwayElm = host.querySelector('.k-slider--runway') as HTMLElement;
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
