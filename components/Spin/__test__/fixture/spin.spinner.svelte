<script>
	import { KSpin } from '../../src';
	const spinOptions = {
		show: false,
		text: 'loading...',
		spinner: 'custom spinner'
	};

	const handleSpin = () => {
		spinOptions.show = true;
	};
</script>

<div use:KSpin={spinOptions} class="w-full h-200px flex justify-center items-center">
	<button on:click={handleSpin} id="spin_spinner">Spin</button>
</div>
