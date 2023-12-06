<script lang="ts">
	import { KButton } from '@ikun-ui/button';
	import { KDropdown, DropdownItem } from '@ikun-ui/dropdown';

	let dorpdownRef: any = null;
	const handleShow = (v: boolean) => {
		if (v) {
			dorpdownRef.handleOpen();
		} else {
			dorpdownRef.handleClose();
		}
	};
</script>

<KDropdown bind:this={dorpdownRef} trigger="manual">
	<KButton suffixIcon="i-carbon-chevron-down" id="KDropdown_id" type="primary"
		>Dropdown List</KButton
	>
	<div slot="dropdown">
		<DropdownItem command="白发三千丈">白发三千丈</DropdownItem>
	</div>
</KDropdown>
<button data-testid="handle_close" id="handle_close" on:click={() => handleShow(false)}>open</button
>
<button data-testid="handle_open" id="handle_close" on:click={() => handleShow(true)}>open</button>
