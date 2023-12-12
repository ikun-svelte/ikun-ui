<script lang="ts">
	import { tabsKey, getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KTabsProps, TabHeader } from './types';
	import { KIcon } from '@ikun-ui/icon';
	import { createEventDispatcher, setContext } from 'svelte';
	import { scale } from 'svelte/transition';
	import { jsonClone } from 'baiwusanyu-utils'
	export let value: KTabsProps['value'] = 0;

	export let type: KTabsProps['type'] = '';
	export let cls: KTabsProps['cls'] = '';
	export let closeable: KTabsProps['closeable'] = false;
	export let editable: KTabsProps['editable'] = false;
	export let position: KTabsProps['position'] = 'top';
	export let attrs: KTabsProps['attrs'] = {};

	const dispatch = createEventDispatcher();
	let tabHeaderList: TabHeader[] = [];
	$: tabHeaders = tabHeaderList;
	const tabsShowEvt = {} as Record<string, (v: KTabsProps['value']) => void>;
	function setTabsHeader(v: TabHeader) {
		v.close = false
		tabHeaderList = tabHeaderList.concat([v]);
	}

	function registerTabsShowEvt(uid: KTabsProps['value'], fn: (v: KTabsProps['value']) => void) {
		tabsShowEvt[uid] = fn;
	}
	setContext(tabsKey, {
		value,
		setTabsHeader,
		registerTabsShowEvt
	});

	$: activeValue = value;
	$: {
		handleClick({ uid: value, label: '', close: false }, true);
	}

	function delPropertyData(tab: TabHeader){
		const res = jsonClone(tab)
		Reflect.deleteProperty(res, 'close')
		return res
	}
	const handleClick = (tab: TabHeader, isInit = false) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		for (const [_, fn] of Object.entries(tabsShowEvt)) {
			fn(tab.uid);
		}
		activeValue = tab.uid as number;
		!isInit && dispatch('click', delPropertyData(tab));
	};

	function onMouseenter(index){
		tabHeaderList[index].close = true
	}

	function onMouseleave(index){
		tabHeaderList[index].close = false
	}

	function handleRemove(e: CustomEvent, tab: TabHeader, index: number){
		e.stopPropagation()
		dispatch('remove', { tab:delPropertyData(tab), index});
		dispatch('edit', {tab: delPropertyData(tab), action: 'remove'});
	}

	function handleAdd(){
		dispatch('add');
		dispatch('edit', {tab: undefined, action: 'add'});
	}

	const prefixCls = getPrefixCls('tabs');
	$: cnames = clsx(prefixCls, {}, cls);
	$: headerCls = clsx(`${prefixCls}--header`);
	$: contentCls = clsx(`${prefixCls}--content`);
	$: tabCls = clsx(`${prefixCls}--tab`);
	$: addCls = clsx(`${prefixCls}--add`);
	$: barCls = clsx(`${prefixCls}--bar`);
	$: closeCls = clsx(
		`${prefixCls}--close`,
		`${prefixCls}--close__hover`
	);
	$: isActive = (uid: KTabsProps['value']) => uid === activeValue;
	$: tabItemCls = (uid: KTabsProps['value']) =>
		clsx({
			[`${prefixCls}--tab-item tra`]: type !== 'border' && type !== 'card',
			[`${prefixCls}--tab-item__border`]: type === 'border' && type !== 'card',
			[`${prefixCls}--tab-item__card`]: type !== 'border' && type === 'card',

			[`${prefixCls}--tab-item__active`]: type !== 'border' && type !== 'card' && isActive(uid),
			[`${prefixCls}--tab-item__border__active`]: type === 'border' && type !== 'card',
			[`${prefixCls}--tab-item__card__active`]: type !== 'border' && type === 'card',
			[`${prefixCls}--tab-item__hover`]: true
		});
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<div class={headerCls}>
		<div class={tabCls}>
			{#each tabHeaders as tab, index (tab.uid)}
				<div
					class={tabItemCls(tab.uid)}
					aria-selected="false"
					aria-hidden="true"
					role="tab"
					tabindex="-1"
					on:mouseenter={()=> onMouseenter(index)}
					on:mouseleave={()=> onMouseleave(index)}
					on:click={() => handleClick(tab)}
				>
					<span class="tra">
							{tab.label}
					</span>

					{#if closeable || editable}
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
	.tra{
		transition: padding .3s cubic-bezier(.23, 1, .32, 1);
	}
</style>
