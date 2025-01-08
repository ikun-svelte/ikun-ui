import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KMenu from '../src';
import { createKMenu } from '../.svelte-kit/__package__/utils';
import type { KMenuInstanceOption, KMenuInstance } from '../src/types';
import KMenuPopupClassName from './fixture/popup-class-name.svelte';
import KMenuPopupClassNameVertical from './fixture/popup-class-name.vertical.svelte';
import KMenuPopupClassNameHorizontal from './fixture/popup-class-name.horizontal.svelte';
import KMenuInlineIndent from './fixture/inline-indent.svelte';
import KMenuInlineCollapsed from './fixture/inline-collapsed.svelte';
import KMenuOpenUids from './fixture/open-uids.svelte';
import KMenuSelectedUids from './fixture/selected-uids.svelte';
import KMenuDelay from './fixture/delay.svelte';
import KMenuAction from './fixture/action.svelte';
import KMenuClick from './fixture/click.svelte';
import KMenuSelect from './fixture/select.svelte';
import KMenuSelectable from './fixture/selectable.svelte';
import KMenuOpenChange from './fixture/open-change.svelte';
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

describe('Test: KMenu createKMenu', () => {
	const mockOnOpenChange = vi.fn();
	const mockOnSelect = vi.fn();
	const mockOnClick = vi.fn();
	const mockOnDeSelect = vi.fn();
	const mockRemoveBorderStyleBg = vi.fn();
	const mockGetParentDom = vi.fn();

	const options: KMenuInstanceOption = {
		openUids: ['uid1', 'uid2'],
		selectedUids: ['uid3'],
		selectable: true,
		theme: 'light',
		multiple: true,
		mode: 'vertical'
	};

	let kMenuInstance: KMenuInstance;

	beforeEach(() => {
		kMenuInstance = createKMenu(
			options,
			mockOnOpenChange,
			mockOnSelect,
			mockOnClick,
			mockOnDeSelect,
			mockRemoveBorderStyleBg,
			mockGetParentDom
		);
	});

	test('should initialize with the correct options', () => {
		expect(kMenuInstance.__dynamicProps).toEqual(options);
		expect(kMenuInstance.__openUids?.has('uid1')).toBe(true);
		expect(kMenuInstance.__selectedUids?.has('uid3')).toBe(true);
	});

	test('should sync UIDs correctly (add open UIDs)', () => {
		kMenuInstance.syncUids('uid4', 'open', 'add');
		expect(kMenuInstance.__openUids?.has('uid4')).toBe(true);
	});

	test('should sync UIDs correctly (delete open UIDs)', () => {
		kMenuInstance.syncUids('uid1', 'open', 'delete');
		expect(kMenuInstance.__openUids?.has('uid1')).toBe(false);
	});

	test('should sync selected UIDs correctly (add selected UIDs)', () => {
		kMenuInstance.syncUids('uid5', 'selected', 'add');
		expect(kMenuInstance.__selectedUids?.has('uid5')).toBe(true);
	});

	test('should sync selected UIDs correctly (delete selected UIDs)', () => {
		kMenuInstance.syncUids('uid3', 'selected', 'delete');
		expect(kMenuInstance.__selectedUids?.has('uid3')).toBe(false);
	});

	test('should sync selected items correctly (set)', () => {
		const item = { uid: 'uid1', label: 'Item 1' }; // Example item
		kMenuInstance.syncSelectedItems(item, 'set');
		expect(kMenuInstance.__selectedItems?.has('uid1')).toBe(true);
	});

	test('should sync selected items correctly (delete)', () => {
		const item = { uid: 'uid3', label: 'Item 3' }; // Example item
		kMenuInstance.syncSelectedItems(item, 'delete');
		expect(kMenuInstance.__selectedItems?.has('uid3')).toBe(false);
	});

	test('should call onOpenChange callback when opening menu', () => {
		kMenuInstance.onOpenChange(['uid1', 'uid2']);
		expect(mockOnOpenChange).toHaveBeenCalledWith(['uid1', 'uid2']);
	});

	test('should call onSelect callback when item is selected', () => {
		const selectEvent = {
			item: { uid: 'uid1', label: 'Item 1' },
			uid: 'uid1',
			uidPath: ['uid1'],
			selectedUids: ['uid1'],
			selectedItems: [{ uid: 'uid1', label: 'Item 1' }],
			selectedUidPaths: [['uid1']],
			e: new MouseEvent('click')
		};
		kMenuInstance.onSelect(selectEvent);
		expect(mockOnSelect).toHaveBeenCalledWith(selectEvent);
	});

	test('should call onClick callback when an item is clicked', () => {
		const clickEvent = {
			item: { uid: 'uid1', label: 'Item 1' },
			uid: 'uid1',
			uidPath: ['uid1'],
			e: new MouseEvent('click')
		};
		kMenuInstance.onClick(clickEvent);
		expect(mockOnClick).toHaveBeenCalledWith(clickEvent);
	});

	test('should call onDeSelect callback when item is deselected', () => {
		const deselectEvent = {
			item: { uid: 'uid1', label: 'Item 1' },
			uid: 'uid1',
			uidPath: ['uid1'],
			selectedUids: ['uid1'],
			selectedItems: [{ uid: 'uid1', label: 'Item 1' }],
			selectedUidPaths: [['uid1']],
			e: new MouseEvent('click')
		};
		kMenuInstance.onDeSelect(deselectEvent);
		expect(mockOnDeSelect).toHaveBeenCalledWith(deselectEvent);
	});

	test('should call removeBorderStyleBg callback', () => {
		kMenuInstance.removeBorderStyleBg();
		expect(mockRemoveBorderStyleBg).toHaveBeenCalled();
	});

	test('should call getParentDom callback', () => {
		kMenuInstance.getParentDom();
		expect(mockGetParentDom).toHaveBeenCalled();
	});
});

describe('Test: KMenu', () => {
	vi.mock('svelte', async () => {
		const actual = (await vi.importActual('svelte')) as object;
		return {
			...actual,
			// @ts-ignore
			onMount: (await import('svelte/internal')).onMount
		};
	});

	test('props: cls', async () => {
		const instance = new KMenu({
			target: host,
			props: {
				cls: 'k-menu--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(host!.innerHTML.includes('k-menu--test')).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: inlineIndent', async () => {
		const instance = new KMenuInlineIndent({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: inlineCollapsed', async () => {
		const instance = new KMenuInlineCollapsed({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
		const btn = host.querySelector('button');
		btn.click();
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: openUids', async () => {
		const instance = new KMenuOpenUids({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: selectedUids', async () => {
		const instance = new KMenuSelectedUids({
			target: host
		});
		expect(instance).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});

	test('props: subMenuOpenDelay & subMenuCloseDelay & vertical', async () => {
		const instance = new KMenuDelay({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const curHTML = host.innerHTML;
		const elm = host.querySelector('[slot="triggerEl"]');
		elm.dispatchEvent(new Event('mouseenter', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(curHTML === host.innerHTML);
		await vi.advanceTimersByTimeAsync(300);
		expect(curHTML !== host.innerHTML);
		elm.dispatchEvent(new Event('mouseleave', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(curHTML !== host.innerHTML);
		await vi.advanceTimersByTimeAsync(300);
		expect(curHTML === host.innerHTML);
	});

	test('props: subMenuOpenDelay & subMenuCloseDelay & horizontal', async () => {
		const instance = new KMenuDelay({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const curHTML = host.innerHTML;
		const elm = host.querySelector('[data-k-menu-h="1"]');
		elm.dispatchEvent(new Event('mouseenter', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(curHTML === host.innerHTML);
		await vi.advanceTimersByTimeAsync(300);
		expect(curHTML !== host.innerHTML);
		elm.dispatchEvent(new Event('mouseleave', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(curHTML !== host.innerHTML);
		await vi.advanceTimersByTimeAsync(300);
		expect(curHTML === host.innerHTML);
	});

	test('props: triggerSubMenuAction', async () => {
		const instance = new KMenuAction({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		expect(host.querySelectorAll('.k-popover--base').length).toBe(0);

		const elms = host.querySelectorAll('[slot="triggerEl"]');
		elms[0].dispatchEvent(new Event('mouseenter', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.querySelectorAll('.k-popover--base').length).toBe(1);

		elms[1].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(host.querySelectorAll('.k-popover--base').length).toBe(2);
	});

	test('props: selectable & vertical', async () => {
		const instance = new KMenuSelectable({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const vEl = host.querySelector('#selectable_test_vertical');
		const resEl = host.querySelector('#trigger_time');
		const vTrigger = vEl.querySelector('[slot="triggerEl"]');
		expect(resEl.innerHTML).toBe('0');
		vTrigger.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('0');

		let vContent = vEl.querySelectorAll('[slot="contentEl"]');
		const vTriggerSub = vContent[0].querySelectorAll('[slot="triggerEl"]');
		vTriggerSub[1].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('0');
		vContent = vEl.querySelectorAll('[slot="contentEl"]');
		const trigger = vContent[1].querySelector('.k-menu-title-content-i');
		trigger.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('0');
		expect(host.innerHTML).matchSnapshot();
		trigger.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('0');
		vTriggerSub[2].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('0');
		expect(host.innerHTML).matchSnapshot();
		vTriggerSub[2].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('0');
	});

	test('props: selectable & inline', async () => {
		const instance = new KMenuSelectable({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const vEl = host.querySelector('#selectable_test_inline');
		const resEl = host.querySelector('#trigger_time');
		let vTrigger = vEl.querySelectorAll('[slot="triggerEl"]');
		expect(resEl.innerHTML).toBe('0');
		vTrigger[0].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('0');
		vTrigger = vEl.querySelectorAll('[slot="triggerEl"]');

		vTrigger[2].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('0');
		vTrigger = vEl.querySelectorAll('[slot="triggerEl"]');

		vTrigger[3].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('0');
		expect(host.innerHTML).matchSnapshot();
		vTrigger[3].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('0');

		vTrigger[4].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('0');
		expect(host.innerHTML).matchSnapshot();
		vTrigger[4].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('0');
	});

	test('props: selectable & horizontal', async () => {
		const instance = new KMenuSelectable({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const vEl = host.querySelector('#selectable_test_horizontal');
		const resEl = host.querySelector('#trigger_time');
		const vTrigger = vEl.querySelector('[data-k-menu-h="1"]');
		expect(resEl.innerHTML).toBe('0');
		vTrigger.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('0');

		let vContent = vEl.querySelectorAll('[slot="contentEl"]');
		const vTriggerSub = vContent[0].querySelectorAll('[data-k-menu-h="2"]');
		vTriggerSub[1].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('0');
		vContent = vEl.querySelectorAll('[slot="contentEl"]');
		const trigger = vContent[1].querySelector('.k-menu-title-content-i');
		trigger.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('0');
		expect(host.innerHTML).matchSnapshot();
		trigger.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('0');
		vTriggerSub[3]
			.querySelector('.k-menu-title-content')
			.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('0');
		expect(host.innerHTML).matchSnapshot();
		vTriggerSub[3]
			.querySelector('.k-menu-title-content')
			.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('0');
	});

	test('events: onClick & vertical', async () => {
		const instance = new KMenuClick({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const vEl = host.querySelector('#click_test_vertical');
		const resEl = host.querySelector('#trigger_time');
		const vTrigger = vEl.querySelector('[slot="triggerEl"]');
		expect(resEl.innerHTML).toBe('0');
		vTrigger.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('1');
		const vContent = vEl.querySelector('[slot="contentEl"]');
		const vTriggerTitle = vContent.querySelector('.k-menu-title-content');
		vTriggerTitle.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('2');
		const vTriggerSub = vContent.querySelectorAll('[slot="triggerEl"]');

		vTriggerSub[1].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('3');
		vTriggerSub[2].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('4');
		vTriggerSub[3].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('4');
	});

	test('events: onClick & inline', async () => {
		const instance = new KMenuClick({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const iEl = host.querySelector('#click_test_inline');
		//const hEl = host.querySelector('#click_test_horizontal')
		const resEl = host.querySelector('#trigger_time');
		let iTrigger = iEl.querySelectorAll('[slot="triggerEl"]');
		expect(resEl.innerHTML).toBe('0');
		iTrigger[0].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('1');
		iTrigger = iEl.querySelectorAll('[slot="triggerEl"]');

		const iTriggerTitle = iTrigger[1].querySelector('.k-menu-title-content');
		iTriggerTitle.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('2');

		iTrigger[2].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('3');
		iTrigger[3].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('4');
		iTrigger[4].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('4');
	});

	test('events: onClick & horizontal', async () => {
		const instance = new KMenuClick({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const vEl = host.querySelector('#click_test_horizontal');
		const resEl = host.querySelector('#trigger_time');
		const vTrigger = vEl.querySelector('[data-k-menu-h="1"]');
		expect(resEl.innerHTML).toBe('0');
		vTrigger
			.querySelector('.k-menu-title-content-i')
			.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('1');
		const vContent = vEl.querySelector('[slot="contentEl"]');
		const vTriggerTitle = vContent.querySelector('.k-menu-title-content');
		vTriggerTitle.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('2');

		const vTriggerSub = vContent.querySelectorAll('[data-k-menu-h="2"]');
		vTriggerSub[1]
			.querySelector('.k-menu-item')
			.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('3');

		vTriggerSub[3]
			.querySelector('.k-menu-item')
			.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('4');

		vTriggerSub[4]
			.querySelector('.k-menu-item')
			.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('4');
	});

	test('events: onSelect & onDeSelect & vertical', async () => {
		const instance = new KMenuSelect({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const vEl = host.querySelector('#select_test_vertical');
		const resEl = host.querySelector('#trigger_time');
		const vTrigger = vEl.querySelector('[slot="triggerEl"]');
		expect(resEl.innerHTML).toBe('0');
		vTrigger.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('0');

		let vContent = vEl.querySelectorAll('[slot="contentEl"]');
		const vTriggerSub = vContent[0].querySelectorAll('[slot="triggerEl"]');
		vTriggerSub[1].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('0');
		vContent = vEl.querySelectorAll('[slot="contentEl"]');
		const trigger = vContent[1].querySelector('.k-menu-title-content-i');
		trigger.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('1');
		expect(host.innerHTML).matchSnapshot();
		trigger.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('2');
		vTriggerSub[2].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('3');
		expect(host.innerHTML).matchSnapshot();
		vTriggerSub[2].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('4');
	});

	test('events: onSelect & onDeSelect & inline', async () => {
		const instance = new KMenuSelect({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const vEl = host.querySelector('#select_test_inline');
		const resEl = host.querySelector('#trigger_time');
		let vTrigger = vEl.querySelectorAll('[slot="triggerEl"]');
		expect(resEl.innerHTML).toBe('0');
		vTrigger[0].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('0');
		vTrigger = vEl.querySelectorAll('[slot="triggerEl"]');

		vTrigger[2].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('0');
		vTrigger = vEl.querySelectorAll('[slot="triggerEl"]');

		vTrigger[3].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('1');
		expect(host.innerHTML).matchSnapshot();
		vTrigger[3].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('2');

		vTrigger[4].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('3');
		expect(host.innerHTML).matchSnapshot();
		vTrigger[4].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('4');
	});

	test('events: onSelect & onDeSelect & horizontal', async () => {
		const instance = new KMenuSelect({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const vEl = host.querySelector('#select_test_horizontal');
		const resEl = host.querySelector('#trigger_time');
		const vTrigger = vEl.querySelector('[data-k-menu-h="1"]');
		expect(resEl.innerHTML).toBe('0');
		vTrigger.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('0');

		let vContent = vEl.querySelectorAll('[slot="contentEl"]');
		const vTriggerSub = vContent[0].querySelectorAll('[data-k-menu-h="2"]');
		vTriggerSub[1].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('0');
		vContent = vEl.querySelectorAll('[slot="contentEl"]');
		const trigger = vContent[1].querySelector('.k-menu-title-content-i');
		trigger.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('1');
		expect(host.innerHTML).matchSnapshot();
		trigger.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('2');
		vTriggerSub[3]
			.querySelector('.k-menu-title-content')
			.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('3');
		expect(host.innerHTML).matchSnapshot();
		vTriggerSub[3]
			.querySelector('.k-menu-title-content')
			.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('4');
	});

	test('events: onOpenChange & vertical', async () => {
		const instance = new KMenuOpenChange({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const vEl = host.querySelector('#open_change_test_vertical');
		const resEl = host.querySelector('#trigger_time');
		const vTrigger = vEl.querySelector('.k-menu-item');
		expect(resEl.innerHTML).toBe('0');
		vTrigger.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('1');
		expect(host.innerHTML).matchSnapshot();

		const vContent = vEl.querySelectorAll('[slot="contentEl"]');
		const vTriggerSub = vContent[0].querySelectorAll('[slot="triggerEl"]');
		vTriggerSub[0].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('1');

		vTriggerSub[1].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('2');
		expect(host.innerHTML).matchSnapshot();

		vTriggerSub[3].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('3');
		expect(host.innerHTML).matchSnapshot();

		host.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('4');
		expect(host.innerHTML).matchSnapshot();
	});

	test('events: onOpenChange & inline', async () => {
		const instance = new KMenuOpenChange({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const vEl = host.querySelector('#open_change_test_inline');
		const resEl = host.querySelector('#trigger_time');
		let vTrigger = vEl.querySelectorAll('[slot="triggerEl"]');
		expect(resEl.innerHTML).toBe('0');
		vTrigger[0].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('1');
		expect(host.innerHTML).matchSnapshot();

		vTrigger = vEl.querySelectorAll('[slot="triggerEl"]');
		vTrigger[1].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('1');

		vTrigger[2].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('2');
		expect(host.innerHTML).matchSnapshot();

		vTrigger[2].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('3');
		expect(host.innerHTML).matchSnapshot();

		vTrigger[0].dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('4');
		expect(host.innerHTML).matchSnapshot();
	});

	test('events: onOpenChange & horizontal', async () => {
		const instance = new KMenuOpenChange({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const vEl = host.querySelector('#open_change_test_horizontal');
		const resEl = host.querySelector('#trigger_time');
		const vTrigger = vEl.querySelector('[data-k-menu-h="1"]').querySelector('.k-menu-item');
		expect(resEl.innerHTML).toBe('0');
		vTrigger.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('1');
		expect(host.innerHTML).matchSnapshot();

		const vContent = vEl.querySelectorAll('[slot="contentEl"]');
		const vTriggerSub = vContent[0].querySelectorAll('[data-k-menu-h="2"]');
		vTriggerSub[0]
			.querySelector('.k-menu-item')
			.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('1');

		vTriggerSub[1]
			.querySelector('.k-menu-item')
			.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('2');
		expect(host.innerHTML).matchSnapshot();

		vTriggerSub[3]
			.querySelector('.k-menu-item')
			.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('3');
		expect(host.innerHTML).matchSnapshot();

		host.dispatchEvent(new Event('click', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		expect(resEl.innerHTML).toBe('4');
		expect(host.innerHTML).matchSnapshot();
	});
});

describe('Test: KMenuItems', () => {
	vi.mock('svelte', async () => {
		const actual = (await vi.importActual('svelte')) as object;
		return {
			...actual,
			// @ts-ignore
			onMount: (await import('svelte/internal')).onMount
		};
	});

	test('props: items - SubMenuType - popupClassName & inline & inlineCollapsed', async () => {
		// @ts-ignore
		const instance = new KMenuPopupClassName({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const elm = host.querySelector('[slot="triggerEl"]');
		elm.dispatchEvent(new Event('mouseenter', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		const popoverEl = host.querySelector('.k-popover--base');
		expect(popoverEl.className.includes('ikun-test'));
	});

	test('props: items - SubMenuType - popupClassName & vertical', async () => {
		// @ts-ignore
		const instance = new KMenuPopupClassNameVertical({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const elm = host.querySelector('[slot="triggerEl"]');
		elm.dispatchEvent(new Event('mouseenter', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		const popoverEl = host.querySelector('.k-popover--base');
		expect(popoverEl.className.includes('ikun-test'));
	});

	test('props: items - SubMenuType - popupClassName & horizontal', async () => {
		// @ts-ignore
		const instance = new KMenuPopupClassNameHorizontal({
			target: host
		});
		expect(instance).toBeTruthy();
		await tick();
		const elm = host.querySelector('[data-k-menu-h="1"]');
		elm.dispatchEvent(new Event('mouseenter', { bubbles: true }));
		await tick();
		await vi.advanceTimersByTimeAsync(300);
		const popoverEl = host.querySelector('.k-popover--base');
		expect(popoverEl.className.includes('ikun-test'));
	});
});
