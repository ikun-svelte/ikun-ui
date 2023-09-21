<script>
	import { KButton } from '@ikun-ui/button';
	import { KMessage } from '@ikun-ui/message';
	const renderMessageClose = (content) => {
		KMessage({
			content,
			close: false
		});
	};

	const renderMessageAutoClose = (content) => {
		KMessage({
			content,
			autoClose: true
		});
	};

	let time = 5;
	const renderMessageDuration = (content) => {
		time = 5;
		KMessage({
			autoClose: true,
			content,
			duration: 5000
		});
		let timer = setInterval(() => {
			if (time === 0) {
				clearInterval(timer);
				return;
			}
			time--;
		}, 1000);
	};

	const renderMessageCb = (content) => {
		KMessage({
			content,
			onClose: () => {
				window.alert('close! 🎯');
			}
		});
	};
</script>

<div class="flex items-center flex-wrap">
	<KButton cls="mx-2" on:click={() => renderMessageClose('哇，真的是你啊~', 'info')}>
		can't manually close
	</KButton>

	<KButton cls="mx-2" on:click={() => renderMessageAutoClose('哇，真的是你啊~', 'info')}>
		auto close
	</KButton>

	<KButton cls="mx-2" on:click={() => renderMessageDuration('哇，真的是你啊~', 'info')}>
		duration {time}s
	</KButton>

	<KButton cls="mx-2" on:click={() => renderMessageCb('鸡脚露出来了，快关掉这个鸡脚！', 'info')}>
		close callback
	</KButton>
</div>
