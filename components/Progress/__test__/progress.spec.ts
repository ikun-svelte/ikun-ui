import { tick } from 'svelte';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import KProgress from '../src';
import KProgressSlots from './progress.slots.svelte';

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

describe('Test: KProgress', () => {
	test('props: line percentage', async () => {
		const instance = new KProgress({
			target: host,
			props: {
				percentage: 10,
				type: 'line'
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		const barElm = host.getElementsByClassName('k-progress--bar')[0] as HTMLDivElement;
		expect(barElm.style.width).toBe('10%');
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: circle percentage', async () => {
		const instance = new KProgress({
			target: host,
			props: {
				percentage: 10,
				type: 'circle'
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		const circlElm = host.getElementsByTagName('circle')[1];
		const strokeDasharray = circlElm.getAttribute('stroke-dasharray')?.split(' ');
		expect(Number(strokeDasharray?.[0]) * 10).toBe(Number(strokeDasharray?.[1]));
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: dashboard percentage', async () => {
		const instance = new KProgress({
			target: host,
			props: {
				percentage: 10,
				type: 'dashboard'
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		const dashboardElm = host.getElementsByTagName('circle')[1];
		const strokeDasharrayBydashboard = dashboardElm.getAttribute('stroke-dasharray')?.split(' ');
		expect(((Number(strokeDasharrayBydashboard?.[0]) * 10) / 0.75).toFixed(2)).toEqual(
			Number(strokeDasharrayBydashboard?.[1]).toFixed(2)
		);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: line status', async () => {
		const instance = new KProgress({
			target: host,
			props: {
				percentage: 10,
				status: 'success',
				type: 'line'
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(host.innerHTML.includes('k-progress--success')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: circle & dashboard status', async () => {
		const instance = new KProgress({
			target: host,
			props: {
				status: 'success',
				type: 'circle'
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(host.innerHTML.includes('k-progress--stroke--success')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: line strokeWidth', async () => {
		const instance = new KProgress({
			target: host,
			props: {
				percentage: 10,
				strokeWidth: 520,
				type: 'line'
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		const height = (host.children[0].children[0] as HTMLDivElement).style.height;
		expect(Number.parseFloat(height)).toBe(520);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: circle & dashboard strokeWidth', async () => {
		const instance = new KProgress({
			target: host,
			props: {
				percentage: 10,
				strokeWidth: 520,
				type: 'circle'
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		const circlElm = host.getElementsByTagName('circle')[0];
		const strokeWidth = circlElm.getAttribute('stroke-width');
		expect(Number(strokeWidth)).toBe(520);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: circle & dashboard width', async () => {
		const instance = new KProgress({
			target: host,
			props: {
				percentage: 10,
				width: 520,
				type: 'circle'
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		const Elm = host.children[0] as HTMLDivElement;
		expect(parseFloat(Elm.style.width)).toBe(520);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: color', async () => {
		const instance = new KProgress({
			target: host,
			props: {
				percentage: 10,
				color: '#000',
				type: 'line'
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		const barElm = host.getElementsByClassName('k-progress--bar')[0] as HTMLDivElement;
		expect(barElm.style.backgroundColor).toEqual('rgb(0, 0, 0)');
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: textInside & showText', async () => {
		const instance = new KProgress({
			target: host,
			props: {
				percentage: 10,
				textInside: true,
				type: 'line'
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		const Elm = host.getElementsByClassName('k-progress--content__textInside')[0] as HTMLDivElement;
		const textContent = Elm.children[0].innerHTML;
		expect(parseFloat(textContent)).toBe(10);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: format', async () => {
		const instance = new KProgress({
			target: host,
			props: {
				percentage: 10,
				format: (v) => `我欲与君相知，长命无绝衰${v}`,
				type: 'line'
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(host.innerHTML.includes(`我欲与君相知，长命无绝衰10`)).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: duration', async () => {
		const instance = new KProgress({
			target: host,
			props: {
				percentage: 10,
				duration: 0.52,
				type: 'line'
			}
		});
		expect(instance).toBeTruthy();
		await tick();
		const barElm = host.getElementsByClassName('k-progress--bar')[0] as HTMLDivElement;
		expect(parseFloat(barElm.style.transitionDuration)).toEqual(0.52);
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: default', async () => {
		const instance = new KProgressSlots({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(host.innerHTML.includes('defaultSlot')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
