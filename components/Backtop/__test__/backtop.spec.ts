import { afterEach, expect, test, describe, beforeEach } from 'vitest';
import "@testing-library/jest-dom";
import { cleanup, render, fireEvent, screen } from "@testing-library/svelte";
import KBacktop from '../src';
import {tick} from "svelte";

let host: HTMLElement;

const initHost = () => {
	host = document.createElement('div');
	host.setAttribute('data-testid', 'host');
	host.style.height = '6000px'
	host.style.width = '6000px'
	document.body.appendChild(host);
};
beforeEach(() => {
	initHost();
});
afterEach(() => {
	host.remove();
	cleanup()
});

async function renderBacktop(overrideProps = {}) {
	const svl = render(KBacktop, {
		target: host,
		props: {
			...overrideProps,
		},
	});

	await new Promise(setImmediate);
	return svl;
}

describe('Test: KBacktop', () => {
	/*test('props: cls', async () => {
		const instance = new KBacktop({
			target: host,
			props: {
				cls: 'k-backtop--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-backtop--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});*/

	test('props: showHeight & right & bottom', async () => {
		const { component } = await renderBacktop({
				right: 66,
				bottom: 66,
				showHeight: 0
		});
		await tick()
		const container = screen.getByTestId('host')
		container.scrollTop  = 200
		debugger
		fireEvent.scroll(container)
		await tick()
		debugger
		console.log(screen.getAllByText('awdwdqwdwq'))
		debugger
		/*await tick()
		expect(instance).toBeTruthy();
		host.scrollTop = 2000
		host.dispatchEvent(new Event('scroll'))
		await tick()
		expect((host as HTMLElement)!.innerHTML.includes('k-backtop--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();*/
	});

	/*test('slot: custom render', async () => {
		const instance = new KBacktop({
			target: host,
			props: {
				cls: 'k-backtop--test'
			}
		});
		expect(instance).toBeTruthy();
		expect((host as HTMLElement)!.innerHTML.includes('k-backtop--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});*/
});
