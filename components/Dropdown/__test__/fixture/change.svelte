<script lang="ts">
	import { KButton } from '@ikun-ui/button';
	import { KDropdown, KDropdownItem } from '@ikun-ui/dropdown';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	const handleChange = (v: CustomEvent) => {
		dispatch('change', v.detail);
	};
</script>

<KDropdown on:change={handleChange} trigger="click">
	<KButton suffixIcon="i-carbon-chevron-down" id="KDropdown_id" type="primary"
		>Dropdown List</KButton
	>
	<div slot="dropdown">
		<KDropdownItem command="白发三千丈">白发三千丈</KDropdownItem>
	</div>
</KDropdown>
