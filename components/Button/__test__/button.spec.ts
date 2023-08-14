import { tick } from 'svelte';
import { afterEach, expect, test, vi, describe, beforeEach } from 'vitest';
import KButton from '../src/index.svelte';

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

describe('Test: KButton', () => {
	test('props: to', async () => {
		const instance = new KButton({
			target: host,
			props: {
				to: true
			}
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML.endsWith('</a>')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: round', async () => {
		const instance = new KButton({
			target: host,
			props: {
				round: 30
			}
		});
		expect(instance).toBeTruthy();
		expect((host.firstChild as HTMLElement)!.style.borderRadius).toBe('30px');
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: icon', async () => {
		const instance = new KButton({
			target: host,
			props: {
				icon: 'icon-carbon-settings'
			}
		});
		expect(instance).toBeTruthy();
		expect(
			(host as HTMLElement)!.innerHTML.includes(
				'icon-carbon-settings k-icon-transition k-button--primary__icon'
			)
		).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: circle', async () => {
		const instance = new KButton({
			target: host,
			props: {
				circle: true
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-button--circle')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: type', async () => {
		const success = new KButton({
			target: host,
			props: {
				type: 'success'
			}
		});
		expect(success).toBeTruthy();
		expect(
			(host as HTMLElement)!.innerHTML.includes(
				'k-button--success k-button--success__active k-button--success__focus k-button--success__hover'
			)
		).toBeTruthy();

		const error = new KButton({
			target: host,
			props: {
				type: 'error'
			}
		});
		expect(error).toBeTruthy();
		expect(
			(host as HTMLElement)!.innerHTML.includes(
				'k-button--error k-button--error__active k-button--error__focus k-button--error__hover'
			)
		).toBeTruthy();

		const warning = new KButton({
			target: host,
			props: {
				type: 'warning'
			}
		});
		expect(warning).toBeTruthy();
		expect(
			(host as HTMLElement)!.innerHTML.includes(
				'k-button--warning k-button--warning__active k-button--warning__focus k-button--warning__hover'
			)
		).toBeTruthy();

		const info = new KButton({
			target: host,
			props: {
				type: 'info'
			}
		});
		expect(info).toBeTruthy();
		expect(
			(host as HTMLElement)!.innerHTML.includes(
				'k-button--info k-button--info__active k-button--info__focus k-button--info__hover'
			)
		).toBeTruthy();

		const primary = new KButton({
			target: host,
			props: {
				type: 'primary'
			}
		});
		expect(primary).toBeTruthy();
		expect(
			(host as HTMLElement)!.innerHTML.includes(
				'k-button--primary k-button--primary__active k-button--primary__focus k-button--primary__hover'
			)
		).toBeTruthy();

		expect(host.innerHTML).matchSnapshot();
	});

	test('props: disabled', async () => {
		const instance = new KButton({
			target: host,
			props: {
				disabled: true
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-cur-disabled k-button--disabled')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('event: should trigger click event', async () => {
		const mockFn = vi.fn();
		const instance = new KButton({
			target: host
		});
		await tick();
		instance.$on('click', mockFn);
		const btn = host.getElementsByTagName('button')[0];
		btn.click(); // or btn.dispatchEvent(new window.Event('click', { bubbles: true }))
		await tick();
		expect(instance).toBeTruthy();
		expect(mockFn).toBeCalled();
	});

	test('event: should not trigger click event when disabled', async () => {
		const mockFn = vi.fn();
		const instance = new KButton({
			target: host,
			props: {
				disabled: true
			}
		});
		await tick();
		instance.$on('click', mockFn);
		const btn = host.getElementsByTagName('button')[0];
		btn.click(); // or btn.dispatchEvent(new window.Event('click', { bubbles: true }))
		await tick();
		expect(instance).toBeTruthy();
		expect(mockFn).not.toBeCalled();
	});
});
