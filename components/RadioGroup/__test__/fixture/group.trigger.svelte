<script>
	import { KRadio } from '@ikun-ui/radio';
	import { KRadioGroup } from '@ikun-ui/radio-group';
	let value = '3';
	const handleUpdated = (e) => {
		value = e.detail;
	};
</script>

<div class="h-full" style="width: 600px">
	<div id="group_trigger_value">{value}</div>
	<KRadioGroup {value} on:updateValue={handleUpdated}>
		<KRadio uid="1">1</KRadio>
		<KRadio uid="2">2</KRadio>
		<KRadio uid="3">3</KRadio>
	</KRadioGroup>
</div>
