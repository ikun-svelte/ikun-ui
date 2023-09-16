<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { KPopover } from '@ikun-ui/popover';
	import { KButton } from '@ikun-ui/button';
	import { KIcon } from '@ikun-ui/icon';
	import { clsx } from 'clsx';
	import type { KPopconfirmProps } from './types';
	import { createEventDispatcher } from 'svelte';

	export let cls: KPopconfirmProps['cls'] = undefined;
	export let attrs: KPopconfirmProps['attrs'] = {};
	export let type: KPopconfirmProps['type'] = 'info';
	export let icon: KPopconfirmProps['icon'] = '';
	export let iconCls: KPopconfirmProps['iconCls'] = '';
	export let disabled: KPopconfirmProps['disabled'] = false;
	export let cancelBtnText: KPopconfirmProps['cancelBtnText'] = 'Cancel';
	export let cancelBtnCls: KPopconfirmProps['cancelBtnCls'] = '';
	export let confirmBtnText: KPopconfirmProps['confirmBtnText'] = 'Confirm';
	export let confirmBtnCls: KPopconfirmProps['confirmBtnCls'] = '';
	export let showCancel: KPopconfirmProps['showCancel'] = true;
	export let title: KPopconfirmProps['title'] = '';
	export let content: KPopconfirmProps['content'] = '';
	export let trigger: KPopconfirmProps['trigger'] = 'click';
	export let placement: KPopconfirmProps['placement'] = 'top';
	export let asyncClose: KPopconfirmProps['asyncClose'] = false;

	const dispatch = createEventDispatcher();
	let popoverRef: any = null;
	export const close = () => {
		popoverRef && popoverRef.updateShow(false);
	};
	const handleConfirm = () => {
		!asyncClose && close();
		dispatch('confirm', {
			close,
			type: 'confirm'
		});
	};

	const handleCancel = () => {
		!asyncClose && close();
		dispatch('cancel', {
			close,
			type: 'cancel'
		});
	};

	const handleChange = (e: CustomEvent) => {
		dispatch('change', e.detail);
	};

	// class
	const prefixCls = getPrefixCls('popconfirm');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);

	$: titleCls = clsx({
		[`${prefixCls}--title`]: true
	});

	$: titleIconCls = clsx({
		[`${prefixCls}--icon`]: true,
		[`${prefixCls}--${type}`]: !icon,
		[`${iconCls}`]: true
	});

	$: titleIconTypeCls = clsx({
		[`${prefixCls}--icon--${type}`]: !icon,
		[`${icon}`]: icon
	});

	$: contentCls = clsx({
		[`${prefixCls}--content`]: true
	});

	$: footerCls = clsx({
		[`${prefixCls}--footer`]: true
	});
</script>

<KPopover {trigger} {disabled} bind:this={popoverRef} on:change={handleChange} {placement}>
	<slot slot="triggerEl" />
	<div class={cnames} {...$$restProps} {...attrs} slot="contentEl">
		{#if !$$slots.title}
			<div class={titleCls}>
				<KIcon icon={titleIconTypeCls} width="auto" height="auto" cls={titleIconCls} />
				{title}
			</div>
		{:else}
			<slot name="title" />
		{/if}

		{#if !$$slots.content}
			<div class={contentCls}>
				{content}
			</div>
		{:else}
			<slot name="content" />
		{/if}

		{#if !$$slots.footer}
			<div class={footerCls}>
				{#if showCancel}
					<KButton cls="mr-2 {cancelBtnCls}" on:click={handleCancel} type="info" ghost size="sm">
						{cancelBtnText}
					</KButton>
				{/if}
				<KButton cls={confirmBtnCls} on:click={handleConfirm} size="sm">
					{confirmBtnText}
				</KButton>
			</div>
		{:else}
			<slot name="footer" />
		{/if}
	</div>
</KPopover>
