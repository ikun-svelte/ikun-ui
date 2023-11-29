<script>
	import { KButton } from '@ikun-ui/button';
</script>

<div class="flex items-center flex-wrap">
	<KButton
		icon="i-carbon-logo-github"
		type="primary"
		cls="mx-2"
		to="https://github.com/ikun-svelte/ikun-ui"
		target="_blank"
	></KButton>

	<KButton type="primary" cls="mx-2" to="https://github.com/ikun-svelte/ikun-ui" target="_blank"
		>Github</KButton
	>
</div>

<style>
	:global(.k-button--primary__fill) {
		color: #ccfbf1 !important;
	}
</style>
