<script>
	import { KSpin } from '../../src';
	const spinOptions = {
		show: false,
		text: 'loading...',
		fullScreen: true
	};

	const handleSpin = () => {
		spinOptions.show = true;
	};
</script>

<div use:KSpin={spinOptions} class="w-full h-200px flex justify-center items-center">
	<button on:click={handleSpin} id="spin_full">Spin</button>
</div>
