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
	export let mouseEnterDelay: KTooltipProps['mouseEnterDelay'] = 200;
	export let mouseLeaveDelay: KTooltipProps['mouseLeaveDelay'] = 200;

	$: cnames = clsx(cls);
</script>

<KPopover cls={cnames} {disabled} {trigger} {mouseEnterDelay} {mouseLeaveDelay} {placement} {attrs}>
	<span slot="contentEl">{content}</span>
	<slot name="triggerEl" slot="triggerEl" />
</KPopover>
