<script lang="ts">
	import { KPopover } from '@ikun-ui/popover';
	import type { IKunPlacement, IKunTrigger } from '@ikun-ui/utils';
	import { clsx, type ClassValue } from 'clsx';

	export let placement: IKunPlacement = 'top';
	// hover click manual
	export let trigger: IKunTrigger = 'hover';
	export let cls: ClassValue = '';
	export let attrs = {};
	export let content = '';

	$: cnames = clsx(cls);
</script>

<KPopover cls={cnames} {trigger} {placement} {attrs}>
	<span slot="contentEl">{content}</span>
	<slot name="triggerEl" slot="triggerEl" />
</KPopover>
