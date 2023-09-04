import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { tick } from 'svelte';
import KSpinShow from './spin.show.svelte';
import KSpinText from './spin.text.svelte';
import KSpinFull from './spin.full.svelte';
import KSpinBg from './spin.bg.svelte';
import KSpinSpinner from './spin.spinner.svelte';
import KSpinRotate from './spin.rotate.svelte';

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

describe('Test: KSpin', () => {
	test('options: show', async () => {
		const instance = new KSpinShow({
			target: host
		});
		await tick();
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('k-spin--spinner')).not.toBeTruthy()
		const btn = document.getElementById('spin_show')
		btn?.click()
		await tick();
		expect(host.innerHTML.includes('k-spin--spinner')).toBeTruthy()
		expect(host.innerHTML).matchSnapshot();
	});

	test('options: text', async () => {
		const instance = new KSpinText({
			target: host
		});
		await tick();
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('k-spin--spinner')).not.toBeTruthy()
		expect(host.innerHTML.includes('多看一眼就会爆炸！')).not.toBeTruthy()
		const btn = document.getElementById('spin_text')
		btn?.click()
		await tick();
		expect(host.innerHTML.includes('k-spin--spinner')).toBeTruthy()
		expect(host.innerHTML.includes('多看一眼就会爆炸！')).toBeTruthy()
		expect(host.innerHTML).matchSnapshot();
	});

	test('options: fullScreen', async () => {
		const instance = new KSpinFull({
			target: host
		});
		await tick();
		expect(instance).toBeTruthy();
		expect(document.body.innerHTML.includes('k-spin--spinner')).not.toBeTruthy()
		expect(document.body.innerHTML.includes('k-mask--base')).not.toBeTruthy()
		const btn = document.getElementById('spin_full')
		btn?.click()
		await tick();
		expect(document.body.innerHTML.includes('k-spin--spinner')).toBeTruthy()
		expect(document.body.innerHTML.includes('k-mask--base')).toBeTruthy()
		await vi.advanceTimersByTimeAsync(320);
		expect(document.body.innerHTML.includes('top: 0px; left: 0px; width: 100%; height: 100%; position: fixed;')).toBeTruthy()
		expect(document.body).matchSnapshot();
	});

	test('options: background', async () => {
		const instance = new KSpinBg({
			target: host
		});
		await tick();
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('k-spin--spinner')).not.toBeTruthy()
		const btn = document.getElementById('spin_bg')
		btn?.click()
		await tick();
		expect(host.innerHTML.includes('k-spin--spinner')).toBeTruthy()
		await vi.advanceTimersByTimeAsync(320);
		expect(host.innerHTML.includes('background-color: red;')).toBeTruthy()
		expect(host.innerHTML).matchSnapshot();
	});

	test('options: spinner', async () => {
		const instance = new KSpinSpinner({
			target: host
		});
		await tick();
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('k-spin--spinner')).not.toBeTruthy()
		const btn = document.getElementById('spin_spinner')
		btn?.click()
		await tick();
		expect(host.innerHTML.includes('k-spin--spinner')).toBeTruthy()
		expect(host.innerHTML.includes('custom spinner')).toBeTruthy()
		expect(host.innerHTML).matchSnapshot();
  });

	test('options: rotating', async () => {
		const instance = new KSpinRotate({
			target: host
		});
		await tick();
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('k-spin--spinner')).not.toBeTruthy()
		const btn = document.getElementById('spin_rotate')
		btn?.click()
		await tick();
		expect(host.innerHTML.includes('k-spin--spinner')).toBeTruthy()
		expect(host.innerHTML.includes('k-spin--spinner__rotating')).not.toBeTruthy()
		expect(host.innerHTML).matchSnapshot();
	});
});
