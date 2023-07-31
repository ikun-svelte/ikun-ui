<script lang="ts">
	import {KPopover} from '@ikun-ui/popover';
	export let placement: 'top' | 'left' | 'right' | 'bottom' = 'top';
	// hover click manual
	export let trigger: 'manual' | 'click' | 'hover' = 'hover';
	export let cls = '';
	export let content = '';
</script>

<KPopover {cls} {trigger} {placement}>
	<span slot="contentEl">{content}</span>
	<slot name="triggerEl" slot="triggerEl" />
</KPopover>
