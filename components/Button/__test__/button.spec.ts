import { tick } from 'svelte';
import { afterEach, expect, test, vi, describe, beforeEach } from 'vitest';
import KButton from '../src';
import KButtonDisabled from './fixtrue/disabled.svelte';

let host;

const initHost = () => {
	host = globalThis.document.createElement('div');
	host.setAttribute('id', 'host');
	globalThis.document.body.appendChild(host);
};
beforeEach(() => {
	initHost();
});
afterEach(() => {
	host.remove();
});

describe('Test: KButton', () => {
	test('props: to', async () => {
		//@ts-ignore
		const instance = new KButton({
			target: host,
			props: {
				to: 'https://github.com/ikun-svelte/ikun-ui'
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('a')?.getAttribute('href')).toBe(
			'https://github.com/ikun-svelte/ikun-ui'
		);
		expect(host.innerHTML.endsWith('</a>')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: round', async () => {
		//@ts-ignore
		const instance = new KButton({
			target: host,
			props: {
				round: 30
			}
		});
		expect(instance).toBeTruthy();
		expect(host.firstChild!.style.borderRadius).toBe('30px');
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: icon', async () => {
		//@ts-ignore
		const instance = new KButton({
			target: host,
			props: {
				icon: 'icon-carbon-settings'
			}
		});
		expect(instance).toBeTruthy();
		expect(
			host!.innerHTML.includes(
				'k-icon--base k-icon-transition icon-carbon-settings k-button--primary__icon k-button--primary__icon__fill'
			)
		).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: circle', async () => {
		//@ts-ignore
		const instance = new KButton({
			target: host,
			props: {
				circle: true
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-button--circle')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: type', async () => {
		//@ts-ignore
		const success = new KButton({
			target: host,
			props: {
				type: 'success'
			}
		});
		expect(success).toBeTruthy();
		expect(
			host!.innerHTML.includes(
				'k-button--success__fill k-button--success__hover__fill k-button--success__active k-button--success__focus'
			)
		).toBeTruthy();
		//@ts-ignore
		const error = new KButton({
			target: host,
			props: {
				type: 'error'
			}
		});
		expect(error).toBeTruthy();
		expect(
			host!.innerHTML.includes(
				'k-button--error__fill k-button--error__hover__fill k-button--error__active k-button--error__focus'
			)
		).toBeTruthy();
		//@ts-ignore
		const warning = new KButton({
			target: host,
			props: {
				type: 'warning'
			}
		});
		expect(warning).toBeTruthy();
		expect(
			host!.innerHTML.includes(
				'k-button--warning__fill k-button--warning__hover__fill k-button--warning__active k-button--warning__focus'
			)
		).toBeTruthy();
		//@ts-ignore
		const info = new KButton({
			target: host,
			props: {
				type: 'info'
			}
		});
		expect(info).toBeTruthy();
		expect(
			host!.innerHTML.includes(
				'k-button--info__fill k-button--info__hover__fill k-button--info__active k-button--info__focus'
			)
		).toBeTruthy();
		//@ts-ignore
		const primary = new KButton({
			target: host,
			props: {
				type: 'primary'
			}
		});
		expect(primary).toBeTruthy();
		expect(
			host!.innerHTML.includes(
				'k-button--primary__fill k-button--primary__hover__fill k-button--primary__active k-button--primary__focus'
			)
		).toBeTruthy();

		expect(host.innerHTML).matchSnapshot();
	});

	test('props: plain', async () => {
		//@ts-ignore
		const success = new KButton({
			target: host,
			props: {
				type: 'success',
				plain: true
			}
		});
		expect(success).toBeTruthy();
		expect(
			host!.innerHTML.includes(
				'k-button--success k-button--success__hover k-button--success__active k-button--success__focus'
			)
		).toBeTruthy();
		//@ts-ignore
		const error = new KButton({
			target: host,
			props: {
				type: 'error',
				plain: true
			}
		});
		expect(error).toBeTruthy();
		expect(
			host!.innerHTML.includes(
				'k-button--error k-button--error__hover k-button--error__active k-button--error__focus'
			)
		).toBeTruthy();
		//@ts-ignore
		const warning = new KButton({
			target: host,
			props: {
				type: 'warning',
				plain: true
			}
		});
		expect(warning).toBeTruthy();
		expect(
			host!.innerHTML.includes(
				'k-button--warning k-button--warning__hover k-button--warning__active k-button--warning__focus'
			)
		).toBeTruthy();
		//@ts-ignore
		const info = new KButton({
			target: host,
			props: {
				type: 'info',
				plain: true
			}
		});
		expect(info).toBeTruthy();
		expect(
			host!.innerHTML.includes(
				'k-button--info k-button--info__hover k-button--info__active k-button--info__focus'
			)
		).toBeTruthy();
		//@ts-ignore
		const primary = new KButton({
			target: host,
			props: {
				type: 'primary',
				plain: true
			}
		});
		expect(primary).toBeTruthy();
		expect(
			host!.innerHTML.includes(
				'k-button--primary k-button--primary__hover k-button--primary__active k-button--primary__focus'
			)
		).toBeTruthy();

		expect(host.innerHTML).matchSnapshot();
	});

	test('props: ghost', async () => {
		//@ts-ignore
		const success = new KButton({
			target: host,
			props: {
				type: 'success',
				ghost: true
			}
		});
		expect(success).toBeTruthy();
		expect(host!.innerHTML.includes('k-button--success__ghost')).toBeTruthy();

		//@ts-ignore
		const error = new KButton({
			target: host,
			props: {
				type: 'error',
				ghost: true
			}
		});
		expect(error).toBeTruthy();
		expect(host!.innerHTML.includes('k-button--error__ghost')).toBeTruthy();
		//@ts-ignore
		const warning = new KButton({
			target: host,
			props: {
				type: 'warning',
				ghost: true
			}
		});
		expect(warning).toBeTruthy();
		expect(host!.innerHTML.includes('k-button--warning__ghost')).toBeTruthy();
		//@ts-ignore
		const info = new KButton({
			target: host,
			props: {
				type: 'info',
				ghost: true
			}
		});
		expect(info).toBeTruthy();
		expect(host!.innerHTML.includes('k-button--info__ghost')).toBeTruthy();
		//@ts-ignore
		const primary = new KButton({
			target: host,
			props: {
				type: 'primary',
				ghost: true
			}
		});
		expect(primary).toBeTruthy();
		expect(host!.innerHTML.includes('k-button--primary__ghost')).toBeTruthy();

		expect(host.innerHTML).matchSnapshot();
	});

	test('props: disabled', async () => {
		//@ts-ignore
		const instance = new KButton({
			target: host,
			props: {
				disabled: true
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-cur-disabled k-button--disabled')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: disabled value change', async () => {
		//@ts-ignore
		const instance = new KButtonDisabled({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-cur-disabled k-button--disabled')).not.toBeTruthy();
		const btn = host.querySelector('.k-button');
		btn.click();
		await tick();
		expect(host!.innerHTML.includes('k-cur-disabled k-button--disabled')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: button md size', async () => {
		//@ts-ignore
		const instance = new KButton({
			target: host,
			props: {
				icon: 'i-carbon-settings',
				size: 'md'
			}
		});
		expect(instance).toBeTruthy();
		expect(!host!.innerHTML.includes('k-button--sm')).toBeTruthy();
		expect(!host!.innerHTML.includes('k-button--lg')).toBeTruthy();
		expect(host!.innerHTML.includes('i-carbon-settings')).toBeTruthy();
		expect(host!.innerHTML.includes('style="width: 16px; height: 16px;"')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: button sm size', async () => {
		//@ts-ignore
		const instance = new KButton({
			target: host,
			props: {
				icon: 'i-carbon-settings',
				size: 'sm'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-button--sm')).toBeTruthy();
		expect(host!.innerHTML.includes('i-carbon-settings')).toBeTruthy();
		expect(host!.innerHTML.includes('style="width: 12px; height: 12px;"')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: button lg size', async () => {
		//@ts-ignore
		const instance = new KButton({
			target: host,
			props: {
				icon: 'i-carbon-settings',
				size: 'lg'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-button--lg')).toBeTruthy();
		expect(host!.innerHTML.includes('i-carbon-settings')).toBeTruthy();
		expect(host!.innerHTML.includes('style="width: 20px; height: 20px;"')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: isBorder', async () => {
		//@ts-ignore
		const instance = new KButton({
			target: host,
			props: {
				isBorder: true,
				type: 'primary'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-button--primary__border')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: iconSize', async () => {
		//@ts-ignore
		const instance = new KButton({
			target: host,
			props: {
				icon: 'i-carbon-settings',
				iconSize: 10086
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('i-carbon-settings')).toBeTruthy();
		expect(host!.innerHTML.includes('style="width: 10086px; height: 10086px;"')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('event: should trigger click event', async () => {
		const mockFn = vi.fn();
		//@ts-ignore
		const instance = new KButton({
			target: host
		});
		await tick();
		//@ts-ignore
		instance.$on('click', mockFn);
		const btn = host.getElementsByTagName('button')[0];
		btn.click(); // or btn.dispatchEvent(new window.Event('click', { bubbles: true }))
		await tick();
		expect(instance).toBeTruthy();
		expect(mockFn).toBeCalled();
	});

	test('event: should not trigger click event when disabled', async () => {
		const mockFn = vi.fn();
		//@ts-ignore
		const instance = new KButton({
			target: host,
			props: {
				disabled: true
			}
		});
		await tick();
		//@ts-ignore
		instance.$on('click', mockFn);
		const btn = host.getElementsByTagName('button')[0];
		btn.click(); // or btn.dispatchEvent(new window.Event('click', { bubbles: true }))
		await tick();
		expect(instance).toBeTruthy();
		expect(mockFn).not.toBeCalled();
	});
});
