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
