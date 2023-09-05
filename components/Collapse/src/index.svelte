<script lang="ts">
	import { fly } from 'svelte/transition';
	import { KIcon } from '@ikun-ui/icon';
	import { createEventDispatcher, getContext, tick } from 'svelte';
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
		const showCur = !showInner;
		if (showCur) {
			showInner = !showInner;
			setAnimateOpen(() => {
				dispatch('change', showInner);
			});
			if (collapseContext) {
				collapseContext.closeCollapse(uid);
			}
		} else {
			setAnimateClose(() => {
				showInner = !showInner;
				dispatch('change', showInner);
			});
		}
	};

	const closeCollapse = () => {
		setAnimateClose(() => {
			showInner = false;
		});
	};

	const collapseContext = getContext<{
		setCollapseMap: (key: string, cb: () => void) => void;
		closeCollapse: (key: string) => void;
	}>(collapseWrapperKey);
	if (collapseContext && uid) {
		collapseContext.setCollapseMap(uid, closeCollapse);
	}

	$: if (show) {
		showInner = true;
		setAnimateOpen();
	} else {
		setAnimateClose(() => {
			showInner = false;
		});
	}

	let contentRef: HTMLElement | null = null;
	let opacity = 0;
	let contentCls = '';
	const setAnimateOpen = async (cb?: () => void) => {
		await tick();
		if (contentRef) {
			const h = contentRef.clientHeight;
			contentRef.style.height = '0';
			contentRef.style.transition = 'height 0.3s linear';
			contentCls = cnamesContent;
			await tick();
			setTimeout(() => {
				contentRef && (contentRef.style.height = `${h}px`);
				opacity = 1;

				cb && cb();
			}, 0);
		}
	};

	const setAnimateClose = (cb: () => void) => {
		if (contentRef) {
			contentRef && (contentRef.style.height = '0');
			opacity = 0;
			contentCls = '';
			setTimeout(() => {
				cb && cb();
			}, 300);
		}
	};

	// class
	const prefixCls = getPrefixCls('collapse');
	$: clsInner = clsx(
		{
			[`${prefixCls}--base`]: !collapseContext,
			[`${prefixCls}--base--wrapper`]: collapseContext
		},
		cls
	);
	$: cnames = clsx(`${prefixCls}--title`, `${prefixCls}--title__dark`);

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
		<div class={contentCls} bind:this={contentRef} style:opacity in:fly={{ y: -30, duration: 300 }}>
			<div class={cnamesLine} />
			<slot name="content">
				{content}
			</slot>
		</div>
	{/if}
</div>
