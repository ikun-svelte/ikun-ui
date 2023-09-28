<script>
	import { KCheckboxGroup } from '@ikun-ui/checkbox-group';
	import { KCheckbox } from '@ikun-ui/checkbox';

	let value = false;
	function updateValue(e) {
		value = e.detail;
	}

	let groupValue;
	function updateGroupValue(e) {
		groupValue = e.detail;
	}
</script>

<div class="fi">
	<KCheckbox cls="mr4" {value} size="lg" on:updateValue={updateValue}>lg checkbox</KCheckbox>
	<KCheckbox cls="mr4" {value} size="md" on:updateValue={updateValue}>md checkbox</KCheckbox>
	<KCheckbox cls="mr4" {value} size="sm" on:updateValue={updateValue}>sm checkbox</KCheckbox>
</div>

<KCheckboxGroup value={groupValue} size="lg" on:updateValue={updateGroupValue}>
	<KCheckbox cls="mr4" uid={1}>option 1</KCheckbox>
	<KCheckbox cls="mr4" uid={2}>option 2</KCheckbox>
</KCheckboxGroup>

<KCheckboxGroup value={groupValue} size="md" on:updateValue={updateGroupValue}>
	<KCheckbox cls="mr4" uid={1}>option 1</KCheckbox>
	<KCheckbox cls="mr4" uid={2}>option 2</KCheckbox>
</KCheckboxGroup>

<KCheckboxGroup value={groupValue} size="sm" on:updateValue={updateGroupValue}>
	<KCheckbox cls="mr4" uid={1}>option 1</KCheckbox>
	<KCheckbox cls="mr4" uid={2}>option 2</KCheckbox>
</KCheckboxGroup>
