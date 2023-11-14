<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KVirtualListProps } from './types';
	import Virtual, { isBrowser, type VRange } from './virtual';
	import Item from './item.svelte';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	export let cls: KVirtualListProps['cls'] = undefined;
	export let attrs: KVirtualListProps['attrs'] = {};
	/**
	 * Unique key for getting data from `data`
	 * @type {string}
	 */
	export let key: KVirtualListProps['key'] = 'id';
	/**
	 * Source for list
	 * @type {Array<any>}
	 */
	export let data: KVirtualListProps['data'];
	/**
	 * Count of rendered items
	 * @type {number}
	 */
	export let keeps: KVirtualListProps['keeps'] = 30;
	/**
	 * Estimate size of each item, needs for smooth scrollbar
	 * @type {number}
	 */
	export let estimateSize: KVirtualListProps['estimateSize'] = 10;
	/**
	 * Scroll direction
	 * @type {boolean}
	 */
	export let isHorizontal: KVirtualListProps['isHorizontal'] = false;
	/**
	 * scroll position start index
	 */
	export let start: KVirtualListProps['start'] = 0;
	/**
	 * scroll position offset
	 */
	export let offset: KVirtualListProps['offset'] = 0;
	/**
	 * The threshold to emit `top` event, attention to multiple calls.
	 * @type {number}
	 */
	export let topThreshold: KVirtualListProps['topThreshold'] = 0;
	/**
	 * The threshold to emit `bottom` event, attention to multiple calls.
	 * @type {number}
	 */
	export let bottomThreshold: KVirtualListProps['bottomThreshold'] = 0;

	let displayItems: Array<Record<string, any>> = [];
	let paddingStyle: string | undefined = undefined;
	let directionKey: 'scrollLeft' | 'scrollTop' = isHorizontal ? 'scrollLeft' : 'scrollTop';
	let range: VRange | null = null;
	let virtual = new Virtual(
		{
			slotHeaderSize: 0,
			slotFooterSize: 0,
			keeps: keeps,
			estimateSize: estimateSize,
			buffer: Math.round(keeps / 3), // recommend for a third of keeps
			uniqueIds: getUniqueIdFromDataSources()
		},
		onRangeChanged
	);
	let root: HTMLElement | null = null;
	let shepherd: HTMLElement | null = null;
	const dispatch = createEventDispatcher();

	/**
	 * @type {(id: number) => number}
	 */
	export function getSize(id: number) {
		return virtual.sizes.get(id);
	}

	/**
	 * Count of items
	 * @type {() => number}
	 */
	export function getSizes() {
		return virtual.sizes.size;
	}

	/**
	 * @type {() => number}
	 */
	export function getOffset() {
		return root ? Math.ceil(root[directionKey]) : 0;
	}

	/**
	 * @type {() => number}
	 */
	export function getClientSize() {
		const key = isHorizontal ? 'clientWidth' : 'clientHeight';
		return root ? Math.ceil(root[key]) : 0;
	}

	/**
	 * @type {() => number}
	 */
	export function getScrollSize() {
		const key = isHorizontal ? 'scrollWidth' : 'scrollHeight';
		return root ? Math.ceil(root[key]) : 0;
	}

	/**
	 * @type {() => void}
	 */
	export function updatePageModeFront() {
		if (root && isBrowser()) {
			const rect = root.getBoundingClientRect();
			const { defaultView } = root.ownerDocument;
			if (defaultView) {
				const offsetFront = isHorizontal
					? rect.left + defaultView.pageXOffset
					: rect.top + defaultView.pageYOffset;
				virtual.updateParam('slotHeaderSize', offsetFront);
			}
		}
	}

	/**
	 * @type {(offset: number) => void}
	 */
	export function scrollToOffset(offset: number) {
		if (!isBrowser()) return;
		if (root) {
			root[directionKey] = offset;
		}
	}

	/**
	 * @type {(index: number) => void}
	 */
	export function scrollToIndex(index: number) {
		if (index >= data.length - 1) {
			scrollToBottom();
		} else {
			const offset = virtual.getOffset(index);
			scrollToOffset(offset);
		}
	}

	/**
	 * @type {() => void}
	 */
	export function scrollToBottom() {
		if (shepherd) {
			const offset = shepherd[isHorizontal ? 'offsetLeft' : 'offsetTop'];
			scrollToOffset(offset);

			// check if it's really scrolled to the bottom
			// maybe list doesn't render and calculate to last range,
			// so we need retry in next event loop until it really at bottom
			setTimeout(() => {
				if (getOffset() + getClientSize() + 1 < getScrollSize()) {
					scrollToBottom();
				}
			}, 3);
		}
	}

	onMount(() => {
		if (start) {
			scrollToIndex(start);
		} else if (offset) {
			scrollToOffset(offset);
		}
	});

	onDestroy(() => {
		virtual.destroy();
	});

	function getUniqueIdFromDataSources() {
		return data.map((dataSource) => dataSource[key]);
	}

	function onItemResized(event: CustomEvent) {
		const { id, size, type } = event.detail;
		if (type === 'item') virtual.saveSize(id, size);
		else if (type === 'slot') {
			if (id === 'header') virtual.updateParam('slotHeaderSize', size);
			else if (id === 'footer') virtual.updateParam('slotFooterSize', size);
		}
	}

	function onRangeChanged(_range: VRange) {
		range = _range;
		paddingStyle = paddingStyle = isHorizontal
			? `0px ${range.padBehind}px 0px ${range.padFront}px`
			: `${range.padFront}px 0px ${range.padBehind}px`;
		displayItems = data.slice(range.start, range.end + 1);
	}

	function onScroll(event: Event) {
		const offset = getOffset();
		const clientSize = getClientSize();
		const scrollSize = getScrollSize();

		// iOS scroll-spring-back behavior will make direction mistake
		if (offset < 0 || offset + clientSize > scrollSize || !scrollSize) {
			return;
		}

		virtual.handleScroll(offset);
		emitEvent(offset, clientSize, scrollSize, event);
	}

	function emitEvent(offset: number, clientSize: number, scrollSize: number, event: Event) {
		dispatch('scroll', { event, range: virtual.getRange() });

		if (virtual.isFront() && !!data.length && offset - topThreshold <= 0) {
			dispatch('top');
		} else if (virtual.isBehind() && offset + clientSize + bottomThreshold >= scrollSize) {
			dispatch('bottom');
		}
	}

	$: scrollToOffset(offset);
	$: scrollToIndex(start);
	$: handleKeepsChange(keeps);

	function handleKeepsChange(keeps: number) {
		virtual.updateParam('keeps', keeps);
		virtual.handleSlotSizeChange();
	}

	let oData = data;
	$: if (oData !== data) {
		handleDataSourcesChange();
		oData = data;
	}
	$: handleDataSourcesChange();

	async function handleDataSourcesChange() {
		virtual.updateParam('uniqueIds', getUniqueIdFromDataSources());
		virtual.handleDataSourcesChange();
	}

	const prefixCls = getPrefixCls('virtual-list');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: isHorizontal
		},
		cls
	);
	$: wrapperCls = clsx({
		[`${prefixCls}--wrapper`]: isHorizontal
	});
</script>

<div
	bind:this={root}
	class={cnames}
	{...$$restProps}
	{...attrs}
	on:scroll={onScroll}
	style="overflow-y: auto; height: inherit"
>
	{#if $$slots.header}
		<Item on:resize={onItemResized} type="slot" uniqueKey="header">
			<slot name="header" />
		</Item>
	{/if}
	<div style:padding={paddingStyle} class={wrapperCls}>
		{#each displayItems as dataItem, dataIndex (dataItem[key])}
			<Item
				on:resize={onItemResized}
				uniqueKey={dataItem[key]}
				horizontal={isHorizontal}
				type="item"
			>
				<slot data={dataItem} index={dataIndex} />
			</Item>
		{/each}
	</div>
	{#if $$slots.footer}
		<Item on:resize={onItemResized} type="slot" uniqueKey="footer">
			<slot name="footer" />
		</Item>
	{/if}
	<div
		bind:this={shepherd}
		class="shepherd"
		style:width={isHorizontal ? '0px' : '100%'}
		style:height={isHorizontal ? '100%' : '0px'}
	></div>
</div>
