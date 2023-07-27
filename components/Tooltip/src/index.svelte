<script lang="ts">
	import {KPopover} from '@ikun-ui/popover';
	export let placement = 'top';
	// hover click manual
	export let trigger: 'manual' | 'click' | 'hover' = 'hover';
	export let customClass = '';
	export let content = '';
</script>

<KPopover {customClass} {trigger} {placement}>
	<span slot="contentEl">{content}</span>
	<slot name="triggerEl" slot="triggerEl" />
</KPopover>
