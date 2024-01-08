<script lang="ts">
	import { KSegmented, KSegmentedItem } from '@ikun-ui/segmented';
	let value = 'Daily-value';
	const handleInput = (event: CustomEvent) => {
		value = event.detail;
	};
</script>

<KSegmented on:change={handleInput} {value} block>
	<KSegmentedItem value="Daily-value" label="Daily" />
	<KSegmentedItem value="Weekly-value" label="Weekly" disabled={false} />
	<KSegmentedItem value="Monthly-value" label="Monthly" disabled={false} />
	<KSegmentedItem value="Quarterly-value" label="Quarterly" disabled={false} />
	<KSegmentedItem value="Yearly-value" label="Yearly" disabled={false} />
</KSegmented>
