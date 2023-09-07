<script>
	import { KProgress } from '@ikun-ui/progress';
	import { onDestroy } from 'svelte';
	let percentage = 10;
	let timer = setInterval(() => {
		if (percentage >= 100) {
			percentage = 10;
		}
		percentage++;
	}, 280);
	onDestroy(() => clearInterval(timer));
</script>

<div>
	<KProgress {percentage} textInside={true} strokeWidth={24}></KProgress>
</div>

<div class="py-4">
	<KProgress {percentage} textInside={true} strokeWidth={24}>
		<span>🏀</span>
	</KProgress>
</div>

<div>
	<KProgress {percentage} textInside={true} format={() => '🐔'} strokeWidth={24}></KProgress>
</div>
