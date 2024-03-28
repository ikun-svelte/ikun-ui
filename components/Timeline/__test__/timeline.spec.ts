import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KTimeline from '../src';
import KTBasic from './fixture/basic.svelte';
import KTColor from './fixture/color.svelte';
import KTPosModeLeft from './fixture/position.mode.left.svelte';
import KTPosModeRight from './fixture/position.mode.right.svelte';
import KTPosModeAlternate from './fixture/position.mode.alternate.svelte';
import KTLabelModeLeft from './fixture/label.mode.left.svelte';
import KTLabelModeRight from './fixture/label.mode.right.svelte';
import KTLabelModeAlternate from './fixture/label.mode.alternate.svelte';
import KTChildrenModeLeft from './fixture/children.mode.left.svelte';
import KTChildrenModeRight from './fixture/children.mode.right.svelte';
import KTChildrenModeAlternate from './fixture/children.mode.alternate.svelte';
import KTSlotsLabel from './fixture/slots.label.svelte';
import KTSlotsChildren from './fixture/slots.children.svelte';
import KTSlotsDot from './fixture/slots.dot.svelte';
import KTSlotsPending from './fixture/slots.pending.svelte';
import KTSlotsPendingDot from './fixture/slots.pending-dot.svelte';
import KTReverse from './fixture/reverse.svelte';
import KTReversePending from './fixture/reverse.pending.svelte';
import KTPending from './fixture/pending.true.svelte';
import KTPendingStr from './fixture/pending.string.svelte';
import KTMode from './fixture/mode.svelte';
import KTModeLabel from './fixture/mode.label.svelte';
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

describe('Test: KTimeline', () => {
	test('basic render', async () => {
		// @ts-ignore
		const instance = new KTBasic({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: cls', async () => {
		// @ts-ignore
		const instance = new KTimeline({
			target: host,
			props: {
				cls: 'k-timeline--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-timeline--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: pending is true', async () => {
		// @ts-ignore
		const instance = new KTPending({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: pending is string', async () => {
		// @ts-ignore
		const instance = new KTPendingStr({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: reverse', async () => {
		// @ts-ignore
		const instance = new KTReverse({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: mode', async () => {
		// @ts-ignore
		const instance = new KTMode({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: mode & label', async () => {
		// @ts-ignore
		const instance = new KTModeLabel({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: reverse & pending', async () => {
		// @ts-ignore
		const instance = new KTReversePending({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('KTimelineItem: color', async () => {
		// @ts-ignore
		const instance = new KTColor({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('KTimelineItem: position', async () => {
		// @ts-ignore
		new KTPosModeLeft({
			target: host
		});

		// @ts-ignore
		new KTPosModeRight({
			target: host
		});

		// @ts-ignore
		new KTPosModeAlternate({
			target: host
		});
		expect(host.innerHTML).matchSnapshot();
	});

	test('KTimelineItem: label', async () => {
		// @ts-ignore
		new KTLabelModeLeft({
			target: host
		});

		// @ts-ignore
		new KTLabelModeRight({
			target: host
		});

		// @ts-ignore
		new KTLabelModeAlternate({
			target: host
		});
		expect(host.innerHTML).matchSnapshot();
	});

	test('KTimelineItem: children', async () => {
		// @ts-ignore
		new KTChildrenModeLeft({
			target: host
		});

		// @ts-ignore
		new KTChildrenModeRight({
			target: host
		});

		// @ts-ignore
		new KTChildrenModeAlternate({
			target: host
		});
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: label', async () => {
		// @ts-ignore
		new KTSlotsLabel({
			target: host
		});
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: children', async () => {
		// @ts-ignore
		new KTSlotsChildren({
			target: host
		});
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: dot', async () => {
		// @ts-ignore
		new KTSlotsDot({
			target: host
		});
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: pending', async () => {
		// @ts-ignore
		new KTSlotsPending({
			target: host
		});
		expect(host.innerHTML).matchSnapshot();
	});

	test('slots: pendingDot', async () => {
		// @ts-ignore
		new KTSlotsPendingDot({
			target: host
		});
		expect(host.innerHTML).matchSnapshot();
	});
});
