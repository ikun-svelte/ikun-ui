<script>
	import { KRadio } from '@ikun-ui/radio';
	import { KRadioGroup } from '@ikun-ui/radio-group';

	let value = '2';
	let disabled = false;
	const handleUpdated = (e) => {
		value = e.detail;
	};
</script>

<div class="h-full" style="width: 600px">
	<KRadioGroup {value} on:updateValue={handleUpdated} {disabled}>
		<KRadio uid="1">1</KRadio>
		<KRadio uid="2">2</KRadio>
		<KRadio uid="3">3</KRadio>
	</KRadioGroup>
</div>
