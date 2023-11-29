import { tick } from 'svelte';
import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KDescriptions from '../src';
import KDescriptionsDirection from './fixture/descriptions.direction.svelte';

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

describe('Test: KDescriptions', () => {
	test('props: cls', async () => {
		const instance = new KDescriptions({
			target: host,
			props: {
				cls: 'k-descriptions--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-descriptions--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: title', async () => {
		const instance = new KDescriptions({
			target: host,
			props: {
				title: 'KDescriptions Title'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-descriptions--title')).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('KDescriptions Title')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: extra', async () => {
		const instance = new KDescriptions({
			target: host,
			props: {
				extra: 'KDescriptions Extra'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-descriptions--extra')).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('KDescriptions Extra')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: column', async () => {
		const instance = new KDescriptions({
			target: host,
			props: {
				column: 5
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-descriptions--cols-5')).toBeTruthy();
		instance.$set({ column: 3 });
		await tick();
		expect((host as HTMLElement)!.innerHTML.includes('k-descriptions--cols-3')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: border', async () => {
		const instance = new KDescriptions({
			target: host,
			props: {
				border: false
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-descriptions--body--border')).toBeFalsy();
		instance.$set({ border: true });
		await tick();
		expect((host as HTMLElement)!.innerHTML.includes('k-descriptions--body--border')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: sizes', async () => {
		const instance = new KDescriptions({
			target: host,
			props: {
				title: 'KDescriptions',
				size: 'sm'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-descriptions--sm')).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-descriptions--header--sm')).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-descriptions--body--sm')).toBeTruthy();
		instance.$set({ size: 'md' });
		await tick();
		expect((host as HTMLElement)!.innerHTML.includes('k-descriptions--md')).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-descriptions--header--md')).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-descriptions--body--md')).toBeTruthy();
		instance.$set({ size: 'lg' });
		await tick();
		expect((host as HTMLElement)!.innerHTML.includes('k-descriptions--lg')).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-descriptions--header--lg')).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-descriptions--body--lg')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: direction', async () => {
		const instance = new KDescriptionsDirection({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(host.querySelectorAll('.k-descriptions-item__horizontal').length === 3).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
		const btnEl = host.querySelector('button');
		btnEl?.click();
		await tick();
		expect(host.querySelectorAll('.k-descriptions-item__vertical').length === 3).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
