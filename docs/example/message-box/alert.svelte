<script>
	import { KButton } from '@ikun-ui/button';
	import { KMsgBox } from '@ikun-ui/message-box';
	const renderMsgBox = () => {
		KMsgBox.alert({
			title: '🏀 ！！',
			content: 'You walking towards me make me so ready to move',
			onCancel() {
				console.log('cancel');
			},
			onConfirm() {
				console.log('confirm');
			}
		});
	};
</script>

<div class="flex items-center flex-wrap">
	<KButton type="warning" cls="mx-2" on:click={() => renderMsgBox()}>trigger alert</KButton>
</div>
