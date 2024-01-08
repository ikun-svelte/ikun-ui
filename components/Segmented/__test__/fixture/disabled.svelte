<script lang="ts">
	import { KSegmented, KSegmentedItem } from '@ikun-ui/segmented';
	import type { IKunSize } from '@ikun-ui/utils';
	let value = 'Daily-value';
	let size: IKunSize = 'md';
	const handleClick = (event: CustomEvent) => {
		value = event.detail;
	};
</script>

<KSegmented {value} {size}>
	<KSegmentedItem value="Daily-value" label="Daily" />
	<KSegmentedItem value="Weekly-value" label="Weekly" disabled={false} />
	<KSegmentedItem on:click={handleClick} value="Monthly-value" label="Monthly" disabled={true} />
	<KSegmentedItem value="Quarterly-value" label="Quarterly" disabled={false} />
	<KSegmentedItem value="Yearly-value" label="Yearly" disabled={false} />
</KSegmented>
<div id="test_value">{value}</div>
