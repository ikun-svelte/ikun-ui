import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KEmpty from '../src';
import KEmptyImageSlot from './fixture/slot.image.svelte';
import KEmptyDescSlot from './fixture/slot.desc.svelte';
import KEmptySlot from './fixture/slot.default.svelte';
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

describe('Test: KEmpty', () => {
	test('props: cls', async () => {
		const instance = new KEmpty({
			target: host,
			props: {
				cls: 'k-empty--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-empty--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: emptyDescription', async () => {
		const instance = new KEmpty({
			target: host,
			props: {
				emptyDescription: 'test-content'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('test-content')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: image', async () => {
		const instance = new KEmpty({
			target: host,
			props: {
				image: 'test-img'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-empty__img')).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('src="test-img"')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: imageSize', async () => {
		const instance = new KEmpty({
			target: host,
			props: {
				image: 'test-img',
				imageSize: 500
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-empty__img')).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('src="test-img"')).toBeTruthy();
		expect(
			(host as HTMLElement)!.innerHTML.includes('class="k-empty__image" style="width: 500px;"')
		).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('slot: description', async () => {
		const instance = new KEmptyDescSlot({
			target: host
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k_empty_test_description_slot')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('slot: image', async () => {
		const instance = new KEmptyImageSlot({
			target: host
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k_empty_test_image_slot')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('slot: default', async () => {
		const instance = new KEmptySlot({
			target: host
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k_empty_test_default_slot')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('render test', async () => {
		const instance = new KEmpty({
			target: host
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('No Data')).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-empty__image')).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-empty__nd')).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-empty__description')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
