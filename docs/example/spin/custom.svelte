<script>
	import { KSpin } from '@ikun-ui/spin';
	import { KButton } from '@ikun-ui/button';
	import IKun from './ikun.svelte';
	const spinOptions = {
		show: false,
		spinner: IKun,
		rotating: false,
		text: '只因你太美'
	};

	const handleSpin = () => {
		spinOptions.show = true;
		setTimeout(() => {
			spinOptions.show = false;
		}, 3000);
	};
</script>

<div use:KSpin={spinOptions} class="w-full h-200px flex justify-center items-center">
	<KButton on:click={handleSpin}>Spin</KButton>
</div>
