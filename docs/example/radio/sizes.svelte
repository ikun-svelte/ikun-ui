<script>
	import { KRadioGroup } from '@ikun-ui/radio-group';
	import { KRadio } from '@ikun-ui/radio';

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
	<KRadio cls="mr4" {value} size="lg" on:updateValue={updateValue}>lg radio</KRadio>
	<KRadio cls="mr4" {value} size="md" on:updateValue={updateValue}>md radio</KRadio>
	<KRadio cls="mr4" {value} size="sm" on:updateValue={updateValue}>sm radio</KRadio>
</div>

<KRadioGroup value={groupValue} size="lg" on:updateValue={updateGroupValue}>
	<KRadio cls="mr4" uid={1}>option 1</KRadio>
	<KRadio cls="mr4" uid={2}>option 2</KRadio>
</KRadioGroup>

<KRadioGroup value={groupValue} size="md" on:updateValue={updateGroupValue}>
	<KRadio cls="mr4" uid={1}>option 1</KRadio>
	<KRadio cls="mr4" uid={2}>option 2</KRadio>
</KRadioGroup>

<KRadioGroup value={groupValue} size="sm" on:updateValue={updateGroupValue}>
	<KRadio cls="mr4" uid={1}>option 1</KRadio>
	<KRadio cls="mr4" uid={2}>option 2</KRadio>
</KRadioGroup>
