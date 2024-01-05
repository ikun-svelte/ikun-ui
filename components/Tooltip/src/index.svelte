<script lang="ts">
	import { KPopover } from '@ikun-ui/popover';
	import type { IKunPlacement, IKunTrigger } from '@ikun-ui/utils';
	import { clsx, type ClassValue } from 'clsx';

	export let placement: IKunPlacement = 'top';
	// hover click manual
	export let trigger: IKunTrigger = 'hover';
	export let cls: ClassValue = undefined;
	export let attrs: Record<string, string> = {};
	export let content = '';
	export let disabled: boolean = false;

	$: cnames = clsx(cls);
</script>

<KPopover cls={cnames} {disabled} {trigger} {placement} {attrs}>
	<span slot="contentEl">{content}</span>
	<slot name="triggerEl" slot="triggerEl" />
</KPopover>
