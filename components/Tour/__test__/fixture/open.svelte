<script>
	import { KTour } from '@ikun-ui/tour';
	let refEl = null;
	let refEl2 = null;
	let steps = [];
	$: {
		steps = [
			{
				title: '111111111111111111',
				target: refEl
			},
			{
				title: 'custom-title',
				target: refEl2
			}
		];
	}
	let open = false;
	const handleClick = () => {
		open = true;
	};
</script>

<KTour {open} {steps} current={1}></KTour>
<button bind:this={refEl}>111</button>
<button bind:this={refEl2}>222</button>
<button on:click={handleClick} id="bwsy_trigger">trigger</button>
