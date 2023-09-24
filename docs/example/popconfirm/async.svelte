<script lang="ts">
	import { KPopconfirm } from '@ikun-ui/popconfirm';
	import { KButton } from '@ikun-ui/button';

	let time = 3;
	const handleConfirm = (e) => {
		let timer = setInterval(() => {
			time--;
			if (time === 0) {
				e.detail.close();
				clearInterval(timer);
			}
		}, 1000);
	};
</script>

<KPopconfirm
	title="Delete the task"
	type="warning"
	asyncClose
	on:confirm={handleConfirm}
	content={`Are you sure to delete this task? close: ${time}s`}
>
	<KButton type="error" plain>delete</KButton>
</KPopconfirm>
