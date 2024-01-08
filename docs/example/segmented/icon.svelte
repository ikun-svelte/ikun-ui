<script lang="ts">
	import { KSegmented, KSegmentedItem } from '@ikun-ui/segmented';
	import type { IKunSize } from '@ikun-ui/utils';
	let value = 'Daily-value';
	let size: IKunSize = 'md';
	const handleInput = (event) => {
		value = event.detail;
	};
</script>

<KSegmented on:change={handleInput} {value} {size}>
	<KSegmentedItem icon="i-carbon-3d-cursor-alt" value="Daily-value" label="Daily" />
	<KSegmentedItem
		icon="i-carbon-border-full"
		value="Weekly-value"
		label="Weekly"
		disabled={false}
	/>
	<KSegmentedItem
		icon="i-carbon-chart-pie"
		value="Monthly-value"
		label="Monthly"
		disabled={false}
	/>
	<KSegmentedItem
		icon="i-carbon-collapse-categories"
		value="Quarterly-value"
		label="Quarterly"
		disabled={false}
	/>
	<KSegmentedItem icon="i-carbon-cube" value="Yearly-value" label="Yearly" disabled={false} />
</KSegmented>
