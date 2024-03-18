<script lang="ts">
	import { KButton } from '@ikun-ui/button';
	import { KDropdown, KDropdownItem } from '@ikun-ui/dropdown';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	const handleCommand = (v: CustomEvent) => {
		dispatch('command', v.detail);
	};
</script>

<KDropdown on:command={handleCommand} trigger="click">
	<KButton suffixIcon="i-carbon-chevron-down" id="KDropdown_id" type="primary"
		>Dropdown List</KButton
	>
	<div slot="dropdown">
		<KDropdownItem command="白发三千丈">白发三千丈</KDropdownItem>
	</div>
</KDropdown>
