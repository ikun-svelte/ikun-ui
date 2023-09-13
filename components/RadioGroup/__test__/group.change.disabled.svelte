<script>
	import { KRadio } from '@ikun-ui/radio';
	import { KRadioGroup } from '@ikun-ui/radio-group';
	let value = '3';
	let disabled = true;
	const handleUpdated = (e) => {
		value = e.detail;
	};
</script>

<div class="h-full" style="width: 600px">
	<button id="group_change_disabled_btn" on:click={() => (value = [1])}></button>
	<KRadioGroup {value} on:updateValue={handleUpdated} {disabled}>
		<KRadio uid="1">1</KRadio>
		<KRadio uid="2">2</KRadio>
		<KRadio uid="3">3</KRadio>
	</KRadioGroup>
</div>
