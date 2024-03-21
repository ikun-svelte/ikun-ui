<script lang="ts">
	import { KButton } from '@ikun-ui/button';
	import { KDropdown, KDropdownItem } from '@ikun-ui/dropdown';
	import { KIcon } from '@ikun-ui/icon';
	import { KLink } from '@ikun-ui/link';
	let dorpdownRef: any = null;
	const handleShow = (v) => {
		if (v) {
			dorpdownRef.handleOpen();
		} else {
			dorpdownRef.handleClose();
		}
	};
</script>

<div class="flex demon-dropdown">
	<KButton on:click={() => handleShow(true)} type="primary">open</KButton>
	<KButton on:click={() => handleShow(false)} type="info">close</KButton>
	<KDropdown cls="mx-2" bind:this={dorpdownRef} trigger="manual">
		<KLink type="primary" underline={false}>
			Dropdown List
			<KIcon icon="i-carbon-chevron-down" width="auto" height="auto" slot="icon" color="initial"
			></KIcon>
		</KLink>
		<div slot="dropdown">
			<KDropdownItem command="秋浦歌" cls="text-center">秋浦歌</KDropdownItem>
			<KDropdownItem divider>divider</KDropdownItem>
			<KDropdownItem command="白发三千丈">白发三千丈</KDropdownItem>
			<KDropdownItem command="缘愁似个长">缘愁似个长</KDropdownItem>
			<KDropdownItem command="不知明镜里">不知明镜里</KDropdownItem>
			<KDropdownItem command="何处得秋霜">何处得秋霜</KDropdownItem>
		</div>
	</KDropdown>
</div>
