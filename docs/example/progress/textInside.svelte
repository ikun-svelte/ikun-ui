<script>
	import { KProgress } from '@ikun-ui/progress';
	let percentage = 10;
	setInterval(() => {
		percentage++;
	}, 280);
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
	<KProgress {percentage} textInside={true} format="🐔" strokeWidth={24}></KProgress>
</div>
