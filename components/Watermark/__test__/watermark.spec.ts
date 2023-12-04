import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KWatermark from '../src';
import KWatermarkSlot from './fixture/watermark.slot.svelte';
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

describe('Test: KWatermark', () => {
	test('props: cls', async () => {
		const instance = new KWatermark({
			target: host,
			props: {
				cls: 'k-watermark--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-watermark--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('slot: default', async () => {
		const instance = new KWatermarkSlot({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('watermark_slot')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
