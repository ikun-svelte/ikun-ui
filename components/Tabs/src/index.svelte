<script lang="ts">
	import { tabsKey, getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KTabsProps, KTabsNav, TabsShowEvt } from './types';
	import { KIcon } from '@ikun-ui/icon';
	import { createEventDispatcher, onDestroy, onMount, setContext, tick } from 'svelte';
	import { scale } from 'svelte/transition';
	import { jsonClone } from 'baiwusanyu-utils';
	import { BROWSER } from 'esm-env';
	export let value: KTabsProps['value'] = 0;
	export let type: KTabsProps['type'] = '';
	export let cls: KTabsProps['cls'] = '';
	export let closeable: KTabsProps['closeable'] = false;
	export let navOptions: KTabsProps['navOptions'] = [];
	export let editable: KTabsProps['editable'] = false;
	export let position: KTabsProps['position'] = 'top';
	export let beforeLeave: KTabsProps['beforeLeave'] = async () => true;
	export let attrs: KTabsProps['attrs'] = {};

	const dispatch = createEventDispatcher();
	let tabNavList: KTabsNav[] = [];
	$: {
		tabNavList = navOptions.map((option) => {
			return {
				...option
			};
		});
	}

	const tabsShowEvt = {} as Record<string, TabsShowEvt>;
	function registerTabsShowEvt(uid: KTabsProps['value'], fn: TabsShowEvt) {
		tabsShowEvt[uid] = fn;
	}
	setContext(tabsKey, {
		value,
		registerTabsShowEvt
	});

	$: activeValue = value;
	$: {
		triggerTabsShowEvt(activeValue);
		hoverTab = activeValue;
	}
	function triggerTabsShowEvt(uid: KTabsProps['value']) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		for (const [_, fn] of Object.entries(tabsShowEvt)) {
			fn(uid);
		}
	}
	function delPropertyData(tab: KTabsNav) {
		const res = jsonClone(tab);
		Reflect.deleteProperty(res, 'close');
		return res;
	}
	const handleClick = async (tab: KTabsNav) => {
		if (tab.disabled) return;
		const isSwitch = await beforeLeave(activeValue, tab.uid);
		if (isSwitch) {
			activeValue = tab.uid as number;
			dispatch('click', delPropertyData(tab));
			hoverTab = '';
		}
	};

	let hoverTab: KTabsProps['value'] = '';
	function onHover(tab: KTabsNav, close: boolean) {
		if (tab.disabled) return;
		hoverTab = close ? tab.uid : '';
	}
	function isShowClose(tab: KTabsNav, hoverTabs = hoverTab) {
		if (tab.closeable) {
			if (isActive(tab.uid)) {
				return true;
			}
			return hoverTabs === tab.uid;
		} else if (tab.closeable === undefined || tab.closeable === null) {
			if (closeable || editable) {
				if (isActive(tab.uid)) {
					return true;
				}
				return hoverTabs === tab.uid;
			}
		}
		return false;
	}
	$: closeIconWidth = (tab: KTabsNav) => {
		return isShowClose(tab, hoverTab) ? 16 : 0;
	};
	$: closePaddingX = (tab: KTabsNav) => {
		return isShowClose(tab, hoverTab) ? 8 : 16;
	};

	function handleRemove(e: MouseEvent | KeyboardEvent, tab: KTabsNav, index: number) {
		if (tab.disabled) return;
		e.stopPropagation();
		dispatch('remove', { tab: delPropertyData(tab), index });
		dispatch('edit', { tab: delPropertyData(tab), action: 'remove' });
		if (tab.uid === activeValue) {
			let newIndex = index + 1;
			if (index === navOptions.length - 1) {
				newIndex = index - 1;
			}
			dispatch('change', navOptions[newIndex]);
		}
	}

	async function handleAdd() {
		dispatch('add');
		dispatch('edit', { tab: undefined, action: 'add' });
		await tick();
		checkScrollbar();
		handleNext();
	}

	export async function addTab() {
		await tick();
		checkScrollbar();
		handleNext();
	}

	let navRef: HTMLElement | null = null;
	let showArrow = false;
	const checkScrollbar = () => {
		if (navRef) {
			if (position === 'top' || position === 'bottom') {
				showArrow = navRef.scrollHeight - 10 > navRef.clientHeight;
			}

			if (position === 'top' || position === 'bottom') {
				showArrow = navRef.scrollWidth - 10 > navRef.clientWidth;
			}
		}
	};

	onMount(() => {
		checkScrollbar();
		BROWSER && window.addEventListener('resize', checkScrollbar);
	});

	onDestroy(() => {
		BROWSER && window.removeEventListener('resize', checkScrollbar);
	});

	let navStyle = ``;
	let navsRef: HTMLElement | null = null;
	let curTransform = 36;
	const handleNext = () => {
		if (navRef && navsRef) {
			const maxOffset = navsRef.clientWidth - navRef.clientWidth;
			let offset = navRef.clientWidth + curTransform;
			if (offset >= maxOffset) {
				offset = maxOffset;
			}
			navStyle = `transform: translateX(-${offset}px)`;
			curTransform = offset;
		}
	};

	const handlePrev = () => {
		if (navRef && navsRef) {
			let offset = curTransform - navRef.clientWidth;
			if (offset <= 0) {
				offset = 0;
			}
			navStyle = `transform: translateX(-${offset}px)`;
			curTransform = offset;
		}
	};

	const prefixCls = getPrefixCls('tabs');
	$: cnames = clsx(prefixCls, cls);
	$: headerCls = clsx({
		[`${prefixCls}__header`]: type !== 'border' && type !== 'card',
		[`${prefixCls}__header--card`]: type === 'card',
		[`${prefixCls}__header--border`]: type === 'border',
		[`${prefixCls}__header--border--dark`]: type === 'border'
	});
	$: contentCls = clsx(`${prefixCls}__content`, {
		[`${prefixCls}__content--border`]: type === 'border',
		[`${prefixCls}__content--border--dark`]: type === 'border'
	});
	$: tabCls = clsx(`${prefixCls}__nav`);
	$: tabScrollCls = clsx(`${prefixCls}__nav--scroll`);
	$: tabContainerCls = clsx(`${prefixCls}__nav--wrap`, {
		[`${prefixCls}__pad`]: showArrow,
		[`${prefixCls}__nav--wrap--card`]: type === 'card',
		[`${prefixCls}__nav--wrap--border`]: type === 'border'
	});
	$: addCls = clsx(`${prefixCls}__add`, `${prefixCls}__add--dark`, {
		[`${prefixCls}__add--border`]: type === 'border'
	});
	$: addWrapCls = clsx(`${prefixCls}__add--wrap`, {
		[`${prefixCls}__add--wrap--border`]: type === 'border'
	});
	$: barCls = clsx(`${prefixCls}__bar`);
	$: prevCls = clsx(`${prefixCls}__prev`, `${prefixCls}__prev--dark`);
	$: nextCls = clsx(`${prefixCls}__next`, `${prefixCls}__next--dark`);
	$: closeCls = clsx(
		`${prefixCls}__close`,
		`${prefixCls}__close--dark`,
		`${prefixCls}__close--hover`,
		`${prefixCls}__close--hover--dark`
	);
	$: isActive = (uid: KTabsProps['value']) => uid === activeValue;
	$: tabItemCls = (tab: KTabsNav) =>
		clsx(`${prefixCls}__nav-item`, {
			[`${prefixCls}__nav-item--dark`]: !isActive(tab.uid),
			[`${prefixCls}__nav-item--active`]: isActive(tab.uid),
			[`${prefixCls}__nav-item--active--dark`]: isActive(tab.uid) && type !== 'border',
			[`${prefixCls}__nav-item--border--active--dark`]: isActive(tab.uid) && type === 'border',
			[`${prefixCls}__nav-item--hover`]: !tab.disabled,
			[`${prefixCls}__nav-item--hover`]: !tab.disabled,
			[`${prefixCls}__nav-item--disabled`]: tab.disabled,
			[`${prefixCls}__nav-item--card`]: type === 'border' || type === 'card'
		});
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<div class={headerCls}>
		<div class={tabContainerCls}>
			{#if showArrow}
				<button class={prevCls} on:click={handlePrev}>
					<KIcon width="16px" height="16px" icon="i-carbon-chevron-left"></KIcon>
				</button>
			{/if}
			<div class={tabScrollCls} bind:this={navRef}>
				<div bind:this={navsRef} role="tablist" style={navStyle} class={tabCls}>
					{#each tabNavList as tab, index (tab.uid)}
						<button
							class={tabItemCls(tab)}
							style:padding-left={`${closePaddingX(tab)}px`}
							style:padding-right={`${closePaddingX(tab)}px`}
							aria-selected="false"
							role="tab"
							tabindex="-1"
							on:mouseenter={() => onHover(tab, true)}
							on:mouseleave={() => onHover(tab, false)}
							on:click={() => handleClick(tab)}
						>
							{tab.label}
							<div
								role="button"
								tabindex="0"
								class={closeCls}
								style:width={`${closeIconWidth(tab)}px`}
								on:keydown={(e) => handleRemove(e, tab, index)}
								style:height={`${closeIconWidth(tab)}px`}
								on:click={(e) => handleRemove(e, tab, index)}
							>
								{#if closeIconWidth(tab)}
									<KIcon width="16px" height="16px" icon="i-carbon-close"></KIcon>
								{/if}
							</div>
							{#if isActive(tab.uid) && type !== 'card' && type !== 'border'}
								<div
									class={barCls}
									out:scale={{ duration: 500, start: 0.1, opacity: 0 }}
									in:scale={{ duration: 500, start: 0.1, opacity: 0 }}
								></div>
							{/if}
						</button>
					{/each}
				</div>
			</div>
			{#if showArrow}
				<button class={nextCls} on:click={handleNext}>
					<KIcon width="16px" height="16px" icon="i-carbon-chevron-right"></KIcon>
				</button>
			{/if}
		</div>

		<div class={addWrapCls}>
			{#if editable}
				<button class={addCls} on:click={handleAdd}>
					<slot name="addIcon">
						<KIcon width="16px" height="16px" icon="i-carbon-add"></KIcon>
					</slot>
				</button>
			{/if}
		</div>
	</div>
	<div class={contentCls}>
		<slot />
	</div>
</div>

<style>
	:global(.k-tabs__nav::-webkit-scrollbar-track-piece) {
		background: transparent;
	}

	:global(.k-tabs__nav::-webkit-scrollbar) {
		width: 0;
		height: 0;
	}

	:global(.k-tabs__header::after) {
		content: '';
		--at-apply: bg-ikun-bd-base absolute w-full h-2px left-0 bottom-0;
	}

	:global(.k-tabs__header--card::after, .k-tabs__header--border::after) {
		content: '';
		--at-apply: bg-ikun-bd-base absolute w-full border-solid border-ikun-bd-base bdb-1 left-0
			bottom-0;
	}

	:global(.k-tabs > .k-tabs__header--card .k-tabs__nav-item:first-child) {
		border-left: none;
	}

	:global(.k-tabs > .k-tabs__header--border .k-tabs__nav-item:first-child) {
		border-left: none;
		--at-apply: rounded-t;
	}
</style>
