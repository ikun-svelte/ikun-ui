import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KAvatar from '../src';

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

describe('Test: KAvatar', () => {
	test('props: cls', async () => {
		const instance = new KAvatar({
			target: host,
			props: {
				cls: 'k-avatar--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-avatar--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: icon', async () => {
		const instance = new KAvatar({
			target: host,
			props: {
				icon: 'i-carbon-settings'
			}
		});
		expect(instance).toBeTruthy();
		expect(
			(host as HTMLElement)!.innerHTML.includes('i-carbon-settings k-icon-transition')
		).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: src', async () => {
		const src = 'https://ikun-ui.netlify.app/logo.svg';
		const instance = new KAvatar({
			target: host,
			props: {
				src
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('img')?.getAttribute('src')).toBe(src);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: fit', async () => {
		const src = 'https://ikun-ui.netlify.app/logo.svg';
		const fits = ['fill', 'contain', 'cover', 'none', 'scale-down'];
		for (const fit of fits) {
			host.remove();
			initHost();
			const instance = new KAvatar({
				target: host,
				props: {
					src,
					fit
				}
			});
			expect(instance).toBeTruthy();
			expect(host.querySelector('img')?.getAttribute('style')).toContain(`object-fit: ${fit};`);
			expect(host.innerHTML).matchSnapshot();
		}
	});

	test('props: size is number', async () => {
		const size = 30;
		const instance = new KAvatar({
			target: host,
			props: {
				size
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('.k-avatar')?.getAttribute('style')).toContain(
			`width: ${size}px; height: ${size}px`
		);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: size is string', async () => {
		const size = '2rem';
		const instance = new KAvatar({
			target: host,
			props: {
				size
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('.k-avatar')?.getAttribute('style')).toContain(
			`width: ${size}; height: ${size}`
		);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: radius is number', async () => {
		const radius = 10;
		const instance = new KAvatar({
			target: host,
			props: {
				radius
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('.k-avatar')?.getAttribute('style')).toContain(
			`border-radius: ${radius}px;`
		);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: radius is string', async () => {
		const radius = '50%';
		const instance = new KAvatar({
			target: host,
			props: {
				radius
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('.k-avatar')?.getAttribute('style')).toContain(
			`border-radius: ${radius};`
		);
		expect(host.innerHTML).matchSnapshot();
	});
});
