<script lang="ts">
	import { KSegmented, KSegmentedItem } from '@ikun-ui/segmented';
	import type { IKunSize } from '@ikun-ui/utils';
	let value = 'Daily-value';
	let size: IKunSize = 'md';
	const handleInput = (event: CustomEvent) => {
		value = event.detail;
	};
</script>

<KSegmented on:change={handleInput} {value} {size}>
	<KSegmentedItem onlyIcon icon="i-icon-logo-vue" value="Daily-value" label="Daily" />
	<KSegmentedItem onlyIcon value="Weekly-value" label="Weekly" disabled={false} />
	<KSegmentedItem value="Monthly-value" label="Monthly" disabled={false} />
	<KSegmentedItem value="Quarterly-value" label="Quarterly" disabled={false} />
	<KSegmentedItem value="Yearly-value" label="Yearly" disabled={false} />
</KSegmented>
<div id="test_value">{value}</div>
