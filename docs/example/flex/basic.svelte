<script lang="ts">
	import { KFlex } from '@ikun-ui/flex';
	import { KRadio } from '@ikun-ui/radio';
	import { KRadioGroup } from '@ikun-ui/radio-group';
	let value = '1';
	let vertical = false;
	const handleUpdated = (e) => {
		value = e.detail;
		vertical = value === '2';
	};
</script>

<KRadioGroup {value} on:updateValue={handleUpdated}>
	<KRadio uid="1">horizontal</KRadio>
	<KRadio uid="2">vertical</KRadio>
</KRadioGroup>

<KFlex {vertical}>
	<div class="m-2 rounded w-1/4 h-36px bg-orange-200" />
	<div class="m-2 rounded w-1/4 h-36px bg-orange-100" />
	<div class="m-2 rounded w-1/4 h-36px bg-orange-200" />
	<div class="m-2 rounded w-1/4 h-36px bg-orange-100" />
</KFlex>
