<script lang="ts">
	import { KTour } from '@ikun-ui/tour';
	import type { KTourStepsOption } from '@ikun-ui/tour';
	import { KDivider } from '@ikun-ui/divider';
	import { KButton } from '@ikun-ui/button';
	let refBtn1 = null;
	let refBtn2 = null;
	let refBtn3 = null;
	let steps: KTourStepsOption[] = [];
	$: {
		steps = [
			{
				title: 'Upload File',
				description: 'Put your files here.',
				target: refBtn1
			},
			{
				title: 'Save',
				description: 'Save your changes.',
				target: refBtn2
			},
			{
				title: 'Other Actions',
				description: 'Click to see other actions.',
				target: refBtn3
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
<KButton on:click={handleOpen}>Begin Tour</KButton>

<KDivider></KDivider>

<div class="fsc">
	<div bind:this={refBtn1}>
		<KButton type="info" ghost>111</KButton>
	</div>
	<div bind:this={refBtn2} class="mx-2">
		<KButton>222</KButton>
	</div>
	<div bind:this={refBtn3}>
		<KButton type="info" ghost circle icon="i-carbon-overflow-menu-horizontal" />
	</div>
</div>
