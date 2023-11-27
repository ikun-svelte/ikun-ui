<script>
	import { KButton } from '@ikun-ui/button';
	import { KNotify } from '@ikun-ui/notify';
	const renderNotify = (placement, content, offset) => {
		KNotify({
			title: placement,
			placement,
			content,
			offset
		});
	};
</script>

<div class="flex items-center flex-wrap">
	<KButton
		type="info"
		cls="mx-2"
		on:click={() => renderNotify('right-top', '哇，真的是你啊~', 120)}
	>
		right-top
	</KButton>
	<KButton cls="mx-2" on:click={() => renderNotify('left-bottom', '食不食油饼', 120)}>
		left-bottom
	</KButton>
</div>
