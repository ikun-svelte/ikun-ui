<script lang="ts">
	import Popover from '../Popover/Popover.svelte';
	export let placement = 'top';
	// hover click manual
	export let trigger: 'manual' | 'click' | 'hover' = 'hover';
	export let customClass = '';
	export let content = '';
</script>

<Popover {customClass} {trigger} {placement}>
	<span slot="contentEl">{content}</span>
	<slot name="triggerEl" slot="triggerEl" />
</Popover>
