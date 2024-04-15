<script lang="ts">
	import { KTour } from '@ikun-ui/tour';
	import type { KTourStepsOption } from '@ikun-ui/tour';
	import { KButton } from '@ikun-ui/button';
	let refBtn2 = null;
	let steps: KTourStepsOption[] = [];
	$: {
		steps = [
			{
				title: 'Center',
				description: 'Displayed in the center of screen.'
			},
			{
				title: 'Top',
				description: 'On the top of target.',
				target: refBtn2
			}
		] as KTourStepsOption[];
	}
	let open = false;
	const handleOpen = () => {
		open = true;
	};

	const handleClose = () => {
		open = false;
	};

	const handleFinish = () => {
		open = false;
	};
</script>

<KTour {open} {steps} on:close={handleClose} on:finish={handleFinish} />

<div bind:this={refBtn2} class="w-max">
	<KButton on:click={handleOpen}>Begin Tour</KButton>
</div>
