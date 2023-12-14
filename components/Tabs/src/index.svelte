<script lang="ts">
	import { tabsKey, getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KTabsProps, TabHeader } from './types';
	import { KIcon } from '@ikun-ui/icon';
	import { createEventDispatcher, onDestroy, onMount, setContext, tick } from "svelte";
	import { scale } from 'svelte/transition';
	import { jsonClone } from 'baiwusanyu-utils'
	import { BROWSER } from 'esm-env';
	export let value: KTabsProps['value'] = 0;

	export let type: KTabsProps['type'] = '';
	export let cls: KTabsProps['cls'] = '';
	export let closeable: KTabsProps['closeable'] = false;
	export let navOptions: KTabsProps['navOptions'] = [];
	export let editable: KTabsProps['editable'] = false;
	export let position: KTabsProps['position'] = 'top';
	export let beforeLeave: KTabsProps['beforeLeave'] = async ()=> true;
	export let attrs: KTabsProps['attrs'] = {};

	const dispatch = createEventDispatcher();
	let tabHeaderList: TabHeader[] = []
	$:{
		tabHeaderList = navOptions.map(option => {
			return {
				...option,
				close: false
			}
		});
	}
	$: tabHeaders = tabHeaderList;

	const tabsShowEvt = {} as Record<string, (v: KTabsProps['value']) => void>;
	function registerTabsShowEvt(uid: KTabsProps['value'], fn: (v: KTabsProps['value']) => void) {
		tabsShowEvt[uid] = fn;
	}
	setContext(tabsKey, {
		value,
		registerTabsShowEvt
	});

	$: activeValue = value;
	$: {
		triggerTabsShowEvt(activeValue)
	}
	function triggerTabsShowEvt(uid: KTabsProps['value']){
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		for (const [_, fn] of Object.entries(tabsShowEvt)) {
			fn(uid);
		}
	}
	function delPropertyData(tab: TabHeader){
		const res = jsonClone(tab)
		Reflect.deleteProperty(res, 'close')
		return res
	}
	const handleClick = async (tab: TabHeader) => {
		if(tab.disabled) return
		const isSwitch = await beforeLeave(activeValue, tab.uid)
		if(isSwitch){
			activeValue = tab.uid as number;
			dispatch('click', delPropertyData(tab));
		}
	};

	function onMouseenter(tab: TabHeader, index: number){
		if(tab.disabled) return
		tabHeaderList[index].close = true
	}

	function onMouseleave(tab: TabHeader, index: number){
		if(tab.disabled) return
		tabHeaderList[index].close = false
	}

	function handleRemove(e: MouseEvent, tab: TabHeader, index: number){
		if(tab.disabled) return
		e.stopPropagation()
		dispatch('remove', { tab:delPropertyData(tab), index});
		dispatch('edit', {tab: delPropertyData(tab), action: 'remove'});
	}

	async function handleAdd(){
		dispatch('add');
		dispatch('edit', {tab: undefined, action: 'add'});
		await tick()
		checkScrollbar();
		handleNext()
	}

	let navRef: HTMLElement|  null = null
	let showArrow = false;
	const checkScrollbar = () => {
		if (navRef) {
			if(position === 'top' || position === 'bottom'){
				showArrow = navRef.scrollHeight - 10 > navRef.clientHeight;
			}

			if(position === 'top' || position === 'bottom'){
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

	let navStyle = ``
	let navsRef: HTMLElement|  null = null
	let curTransform = 36
	const handleNext = () => {
		if(navRef && navsRef) {
			const maxOffset = navsRef.clientWidth - navRef.clientWidth
			let offset = navRef.clientWidth + curTransform
			if(offset >= maxOffset){
				offset = maxOffset
			}
			navStyle = `transform: translateX(-${offset}px)`
			curTransform = offset
		}
	}

	const handlePrev = () => {
		if(navRef && navsRef) {
			let offset = curTransform - navRef.clientWidth
			if(offset <= 0){
				offset = 0
			}
			navStyle = `transform: translateX(-${offset}px)`
			curTransform = offset
		}
	}

	const prefixCls = getPrefixCls('tabs');
	$: cnames = clsx(prefixCls, {}, cls);
	$: headerCls = clsx(`${prefixCls}--header`);
	$: contentCls = clsx(`${prefixCls}--content`);
	$: tabCls = clsx(`${prefixCls}--nav`);
	$: tabContainerCls = clsx(
		`${prefixCls}--nav--container`,
		{
			[`${prefixCls}--pad`]: showArrow
		}
	)
	$: addCls = clsx(`${prefixCls}--add`);
	$: barCls = clsx(`${prefixCls}--bar`);
	$: prevCls = clsx(`${prefixCls}--prev`);
	$: nextCls = clsx(`${prefixCls}--next`);
	$: closeCls = clsx(
		`${prefixCls}--close`,
		`${prefixCls}--close__hover`
	);
	$: isActive = (uid: KTabsProps['value']) => uid === activeValue;
	$: tabItemCls = (uid: KTabsProps['value'], disabled: boolean) =>
		clsx({
			[`${prefixCls}--nav-item tra`]: type !== 'border' && type !== 'card',
			[`${prefixCls}--nav-item__border`]: type === 'border',
			[`${prefixCls}--nav-item__card`]: type !== 'border' && type === 'card',

			[`${prefixCls}--nav-item__active`]: type !== 'border' && type !== 'card' && isActive(uid),
			[`${prefixCls}--nav-item__border__active`]: type === 'border',
			[`${prefixCls}--nav-item__card__active`]: type !== 'border' && type === 'card',
			[`${prefixCls}--nav-item__hover`]: !disabled,
			[`${prefixCls}--nav-item__disabled`]: disabled
		});
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<div class={headerCls}>
		<div class={tabContainerCls}>
			{#if showArrow}
				<div class={prevCls} on:click={handlePrev} aria-hidden="true">
					<KIcon width='16px' height='16px' icon="i-carbon-chevron-left"></KIcon>
				</div>
			{/if}
			<div class={tabCls} bind:this={navRef}>
				<div bind:this={navsRef} style="{navStyle}" class="flex pr float-left whitespace-nowrap k-tab-transition">
					{#each tabHeaders as tab, index (tab.uid)}
						<div
							class={tabItemCls(tab.uid, tab.disabled)}
							aria-selected="false"
							aria-hidden="true"
							role="tab"
							tabindex="-1"
							on:mouseenter={()=> onMouseenter(tab, index)}
							on:mouseleave={()=> onMouseleave(tab, index)}
							on:click={() => handleClick(tab)}
						>
							{tab.label}

							{#if tab.closeable && (closeable || editable)}
								<div style="width: 16px; height: 16px">
									{#if (isActive(tab.uid) || tab.close)}
										<div class={closeCls}
												 aria-hidden="true"
												 on:click={(e) => handleRemove(e, tab, index)}
												 out:scale={{ duration: 500, start: 0.1, opacity: 0 }}
												 in:scale={{ duration: 500, start: 0.1, opacity: 0 }}>
											<KIcon
												width='16px'
												height='16px'
												icon='i-carbon-close'></KIcon>
										</div>
									{/if}
								</div>
							{/if}

							{#if isActive(tab.uid)}
								<div
									class={barCls}
									out:scale={{ duration: 500, start: 0.1, opacity: 0 }}
									in:scale={{ duration: 500, start: 0.1, opacity: 0 }}
								></div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
			{#if showArrow}
				<div class={nextCls} on:click={handleNext} aria-hidden="true">
					<KIcon width='16px' height='16px' icon="i-carbon-chevron-right"></KIcon>
				</div>
			{/if}
		</div>
		{#if editable}
			<div class={addCls} on:click={handleAdd} aria-hidden="true">
				<slot name="addIcon">
					<KIcon width='16px' height='16px' icon="i-carbon-add"></KIcon>
				</slot>
			</div>
		{/if}
	</div>
	<div class={contentCls}>
		<slot />
	</div>
</div>
<style>
	:global(.k-tabs--nav::-webkit-scrollbar-track-piece) {
		background: transparent;
	}

	:global(.k-tabs--nav::-webkit-scrollbar) {
		width: 0;
		height: 0;
	}
</style>
