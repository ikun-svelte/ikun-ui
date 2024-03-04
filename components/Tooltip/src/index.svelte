<script lang="ts">
	import { KPopover } from '@ikun-ui/popover';
	import { clsx } from 'clsx';
	import type { KTooltipProps } from './types';

	export let placement: KTooltipProps['placement'] = 'top';
	// hover click manual
	export let trigger: KTooltipProps['trigger'] = 'hover';
	export let cls: KTooltipProps['cls'] = undefined;
	export let attrs: KTooltipProps['attrs'] = {};
	export let content: KTooltipProps['content'] = '';
	export let disabled: KTooltipProps['disabled'] = false;

	$: cnames = clsx(cls);
</script>

<KPopover cls={cnames} {disabled} {trigger} {placement} {attrs}>
	<span slot="contentEl">{content}</span>
	<slot name="triggerEl" slot="triggerEl" />
</KPopover>
