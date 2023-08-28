<script>
	import { KRate } from '@ikun-ui/rate';

	let value = 3;
	const scoreTemplate = '{value} points';
</script>

<KRate {value} showScore {scoreTemplate} disabled></KRate>
