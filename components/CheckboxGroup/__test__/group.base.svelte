<script>
	import 'virtual:uno.css';
	import { KCheckbox } from '@ikun-ui/checkbox';
	import { KCheckboxGroup } from '@ikun-ui/checkbox-group';

	let value = ['3'];
	let disabled = false;
	const handleUpdated = (e) => {
		value = e.detail;
	};
	const handleChange = () => {
		value = ['1'];
	};
</script>

<div class="h-full" style="width: 600px">
	{value}
	<div
		on:click={() => {
			disabled = !disabled;
		}}
	>
		disabled
	</div>
	<div on:click={handleChange}>change</div>
	<KCheckboxGroup {value} on:updateValue={handleUpdated} {disabled}>
		<KCheckbox uid="1">1</KCheckbox>
		<KCheckbox uid="2">2</KCheckbox>
		<KCheckbox uid="3">3</KCheckbox>
	</KCheckboxGroup>
</div>
