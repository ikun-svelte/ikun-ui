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
	let open = true;
</script>

<KTour {open} {steps} mask={false} current={1}>
	<div slot="footer" let:current let:handleNext let:handlePrev>
		<button id="bwsy_prev" on:click={handlePrev}>上一步{current}</button>
		<button id="bwsy_next" on:click={handleNext}>下一步{current}</button>
	</div>
</KTour>
<div class="w-full h-2000px fcc">
	<button bind:this={refEl}>111</button>
	<button bind:this={refEl2}>222</button>
</div>
