<script>
	import { KRadio } from '@ikun-ui/radio';
	import { KRadioGroup } from '@ikun-ui/radio-group';
	let value = '2';
	const handleUpdated = (e) => {
		value = e.detail;
	};
</script>

<KRadioGroup {value} on:updateValue={handleUpdated}>
	<KRadio uid="1">KRadio 1</KRadio>
	<KRadio uid="2">KRadio 2</KRadio>
	<KRadio uid="3">KRadio 3</KRadio>
	<KRadio uid="4" disabled>KRadio 4</KRadio>
</KRadioGroup>
<p>value: {value}</p>
