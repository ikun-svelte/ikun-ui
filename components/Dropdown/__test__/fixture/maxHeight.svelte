<script lang="ts">
	import { KButton } from '@ikun-ui/button';
	import { KDropdown, DropdownItem } from '@ikun-ui/dropdown';
</script>

<KDropdown maxHeight="10px" trigger="click">
	<KButton suffixIcon="i-carbon-chevron-down" id="KDropdown_id" type="primary"
		>Dropdown List</KButton
	>
	<div slot="dropdown">
		<DropdownItem command="白发三千丈">白发三千丈</DropdownItem>
	</div>
</KDropdown>
