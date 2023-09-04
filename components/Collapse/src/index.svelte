<script lang="ts">
	import { fly } from 'svelte/transition';
	import { KIcon } from '@ikun-ui/icon';
	import { createEventDispatcher } from 'svelte';
	import { clsx, type ClassValue } from 'clsx';
	import { getPrefixCls } from '@ikun-ui/utils';

	export let title = '';
	export let content = '';
	export let attrs = {};
	export let cls: ClassValue = '';
	export let show = false;
	export let showClose = true;

	const dispatch = createEventDispatcher();
	let showInner = show;
	const showContent = () => {
		showInner = !showInner;
		dispatch('change', showInner);
	};
	$: if (show) showInner = true;
	else showInner = false;

	// class
	const prefixCls = getPrefixCls('collapse');
	$: clsInner = clsx(`${prefixCls}`, `${prefixCls}--base`, cls);
	$: cnames = clsx(`${prefixCls}--title`, `${prefixCls}--title__dark`, {
		[`${prefixCls}--title__show`]: showInner
	});

	$: cnamesLine = clsx(`${prefixCls}--line`);
	$: cnamesContent = clsx(`${prefixCls}--content`);
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
			<div class={cnamesLine} />
			<slot name="content">{content}</slot>
		</div>
	{/if}
</div>
