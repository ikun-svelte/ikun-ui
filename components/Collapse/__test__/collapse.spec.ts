import { tick } from 'svelte';
import { afterEach, expect, test, describe, beforeEach, vi } from 'vitest';
import KCollapse from '../src/index.svelte';
import KCollapseContent from './collapse.content.test.svelte';
import KCollapseTitle from './collapse.title.test.svelte';
import KCollapseCloseIcon from './collapse.close.test.svelte';
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

describe('Test: KCollapse', () => {
	test('props: title', async () => {
		const instance = new KCollapse({
			target: host,
			props: {
				title: 'title-content'
			}
		});
		expect(instance).toBeTruthy();
		const titleEl = host.children[0].children[0];
		expect(titleEl.getAttribute('class')).toBe('k-collapse--title k-collapse--title__dark');
		expect(titleEl.textContent).toBe('title-content ');
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: showClose', async () => {
		const instance = new KCollapse({
			target: host,
			props: {
				title: 'title-content',
				showClose: false
			}
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('k-icon--bas')).not.toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: content', async () => {
		const instance = new KCollapse({
			target: host,
			props: {
				show: true,
				content: 'foo'
			}
		});
		expect(instance).toBeTruthy();
		const contentEl = host.children[0].children[1];
		expect(contentEl.textContent).toBe(' foo');
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: show', async () => {
		const instance = new KCollapse({
			target: host,
			props: {
				show: false,
				content: 'foo'
			}
		});
		expect(instance).toBeTruthy();
		instance.$set({ show: true });
		await tick();
		expect(host.children[0].children.length).toBe(2);
		expect(host.innerHTML).matchSnapshot();
	});

	test('event: change', async () => {
		const mockFn = vi.fn();
		let show = false;
		const instance = new KCollapse({
			target: host,
			props: {
				show,
				content: 'foo'
			}
		});
		await tick();
		instance.$on('change', (e) => {
			show = e.detail;
			mockFn();
		});
		expect(instance).toBeTruthy();
		expect(host.children[0].children.length).toBe(1);
		const triggerEl = host.children[0].children[0].children[0];
		triggerEl.dispatchEvent(new window.Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.children[0].children.length).toBe(2);
		expect(mockFn).toBeCalledTimes(1);
		expect(show).toBeTruthy();
		triggerEl.dispatchEvent(new window.Event('click', { bubbles: true }));
		instance.$set({ show });
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(mockFn).toBeCalledTimes(2);
		expect(show).not.toBeTruthy();
	});

	test('slot: title', async () => {
		const instance = new KCollapseTitle({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(document.getElementById('custom_title')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('slot: content', async () => {
		const instance = new KCollapseContent({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(document.getElementById('custom_content')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('slot: closeIcon', async () => {
		const instance = new KCollapseCloseIcon({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML.includes('🍓 closeIcon')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
});
