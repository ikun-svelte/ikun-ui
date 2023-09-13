<script>
	import { KCheckbox } from '@ikun-ui/checkbox';
	import { KCheckboxGroup } from '@ikun-ui/checkbox-group';
	let value = ['1', '2', '4'];
	const handleUpdated = (e) => {
		value = e.detail;
	};
</script>

<KCheckboxGroup {value} on:updateValue={handleUpdated}>
	<KCheckbox uid="1">KCheckbox 1</KCheckbox>
	<KCheckbox uid="2">KCheckbox 2</KCheckbox>
	<KCheckbox uid="3">KCheckbox 3</KCheckbox>
	<KCheckbox uid="4" disabled>KCheckbox 4</KCheckbox>
</KCheckboxGroup>
<p>value: {value}</p>
