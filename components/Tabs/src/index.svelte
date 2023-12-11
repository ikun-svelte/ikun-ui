<script lang="ts">
	import { tabsKey, getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KTabsProps, TabHeader } from './types';
	import { KIcon } from '@ikun-ui/icon';
	import { createEventDispatcher, setContext } from 'svelte';
	import { scale } from 'svelte/transition';

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
		handleClick({ uid: value, label: '' }, true);
	}
	const handleClick = (tab: TabHeader, isInit = false) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		for (const [_, fn] of Object.entries(tabsShowEvt)) {
			fn(tab.uid);
		}
		activeValue = tab.uid as number;
		!isInit && dispatch('click', tab);
	};

	const prefixCls = getPrefixCls('tabs');
	$: cnames = clsx(prefixCls, {}, cls);
	$: headerCls = clsx(`${prefixCls}--header`);
	$: contentCls = clsx(`${prefixCls}--content`);
	$: tabCls = clsx(`${prefixCls}--tab`);
	$: addCls = clsx(`${prefixCls}--add`);
	$: barCls = clsx(`${prefixCls}--bar`);
	$: isActive = (uid: KTabsProps['value']) => uid === activeValue;
	$: tabItemCls = (uid: KTabsProps['value']) =>
		clsx({
			[`${prefixCls}--tab-item`]: type !== 'border' && type !== 'card',
			[`${prefixCls}--tab-item__border`]: type === 'border' && type !== 'card',
			[`${prefixCls}--tab-item__card`]: type !== 'border' && type === 'card',

			[`${prefixCls}--tab-item__active`]: type !== 'border' && type !== 'card' && isActive(uid),
			[`${prefixCls}--tab-item__border__active`]: type === 'border' && type !== 'card',
			[`${prefixCls}--tab-item__card__active`]: type !== 'border' && type === 'card'
		});
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<div class={headerCls}>
		<div class={tabCls}>
			{#each tabHeaders as tab (tab.uid)}
				<div
					class={tabItemCls(tab.uid)}
					aria-selected="false"
					aria-hidden="true"
					role="tab"
					tabindex="-1"
					on:click={() => handleClick(tab)}
				>
					{tab.label}
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
			<div class={addCls}>
				<slot name="addIcon">
					<KIcon icon="i-carbon-add"></KIcon>
				</slot>
			</div>
		{/if}
	</div>
	<div class={contentCls}>
		<slot />
	</div>
</div>
