<script>
	import { KButton } from '@ikun-ui/button';
	import { KNotify } from '@ikun-ui/notify';
	const renderNotify = (title, content, type) => {
		KNotify({
			title,
			content,
			type
		});
	};
</script>

<div class="flex items-center flex-wrap">
	<KButton
		type="info"
		cls="mx-2"
		on:click={() => renderNotify('Hamlet', '哇，真的是你啊~', 'info')}
	>
		info
	</KButton>
	<KButton
		type="success"
		cls="mx-2"
		on:click={() => renderNotify('Requiem for a Nun', '香精煎鱼', 'success')}
	>
		success
	</KButton>
	<KButton
		type="warning"
		cls="mx-2"
		on:click={() => renderNotify('One Hundred Years of Solitude', '香翅捞饭' + '', 'warning')}
	>
		warning
	</KButton>
	<KButton
		type="error"
		cls="mx-2"
		on:click={() => renderNotify('A Tale of Two Cities', '食不食油饼', 'error')}
	>
		error
	</KButton>
</div>
