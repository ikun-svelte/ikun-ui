<script lang="ts">
	import { KDropdown, DropdownItem } from '@ikun-ui/dropdown';
	import { KIcon } from '@ikun-ui/icon';
	import { KLink } from '@ikun-ui/link';
</script>

<div class="flex demon-dropdown">
	<KDropdown>
		<KLink type="primary" underline={false}>
			Dropdown List
			<KIcon icon="i-carbon-chevron-down" width="auto" height="auto" slot="icon" color="initial"
			></KIcon>
		</KLink>
		<div slot="dropdown">
			<DropdownItem command="秋浦歌" cls="text-center">秋浦歌</DropdownItem>
			<DropdownItem divider>divider</DropdownItem>
			<DropdownItem command="白发三千丈">白发三千丈</DropdownItem>
			<DropdownItem command="缘愁似个长">缘愁似个长</DropdownItem>
			<DropdownItem command="不知明镜里">不知明镜里</DropdownItem>
			<DropdownItem command="何处得秋霜">何处得秋霜</DropdownItem>
		</div>
	</KDropdown>
	<KDropdown cls="mx-2" trigger="click" hideOnClick={false}>
		<KLink underline={false}>
			Dropdown List
			<KIcon icon="i-carbon-chevron-down" width="auto" height="auto" slot="icon" color="initial"
			></KIcon>
		</KLink>
		<div slot="dropdown">
			<DropdownItem command="秋浦歌" cls="text-center">秋浦歌</DropdownItem>
			<DropdownItem divider>divider</DropdownItem>
			<DropdownItem command="白发三千丈">白发三千丈</DropdownItem>
			<DropdownItem command="缘愁似个长">缘愁似个长</DropdownItem>
			<DropdownItem command="不知明镜里">不知明镜里</DropdownItem>
			<DropdownItem command="何处得秋霜">何处得秋霜</DropdownItem>
		</div>
	</KDropdown>
</div>
