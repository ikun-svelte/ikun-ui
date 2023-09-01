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

<KProgress {percentage}></KProgress>
<KProgress percentage={20} status="primary"></KProgress>
<KProgress percentage={30} status="success"></KProgress>
<KProgress percentage={40} status="error"></KProgress>
<KProgress percentage={50} status="warning"></KProgress>
<KProgress percentage={60} status="info"></KProgress>
