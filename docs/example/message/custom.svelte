<script>
	import { KButton } from '@ikun-ui/button';
	import { KMessage } from '@ikun-ui/message';
	import content from './custom-content.svelte';
	const renderMessage = () => {
		KMessage({
			content
		});
	};
</script>

<div class="flex items-center flex-wrap">
	<KButton type="info" cls="mx-2" on:click={() => renderMessage()}>custom render</KButton>
</div>
