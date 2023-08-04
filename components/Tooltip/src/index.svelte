<script lang="ts">
	import {KPopover} from '@ikun-ui/popover';
	import type { IKunPlacement, IKunTrigger } from "@ikun-ui/utils";
	export let placement: IKunPlacement = 'top';
	// hover click manual
	export let trigger: IKunTrigger = 'hover';
	export let cls = '';
	export let attrs = {};
	export let content = '';
</script>

<KPopover {cls} {trigger} {placement} {attrs}>
	<span slot="contentEl">{content}</span>
	<slot name="triggerEl" slot="triggerEl" />
</KPopover>
