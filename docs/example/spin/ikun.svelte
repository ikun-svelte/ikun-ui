<script>
	import { KSpin } from '@ikun-ui/spin';
	import { KButton } from '@ikun-ui/button';
	const spinOptions = {
		show: false,
		spinner: 'ikun'
	};

	const handleSpin = () => {
		spinOptions.show = true;
		setTimeout(() => {
			spinOptions.show = false;
		}, 3000);
	};
</script>

<div use:KSpin={spinOptions} class="w-full h-200px">
	<KButton on:click={handleSpin}>Spin</KButton>
</div>
