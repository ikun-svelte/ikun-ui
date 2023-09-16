<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { KPopover } from '@ikun-ui/popover';
	import { KButton } from '@ikun-ui/button';
	import { KIcon } from '@ikun-ui/icon';
	import { clsx } from 'clsx';
	import type { KPopconfirmProps } from './types';

	export let cls: KPopconfirmProps['cls'] = undefined;
	export let attrs: KPopconfirmProps['attrs'] = {};
	export let type: KPopconfirmProps['type'] = 'info';
	export let icon: KPopconfirmProps['icon'] = '';
	export let disabled: KPopconfirmProps['disabled'] = false;
	export let cancelBtnText: KPopconfirmProps['cancelBtnText'] = 'cancel';
	export let cancelBtnCls: KPopconfirmProps['cancelBtnCls'] = '';
	export let confirmBtnText: KPopconfirmProps['confirmBtnText'] = 'confirm';
	export let confirmBtnCls: KPopconfirmProps['confirmBtnCls'] = '';
	export let showCancel: KPopconfirmProps['showCancel'] = true;
	export let title: KPopconfirmProps['title'] = '';
	export let content: KPopconfirmProps['content'] = '';
	export let trigger: KPopconfirmProps['trigger'] = 'click';

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
		[`${prefixCls}--${type}`]: !icon
	});

	$: titleIconTypeCls = clsx({
		[`${prefixCls}--icon--${type}`]: !icon,
		[`${icon}`]: icon
	});
</script>

<KPopover {trigger}>
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
			<div class="my-4 mx-2">
				{content}
			</div>
		{:else}
			<slot name="content" />
		{/if}

		{#if !$$slots.footer}
			<div class="flex justify-end items-center">
				{#if showCancel}
					<KButton cls="mr-2 {cancelBtnCls}" type="info" size="sm">
						{cancelBtnText}
					</KButton>
				{/if}
				<KButton cls={confirmBtnCls} size="sm">
					{confirmBtnText}
				</KButton>
			</div>
		{:else}
			<slot name="footer" />
		{/if}
	</div>
</KPopover>
