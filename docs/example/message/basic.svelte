<script>
	import { KButton } from '@ikun-ui/button';
	import { KMessage } from '@ikun-ui/message';
	const renderMessage = (content) => {
		KMessage({
			title: 'message',
			content
		});
	};
</script>

<div class="flex items-center flex-wrap">
	<KButton type="info" cls="mx-2" on:click={() => renderMessage('哇，真的是你啊~')}>
		render message
	</KButton>
</div>
