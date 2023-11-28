<script>
	import { KButton } from '@ikun-ui/button';
	import { KNotify } from '@ikun-ui/notify';
	import title from './custom-title.svelte';
	import content from './custom-content.svelte';
	const renderNotify = () => {
		KNotify({
			title,
			content
		});
	};
</script>

<div class="flex items-center flex-wrap">
	<KButton type="info" cls="mx-2" on:click={() => renderNotify()}>custom render</KButton>
</div>
