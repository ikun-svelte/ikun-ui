<script lang="ts">
	import { KSegmented, KSegmentedItem } from '@ikun-ui/segmented';
	import type { IKunSize } from '@ikun-ui/utils';
	let value = 'Daily-value';
	let size: IKunSize = 'md';
	const handleInput = (event) => {
		value = event.detail;
	};
</script>

<KSegmented on:change={handleInput} {value} {size} block>
	<KSegmentedItem value="Daily-value" label="Daily" />
	<KSegmentedItem value="Weekly-value" label="Weekly" disabled={false} />
	<KSegmentedItem value="Monthly-value" label="Monthly" disabled={true} />
	<KSegmentedItem value="Quarterly-value" label="Quarterly" disabled={false} />
	<KSegmentedItem value="Yearly-value" label="Yearly Yearly Yearly" disabled={true} />
</KSegmented>

<KSegmented on:change={handleInput} {value} {size} block cls="my-2">
	<KSegmentedItem value="Daily-value" label="Daily" />
	<KSegmentedItem value="Weekly-value" label="Weekly" disabled={true} />
	<KSegmentedItem value="Monthly-value" label="Monthly" disabled={true} />
	<KSegmentedItem value="Quarterly-value" label="Quarterly" disabled={true} />
	<KSegmentedItem value="Yearly-value" label="Yearly Yearly Yearly" disabled={true} />
</KSegmented>
