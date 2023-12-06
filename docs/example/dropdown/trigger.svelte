<script lang="ts">
	import { KButton } from '@ikun-ui/button';
	import { KDropdown, DropdownItem } from '@ikun-ui/dropdown';
</script>

<div class="flex demon-dropdown">
	<KDropdown>
		<KButton suffixIcon="i-carbon-chevron-down" type="success">Dropdown</KButton>
		<div slot="dropdown">
			<DropdownItem command="秋浦歌" cls="text-center">秋浦歌</DropdownItem>
			<DropdownItem divider>divider</DropdownItem>
			<DropdownItem command="白发三千丈">白发三千丈</DropdownItem>
			<DropdownItem command="缘愁似个长">缘愁似个长</DropdownItem>
			<DropdownItem command="不知明镜里">不知明镜里</DropdownItem>
			<DropdownItem command="何处得秋霜">何处得秋霜</DropdownItem>
		</div>
	</KDropdown>
	<KDropdown cls="mx-2" trigger="click">
		<KButton suffixIcon="i-carbon-chevron-down" type="warning">Dropdown</KButton>
		<div slot="dropdown">
			<DropdownItem command="秋浦歌" cls="text-center">秋浦歌</DropdownItem>
			<DropdownItem divider>divider</DropdownItem>
			<DropdownItem command="白发三千丈">白发三千丈</DropdownItem>
			<DropdownItem command="缘愁似个长">缘愁似个长</DropdownItem>
			<DropdownItem command="不知明镜里">不知明镜里</DropdownItem>
			<DropdownItem command="何处得秋霜">何处得秋霜</DropdownItem>
		</div>
	</KDropdown>

	<KDropdown trigger="manual">
		<KButton suffixIcon="i-carbon-chevron-down" type="error">Dropdown manual</KButton>
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
