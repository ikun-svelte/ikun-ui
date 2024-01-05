import { afterEach, expect, test, describe, beforeEach, vi } from 'vitest';
import KEllipsis from '../src';
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
	vi.restoreAllMocks();
});

describe('Test: KEllipsis', () => {
	test('props: cls', async () => {
		const instance = new KEllipsis({
			target: host,
			props: {
				cls: 'k-ellipsis--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-ellipsis--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: content', async () => {
		const instance = new KEllipsis({
			target: host,
			props: {
				content: '自古逢秋悲寂寥',
				text: '我言秋日胜春朝',
				num: 0
			}
		});
		expect(instance).toBeTruthy();
		const elm = host.querySelector('[slot="triggerEl"]') as HTMLElement;
		elm.dispatchEvent(new Event('mouseenter', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(document.body.innerHTML.includes('我言秋日胜春朝')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: text', async () => {
		const instance = new KEllipsis({
			target: host,
			props: {
				content: '自古逢秋悲寂寥',
				text: '我言秋日胜春朝',
				num: 0
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('我言秋日胜春朝')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: num', async () => {
		const instance = new KEllipsis({
			target: host,
			props: {
				content: '自古逢秋悲寂寥',
				text: '我言秋日胜春朝',
				num: 3
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('我言秋日...')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: expand', async () => {
		const instance = new KEllipsis({
			target: host,
			props: {
				content: '自古逢秋悲寂寥',
				text: '我言秋日胜春朝',
				num: 3,
				expand: true,
				lineClamp: 3
			}
		});
		expect(instance).toBeTruthy();
		const elm = host.querySelector('[slot="triggerEl"]') as HTMLElement;
		expect(elm.style.display === '-webkit-inline-box').toBeTruthy();
		elm.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		expect(elm.style.display === '').toBeTruthy();
		elm.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		expect(elm.style.display === '-webkit-inline-box').toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: placement', async () => {
		const instance = new KEllipsis({
			target: host,
			props: {
				content: '自古逢秋悲寂寥',
				text: '我言秋日胜春朝',
				placement: 'center',
				num: 3
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('我言...春朝')).toBeTruthy();

		instance.$set({ placement: 'left' });
		await tick();
		expect((host as HTMLElement)!.innerHTML.includes('...日胜春朝')).toBeTruthy();

		instance.$set({ placement: 'right' });
		await tick();
		expect((host as HTMLElement)!.innerHTML.includes('我言秋日...')).toBeTruthy();
	});
});
