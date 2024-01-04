<script lang="ts">
	import { KFlex } from '@ikun-ui/flex';
	import { KRadio } from '@ikun-ui/radio';
	import { KRadioGroup } from '@ikun-ui/radio-group';
	import type { KFlexProps } from '@ikun-ui/flex/src/types';
	let justifyValue: KFlexProps['justify'] = 'start';
	const handleSelectJustify = (e) => {
		justifyValue = e.detail;
	};
	let alignValue: KFlexProps['align'] = 'start';
	const handleSelectAlign = (e) => {
		alignValue = e.detail;
	};
</script>

<KFlex gap="md" align="start" vertical cls="w-full">
	<span>Select justify :</span>
	<KRadioGroup value={justifyValue} on:updateValue={handleSelectJustify}>
		<KRadio uid="start">start</KRadio>
		<KRadio uid="end">end</KRadio>
		<KRadio uid="center">center</KRadio>
		<KRadio uid="between">between</KRadio>
		<KRadio uid="around">around</KRadio>
		<KRadio uid="evenly">evenly</KRadio>
	</KRadioGroup>
	<span>Select align :</span>
	<KRadioGroup value={alignValue} on:updateValue={handleSelectAlign}>
		<KRadio uid="start">start</KRadio>
		<KRadio uid="center">center</KRadio>
		<KRadio uid="end">end</KRadio>
	</KRadioGroup>
	<KFlex
		cls="w-full rounded h-200px border-solid border-1 border-ikun-main"
		justify={justifyValue}
		align={alignValue}
	>
		<div class="rounded w-100px h-36px bg-orange-200" />
		<div class="rounded w-100px h-36px bg-orange-100" />
		<div class="rounded w-100px h-36px bg-orange-200" />
		<div class="rounded w-100px h-36px bg-orange-100" />
	</KFlex>
</KFlex>
