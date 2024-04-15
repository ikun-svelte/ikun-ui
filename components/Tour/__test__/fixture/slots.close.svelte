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
	<div slot="closeIcon" id="bwsy" let:handleClose on:click={handleClose} aria-hidden="true">
		custom close
	</div>
</KTour>
<div class="w-full h-2000px fcc">
	<button bind:this={refEl}>111</button>
	<button bind:this={refEl2}>222</button>
</div>
