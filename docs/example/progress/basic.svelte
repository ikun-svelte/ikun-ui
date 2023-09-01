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

<KProgress {percentage}></KProgress>
<KProgress percentage={20} status="primary"></KProgress>
<KProgress percentage={30} status="success"></KProgress>
<KProgress percentage={40} status="error"></KProgress>
<KProgress percentage={50} status="warning"></KProgress>
<KProgress percentage={60} status="info"></KProgress>
