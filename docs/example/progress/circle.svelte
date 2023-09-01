<script>
	import { KProgress } from '@ikun-ui/progress';
	import { onDestroy } from "svelte";
	let percentage = 10;
	let timer = setInterval(() => {
		if (percentage >= 100) {
			percentage = 10;
		}
		percentage++;
	}, 280);
	onDestroy(() => clearInterval(timer))
</script>

<div flex>
	<KProgress {percentage} type="circle"></KProgress>
	<KProgress {percentage} width={100} color="#f8a153" type="circle"></KProgress>
	<KProgress {percentage} width={80} color="#29b8ce" type="circle"></KProgress>
</div>

<div flex>
	<KProgress {percentage} type="circle">
		<div>🏀</div>
	</KProgress>
	<KProgress {percentage} width={100} color="#f8a153" type="circle">
		<div>🏀</div>
	</KProgress>
	<KProgress {percentage} width={80} color="#29b8ce" type="circle">
		<div>🏀</div>
	</KProgress>
</div>
