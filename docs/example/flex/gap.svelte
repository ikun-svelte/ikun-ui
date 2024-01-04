<script lang="ts">
	import { KFlex } from '@ikun-ui/flex';
	import { KRadio } from '@ikun-ui/radio';
	import { KRadioGroup } from '@ikun-ui/radio-group';
	import { KSlider } from '@ikun-ui/slider';
	let value: 'sm' | 'md' | 'lg' | 'custom' = 'sm';
	let show = false;
	let gap: 'sm' | 'md' | 'lg' | number = 'sm';
	const handleUpdated = (e) => {
		value = e.detail;
		if (e.detail !== 'custom') {
			show = false;
			gap = value as 'sm' | 'md' | 'lg';
		} else {
			sliderValue = gap = 10;
			show = true;
		}
	};

	let sliderValue = 10;
	const handleInput = (event) => {
		sliderValue = event.detail;
		gap = sliderValue;
	};
</script>

<KRadioGroup {value} on:updateValue={handleUpdated}>
	<KRadio uid="sm">sm</KRadio>
	<KRadio uid="md">md</KRadio>
	<KRadio uid="lg">lg</KRadio>
	<KRadio uid="custom">custom</KRadio>
</KRadioGroup>
{#if show}
	<KSlider on:input={handleInput} value={sliderValue}></KSlider>
{/if}
<KFlex {gap} cls="mt-2">
	<div class="rounded w-1/4 h-36px bg-orange-200" />
	<div class="rounded w-1/4 h-36px bg-orange-100" />
	<div class="rounded w-1/4 h-36px bg-orange-200" />
	<div class="rounded w-1/4 h-36px bg-orange-100" />
</KFlex>
