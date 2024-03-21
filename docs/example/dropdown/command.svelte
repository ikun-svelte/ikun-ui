<script lang="ts">
	import { KButton } from '@ikun-ui/button';
	import { KDropdown, KDropdownItem } from '@ikun-ui/dropdown';
	import { KMessage } from '@ikun-ui/message';
	import { KIcon } from '@ikun-ui/icon';
	import { KLink } from '@ikun-ui/link';
	const handleChange = (value: CustomEvent) => {
		KMessage({
			content: value.detail,
			type: 'info'
		});
	};
</script>

<div class="flex demon-dropdown">
	<KDropdown on:command={handleChange}>
		<KButton suffixIcon="i-carbon-chevron-down" type="primary">Dropdown List</KButton>
		<div slot="dropdown">
			<KDropdownItem command="秋浦歌" cls="text-center">秋浦歌</KDropdownItem>
			<KDropdownItem divider>divider</KDropdownItem>
			<KDropdownItem command="白发三千丈">白发三千丈</KDropdownItem>
			<KDropdownItem command="缘愁似个长">缘愁似个长</KDropdownItem>
			<KDropdownItem command="不知明镜里">不知明镜里</KDropdownItem>
			<KDropdownItem command="何处得秋霜">何处得秋霜</KDropdownItem>
		</div>
	</KDropdown>

	<KDropdown on:command={handleChange} cls="mx-2">
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
