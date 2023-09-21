<script>
	import { KButton } from '@ikun-ui/button';
	import { KMessage } from '@ikun-ui/message';
	const renderMessage = (content, offset) => {
		KMessage({
			content,
			offset
		});
	};
</script>

<div class="flex items-center flex-wrap">
	<KButton cls="mx-2" on:click={() => renderMessage('哇，真的是你啊~', 120)}>offset</KButton>
</div>
