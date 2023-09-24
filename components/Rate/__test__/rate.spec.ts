import { tick } from 'svelte';
import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import KRate from '../src';

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
		expect(host.querySelectorAll('.k-rate--active-icon').length).toBe(value);
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
		const instance = new KRate({
			target: host,
			props: {
				value: 3,
				allowHalf: true,
				showScore: true,
				scoreTemplate: 'the score is {value} points'
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('.k-rate--text')?.textContent).toBe('the score is 3 points');
		instance.$set({ value: 4.5 });
		await tick();
		expect(host.querySelector('.k-rate--text')?.textContent).toBe('the score is 4.5 points');
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
		const textColor = 'red';
		const instance = new KRate({
			target: host,
			props: {
				showText,
				texts,
				textColor
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelector('.k-rate--text').style.color).toBe(textColor);
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
		const colors = 'red';
		const instance = new KRate({
			target: host,
			props: {
				value,
				colors
			}
		});
		expect(instance).toBeTruthy();
		const stars = host.querySelectorAll('.k-rate--item');
		expect(stars[0].children[0].style.background).toBe(colors);
		expect(stars[1].children[0].style.background).toBe(colors);
		expect(stars[2].children[0].style.background).toBe(colors);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: colors is object', async () => {
		const value = 1;
		const colors = {
			2: 'red',
			4: 'blue'
		};
		const instance = new KRate({
			target: host,
			props: {
				value,
				colors
			}
		});
		expect(instance).toBeTruthy();
		const stars = host.querySelectorAll('.k-rate--item');
		expect(stars[0].children[0].style.background).toBe('red');
		instance.$set({ value: 3 });
		await tick();
		expect(stars[2].children[0].style.background).toBe('blue');
		instance.$set({ value: 5 });
		await tick();
		expect(stars[4].children[0].style.background).toBe('blue');
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
		const voidColor = 'green';
		const instance = new KRate({
			target: host,
			props: {
				value,
				voidColor
			}
		});
		expect(instance).toBeTruthy();
		const stars = host.querySelectorAll('.k-rate--item');
		expect(stars[2].children[0].style.background).not.toBe(voidColor);
		expect(stars[3].children[0].style.background).toBe(voidColor);
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

	test('props: readonly', async () => {
		const instance = new KRate({
			target: host,
			props: {
				readonly: true
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-rate--readonly')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: readonlyVoidIcon', async () => {
		const value = 3;
		const readonlyVoidIcon = 'i-icon-readonly-void';
		const instance = new KRate({
			target: host,
			props: {
				value,
				readonly: true,
				readonlyVoidIcon
			}
		});
		expect(instance).toBeTruthy();
		expect(host.querySelectorAll(`.${readonlyVoidIcon}`).length).toBe(2);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: readonlyVoidColor', async () => {
		const value = 3;
		const readonlyVoidColor = '#ff00f0';
		const instance = new KRate({
			target: host,
			props: {
				value,
				readonly: true,
				readonlyVoidColor
			}
		});
		expect(instance).toBeTruthy();
		const stars = host.querySelectorAll('.k-rate--item');
		expect(stars[2].children[0].style.background).not.toBe('rgb(255, 0, 240)');
		expect(stars[3].children[0].style.background).toBe('rgb(255, 0, 240)');
		expect(host.innerHTML).matchSnapshot();
	});
});
