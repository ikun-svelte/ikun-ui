import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KSteps from '../src';
import KStepsDot from './fixture/dot.svelte';
import KStepsNav from './fixture/nav.svelte';
import KStepsDirection from './fixture/direction.svelte';
import KStepsActive from './fixture/active.svelte';
import KStepsChange from './fixture/change.svelte';
import KStepsSlots from './fixture/slots.svelte';
import { tick } from 'svelte';
let host;

const initHost = () => {
	host = globalThis.document.createElement('div');
	host.setAttribute('id', 'host');
	globalThis.document.body.appendChild(host);
};
beforeEach(() => {
	initHost();
	vi.useFakeTimers();
});
afterEach(() => {
	host.remove();
	vi.useRealTimers();
});

describe('Test: KSteps', () => {
	test('props: cls', async () => {
		// @ts-ignore
		const instance = new KSteps({
			target: host,
			props: {
				cls: 'k-steps--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-steps--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: dot', async () => {
		// @ts-ignore
		const instance = new KStepsDot({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: navigation', async () => {
		// @ts-ignore
		const instance = new KStepsNav({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: direction && labelPlacement', async () => {
		// @ts-ignore
		const instance = new KStepsDirection({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: items && active', async () => {
		// @ts-ignore
		const instance = new KStepsActive({
			target: host
		});
		expect(instance).toBeTruthy();
		const stepElms = host.querySelectorAll('.k-step');
		expect(stepElms[0].innerHTML.includes('k-step-icon--error')).toBeTruthy();
		expect(stepElms[0].innerHTML.includes('k-step-title--error')).toBeTruthy();
		expect(stepElms[0].innerHTML.includes('k-step-description--error')).toBeTruthy();

		expect(stepElms[1].innerHTML.includes('k-step-icon--process')).toBeTruthy();
		expect(stepElms[1].innerHTML.includes('k-step-title')).toBeTruthy();
		expect(stepElms[1].innerHTML.includes('k-step-description')).toBeTruthy();

		expect(stepElms[2].innerHTML.includes('k-step-icon--finish')).toBeTruthy();
		expect(stepElms[2].innerHTML.includes('k-step-description--no-process')).toBeTruthy();

		expect(stepElms[3].innerHTML.includes('k-step-icon--wait')).toBeTruthy();
		expect(stepElms[3].innerHTML.includes('k-step-title--wait')).toBeTruthy();
		expect(stepElms[3].innerHTML.includes('k-step-description--no-process')).toBeTruthy();

		const valueElm = host.querySelector('#test_active');
		expect(valueElm.innerHTML).toBe('2');
		expect(host.innerHTML).matchSnapshot();

		const btn = host.querySelector('button');
		btn.click();
		await tick();

		expect(stepElms[0].innerHTML.includes('k-step-icon--error')).toBeTruthy();
		expect(stepElms[0].innerHTML.includes('k-step-title--error')).toBeTruthy();
		expect(stepElms[0].innerHTML.includes('k-step-description--error')).toBeTruthy();

		expect(stepElms[1].innerHTML.includes('k-step-icon--finish')).toBeTruthy();
		expect(stepElms[1].innerHTML.includes('k-step-description--no-process')).toBeTruthy();

		expect(stepElms[2].innerHTML.includes('k-step-icon--finish')).toBeTruthy();
		expect(stepElms[2].innerHTML.includes('k-step-description--no-process')).toBeTruthy();

		expect(stepElms[3].innerHTML.includes('k-step-icon--process')).toBeTruthy();
		expect(stepElms[3].innerHTML.includes('k-step-title')).toBeTruthy();
		expect(stepElms[3].innerHTML.includes('k-step-description')).toBeTruthy();

		expect(valueElm.innerHTML).toBe('4');
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: canClick && event: change', async () => {
		// @ts-ignore
		const instance = new KStepsChange({
			target: host
		});
		expect(instance).toBeTruthy();
		const stepElms = host.querySelectorAll('.k-step');
		expect(stepElms[0].innerHTML.includes('k-step-icon--error')).toBeTruthy();
		expect(stepElms[0].innerHTML.includes('k-step-title--error')).toBeTruthy();
		expect(stepElms[0].innerHTML.includes('k-step-description--error')).toBeTruthy();

		expect(stepElms[1].innerHTML.includes('k-step-icon--process')).toBeTruthy();
		expect(stepElms[1].innerHTML.includes('k-step-title')).toBeTruthy();
		expect(stepElms[1].innerHTML.includes('k-step-description')).toBeTruthy();

		expect(stepElms[2].innerHTML.includes('k-step-icon--finish')).toBeTruthy();
		expect(stepElms[2].innerHTML.includes('k-step-description--no-process')).toBeTruthy();

		expect(stepElms[3].innerHTML.includes('k-step-icon--wait')).toBeTruthy();
		expect(stepElms[3].innerHTML.includes('k-step-title--wait')).toBeTruthy();
		expect(stepElms[3].innerHTML.includes('k-step-description--no-process')).toBeTruthy();

		const valueElm = host.querySelector('#test_active');
		expect(valueElm.innerHTML).toBe('2');
		expect(host.innerHTML).matchSnapshot();

		const btns = host.querySelectorAll('.k-steps-container');
		btns[3].click();
		await tick();

		expect(stepElms[0].innerHTML.includes('k-step-icon--error')).toBeTruthy();
		expect(stepElms[0].innerHTML.includes('k-step-title--error')).toBeTruthy();
		expect(stepElms[0].innerHTML.includes('k-step-description--error')).toBeTruthy();

		expect(stepElms[1].innerHTML.includes('k-step-icon--finish')).toBeTruthy();
		expect(stepElms[1].innerHTML.includes('k-step-description--no-process')).toBeTruthy();

		expect(stepElms[2].innerHTML.includes('k-step-icon--finish')).toBeTruthy();
		expect(stepElms[2].innerHTML.includes('k-step-description--no-process')).toBeTruthy();

		expect(stepElms[3].innerHTML.includes('k-step-icon--process')).toBeTruthy();
		expect(stepElms[3].innerHTML.includes('k-step-title')).toBeTruthy();
		expect(stepElms[3].innerHTML.includes('k-step-description')).toBeTruthy();

		expect(valueElm.innerHTML).toBe('4');
		expect(host.innerHTML).matchSnapshot();
	});

	test('slot: custom render', async () => {
		// @ts-ignore
		const instance = new KStepsSlots({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
