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
	<KSegmentedItem value="Daily-value" label="Daily">
		<span class="custom-segmented-item">Daily 🐔</span>
	</KSegmentedItem>
	<KSegmentedItem value="Weekly-value" label="Weekly">
		<span class="custom-segmented-item">Weekly 🎤</span>
	</KSegmentedItem>
	<KSegmentedItem value="Monthly-value" label="Monthly">
		<span class="custom-segmented-item">Monthly 💃</span>
	</KSegmentedItem>
	<KSegmentedItem value="Quarterly-value" label="Quarterly">
		<span class="custom-segmented-item">Quarterly ✌️</span>
	</KSegmentedItem>
	<KSegmentedItem value="Yearly-value" label="Yearly">
		<span class="custom-segmented-item">Yearly 🏀</span>
	</KSegmentedItem>
</KSegmented>

<style>
	.custom-segmented-item {
		--at-apply: px-12px z-1;
	}
</style>
