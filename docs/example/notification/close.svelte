<script>
	import { KButton } from '@ikun-ui/button';
	import { KNotify } from '@ikun-ui/notify';
	const renderNotifyClose = (title, content) => {
		KNotify({
			title,
			content,
			close: false
		});
	};

	const renderNotifyAutoClose = (title, content) => {
		KNotify({
			title,
			content,
			autoClose: true
		});
	};

	let time = 5;
	const renderNotifyDuration = (title, content) => {
		time = 5;
		KNotify({
			title,
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

	const renderNotifyCb = (title, content) => {
		KNotify({
			title,
			content,
			onClose: () => {
				window.alert('close! 🎯');
			}
		});
	};
</script>

<div class="flex items-center flex-wrap">
	<KButton cls="mx-2" on:click={() => renderNotifyClose('Hamlet', '哇，真的是你啊~', 'info')}>
		can't manually close
	</KButton>

	<KButton cls="mx-2" on:click={() => renderNotifyAutoClose('Hamlet', '哇，真的是你啊~', 'info')}>
		auto close
	</KButton>

	<KButton cls="mx-2" on:click={() => renderNotifyDuration('Hamlet', '哇，真的是你啊~', 'info')}>
		duration {time}s
	</KButton>

	<KButton
		cls="mx-2"
		on:click={() => renderNotifyCb('close callback', '鸡脚露出来了，快关掉这个鸡脚！', 'info')}
	>
		close callback
	</KButton>
</div>
