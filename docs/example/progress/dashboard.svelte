<script>
	import { KProgress } from '@ikun-ui/progress';

	let percentage = 10;
	let timer = setInterval(() => {
		if (percentage >= 100) {
			clearInterval(timer);
		}
		percentage++;
	}, 280);
</script>

<div flex>
	<KProgress {percentage} type="dashboard"></KProgress>
	<KProgress {percentage} width={100} color="#f8a153" type="dashboard"></KProgress>
	<KProgress {percentage} width={80} color="#29b8ce" type="dashboard"></KProgress>
</div>

<div flex>
	<KProgress {percentage} type="dashboard">
		<div>🏀</div>
	</KProgress>
	<KProgress {percentage} width={100} color="#f8a153" type="dashboard">
		<div>🏀</div>
	</KProgress>
	<KProgress {percentage} width={80} color="#29b8ce" type="dashboard">
		<div>🏀</div>
	</KProgress>
</div>
