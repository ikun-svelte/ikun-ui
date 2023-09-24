<script lang="ts">
	import 'virtual:uno.css';
	import { KCheckbox } from '@ikun-ui/checkbox';
	import { KCheckboxGroup } from '@ikun-ui/checkbox-group';

	let status: string[] = ['l1'];
	let isAll = false;
	let indeterminate = true;
	const handleStatus = (e: CustomEvent) => {
		status = e.detail;
		if (status.length === 3) {
			isAll = true;
			indeterminate = false;
		} else if (status.length === 0) {
			isAll = false;
			indeterminate = false;
		} else {
			indeterminate = true;
			isAll = false;
		}
	};

	const handleCheckAll = (e: CustomEvent) => {
		isAll = e.detail;
		if (isAll) {
			status = ['l1', 'l2', 'l3'];
		} else {
			status = [];
		}
	};
</script>

<KCheckbox value={isAll} on:updateValue={handleCheckAll} {indeterminate}>check all</KCheckbox>
<KCheckboxGroup value={status} on:updateValue={handleStatus}>
	<KCheckbox label="KCheckbox 1" uid="l1"></KCheckbox>
	<KCheckbox label="KCheckbox 2" uid="l2"></KCheckbox>
	<KCheckbox label="KCheckbox 3" uid="l3"></KCheckbox>
</KCheckboxGroup>
