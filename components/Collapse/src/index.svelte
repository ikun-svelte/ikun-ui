<script lang="ts">
	import { fly } from 'svelte/transition';
	import { KIcon } from '@ikun-ui/icon';
	import { createEventDispatcher, getContext } from 'svelte';
	import { clsx, type ClassValue } from 'clsx';
	import { getPrefixCls, collapseWrapperKey } from '@ikun-ui/utils';

	export let title = '';
	export let content = '';
	export let attrs = {};
	export let cls: ClassValue = '';
	export let show = false;
	export let showClose = true;
	export let uid: string = '';
	const dispatch = createEventDispatcher();
	let showInner = show;
	const showContent = () => {
		showInner = !showInner;
		showInner  && collapseContext.closeCollapse(uid)
		dispatch('change', showInner);
	};

	const closeCollapse = () => {
		showInner = false;
	}

	const collapseContext = getContext<{
		setCollapseMap: (key: string, cb: () =>void) =>void,
		closeCollapse: (key:string) => void}>(collapseWrapperKey)
	if(collapseContext && uid){
		collapseContext.setCollapseMap(uid, closeCollapse)
	}

	$: if (show) showInner = true;
	else showInner = false;

	// class
	const prefixCls = getPrefixCls('collapse');
	$: clsInner = clsx(`${prefixCls}`, `${prefixCls}--base`, cls);
	$: cnames = clsx(
			`${prefixCls}--title`,
			`${prefixCls}--title__dark`,
			{
				[`${prefixCls}--title__show`]: showInner,
				[`${prefixCls}--border`]: !collapseContext,
				[`${prefixCls}--title__round`]: !collapseContext,
				[`${prefixCls}--title__show__round`]: !collapseContext && showInner,
				[`${prefixCls}--title__wrapper`]: collapseContext,
			});

	$: cnamesLine = clsx(`${prefixCls}--line`);
	$: cnamesContent = clsx(`${prefixCls}--content`, {
		[`${prefixCls}--border`]: !collapseContext,
		[`${prefixCls}--content__round`]: !collapseContext,
		[`${prefixCls}--content__wrapper`]: collapseContext,
	});
</script>

<div class={clsInner} {...attrs}>
	<div class={cnames} on:click={showContent} aria-hidden="true">
		<slot name="title">
			{title}
		</slot>
		<slot name="closeIcon">
			{#if showClose}
				<KIcon icon="i-carbon-chevron-right {showInner ? 'rotate-90' : ''}" />
			{/if}
		</slot>
	</div>
	{#if showInner}
		<div
			class={cnamesContent}
			out:fly={{ y: -30, duration: 300 }}
			in:fly={{ y: -30, duration: 300 }}
		>
			{#if !collapseContext}
				<div class={cnamesLine} />
			{/if}
			<slot name="content">{content}</slot>
		</div>
	{/if}
</div>
