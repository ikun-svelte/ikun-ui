import { tick } from 'svelte';
import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KDescriptionsItem from '../src';
import KDescriptionsItemLabel from './fixture/descriptions-item.label.svelte';
import KDescriptionsItemSpan from './fixture/descriptions-item.span.svelte';

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

describe('Test: KDescriptionsItem', () => {
	test('props: cls', async () => {
		const instance = new KDescriptionsItem({
			target: host,
			props: {
				cls: 'k-descriptions-item--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-descriptions-item--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: label', async () => {
		const instance = new KDescriptionsItem({
			target: host,
			props: {
				label: 'KDescriptionsItem'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-descriptions-item--label')).toBeTruthy();
		const labelEl = host.querySelector('.k-descriptions-item--label');
		expect(labelEl.textContent).toBe('KDescriptionsItem');
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: span', async () => {
		const instance = new KDescriptionsItem({
			target: host,
			props: {
				span: 'KDescriptionsItem'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-descriptions-item--span')).toBeTruthy();
		const labelEl = host.querySelector('.k-descriptions-item--span');
		expect(labelEl.textContent).toBe('KDescriptionsItem');
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: label', async () => {
		const instance = new KDescriptionsItemLabel({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const labelEl = host.querySelector('#slot-label');
		expect(labelEl.textContent).toBe('Ikun Descriptions Item Label');
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: span', async () => {
		const instance = new KDescriptionsItemSpan({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const spanEl = host.querySelector('#slot-span');
		expect(spanEl.textContent).toBe('Ikun Descriptions Item Span');
		expect(host.innerHTML).matchSnapshot();
	});
});
