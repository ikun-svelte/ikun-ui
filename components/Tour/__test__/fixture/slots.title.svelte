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
	<div slot="title" let:current let:title>
		{current}-{title}
	</div>
</KTour>
<div class="w-full h-2000px fcc">
	<button bind:this={refEl}>111</button>
	<button bind:this={refEl2}>222</button>
</div>
