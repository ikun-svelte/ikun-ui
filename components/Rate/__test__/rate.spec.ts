import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KRate from '../src';
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

describe('Test: KRate', () => {
	test('props: cls', async () => {
		const instance = new KRate({
			target: host,
			props: {
				cls: 'k-rate--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-rate--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: max', async () => {
		const max = 10;
		const instance = new KRate({
			target: host,
			props: {
				max
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelectorAll('.k-rate--item').length).toBe(max);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: value', async () => {
		const value = 3;
		const instance = new KRate({
			target: host,
			props: {
				value
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelectorAll('.i-carbon-star-filled').length).toBe(value);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: showScore', async () => {
		const value = 3;
		const showScore = true;
		const instance = new KRate({
			target: host,
			props: {
				value,
				showScore
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('.k-rate--text')?.textContent).toBe(`${value}`);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: scoreTemplate', async () => {
		const value = 3;
		const showScore = true;
		const scoreTemplate = 'this is {value}';
		const instance = new KRate({
			target: host,
			props: {
				value,
				showScore,
				scoreTemplate
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('.k-rate--text')?.textContent).toBe(`this is ${value}`);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: showText and texts is string', async () => {
		const showText = true;
		const texts = 'the text';
		const instance = new KRate({
			target: host,
			props: {
				showText,
				texts
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('.k-rate--text')?.textContent).toBe(texts);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: showText and texts is object', async () => {
		const value = 1;
		const showText = true;
		const texts = {
			2: 'two',
			4: 'four'
		};
		const instance = new KRate({
			target: host,
			props: {
				value,
				showText,
				texts
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('.k-rate--text')?.textContent).toBe('two');
		instance.$set({ value: 3 });
		await tick();
		expect(host.querySelector('.k-rate--text')?.textContent).toBe('four');
		instance.$set({ value: 5 });
		await tick();
		expect(host.querySelector('.k-rate--text')?.textContent).toBe('four');
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: showText and textColor', async () => {
		const showText = true;
		const texts = 'the text';
		const textColor = 'color-red';
		const instance = new KRate({
			target: host,
			props: {
				showText,
				texts,
				textColor
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes(textColor)).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: icons is string', async () => {
		const value = 3;
		const icons = 'i-carbon-settings';
		const instance = new KRate({
			target: host,
			props: {
				value,
				icons
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelectorAll(`.${icons}`).length).toBe(value);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: icons is object', async () => {
		const value = 1;
		const icons = {
			2: 'i-carbon-settings',
			4: 'i-carbon-full'
		};
		const instance = new KRate({
			target: host,
			props: {
				value,
				icons
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelectorAll(`.${icons[2]}`).length).toBe(value);
		instance.$set({ value: 3 });
		await tick();
		expect(host.querySelectorAll(`.${icons[4]}`).length).toBe(3);
		instance.$set({ value: 5 });
		await tick();
		expect(host.querySelectorAll(`.${icons[4]}`).length).toBe(5);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: colors is string', async () => {
		const value = 3;
		const colors = 'color-test';
		const instance = new KRate({
			target: host,
			props: {
				value,
				colors
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes(colors)).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: colors is object', async () => {
		const value = 1;
		const colors = {
			2: 'color-2',
			4: 'color-4'
		};
		const instance = new KRate({
			target: host,
			props: {
				value,
				colors
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelectorAll(`.${colors[2]}`).length).toBe(value);
		instance.$set({ value: 3 });
		await tick();
		expect(host.querySelectorAll(`.${colors[4]}`).length).toBe(3);
		instance.$set({ value: 5 });
		await tick();
		expect(host.querySelectorAll(`.${colors[4]}`).length).toBe(5);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: voidIcon', async () => {
		const value = 3;
		const voidIcon = 'i-icon-void';
		const instance = new KRate({
			target: host,
			props: {
				value,
				voidIcon
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelectorAll(`.${voidIcon}`).length).toBe(2);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: voidColor', async () => {
		const value = 3;
		const voidColor = 'color-void';
		const instance = new KRate({
			target: host,
			props: {
				value,
				voidColor
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelectorAll(`.${voidColor}`).length).toBe(2);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: disabled', async () => {
		const instance = new KRate({
			target: host,
			props: {
				disabled: true
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-rate--disabled')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: disableVoidIcon', async () => {
		const value = 3;
		const disableVoidIcon = 'i-icon-disabled-void';
		const instance = new KRate({
			target: host,
			props: {
				value,
				disabled: true,
				disableVoidIcon
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelectorAll(`.${disableVoidIcon}`).length).toBe(2);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: disableVoidColor', async () => {
		const value = 3;
		const disableVoidColor = 'color-disabled-void';
		const instance = new KRate({
			target: host,
			props: {
				value,
				disabled: true,
				disableVoidColor
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelectorAll(`.${disableVoidColor}`).length).toBe(2);
		expect(host.innerHTML).matchSnapshot();
	});
});
