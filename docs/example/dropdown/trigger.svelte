<script lang="ts">
	import { KButton } from '@ikun-ui/button';
	import { KDropdown, KDropdownItem } from '@ikun-ui/dropdown';
</script>

<div class="flex demon-dropdown">
	<KDropdown>
		<KButton suffixIcon="i-carbon-chevron-down" type="success">Dropdown</KButton>
		<div slot="dropdown">
			<KDropdownItem command="秋浦歌" cls="text-center">秋浦歌</KDropdownItem>
			<KDropdownItem divider>divider</KDropdownItem>
			<KDropdownItem command="白发三千丈">白发三千丈</KDropdownItem>
			<KDropdownItem command="缘愁似个长">缘愁似个长</KDropdownItem>
			<KDropdownItem command="不知明镜里">不知明镜里</KDropdownItem>
			<KDropdownItem command="何处得秋霜">何处得秋霜</KDropdownItem>
		</div>
	</KDropdown>
	<KDropdown cls="mx-2" trigger="click">
		<KButton suffixIcon="i-carbon-chevron-down" type="warning">Dropdown</KButton>
		<div slot="dropdown">
			<KDropdownItem command="秋浦歌" cls="text-center">秋浦歌</KDropdownItem>
			<KDropdownItem divider>divider</KDropdownItem>
			<KDropdownItem command="白发三千丈">白发三千丈</KDropdownItem>
			<KDropdownItem command="缘愁似个长">缘愁似个长</KDropdownItem>
			<KDropdownItem command="不知明镜里">不知明镜里</KDropdownItem>
			<KDropdownItem command="何处得秋霜">何处得秋霜</KDropdownItem>
		</div>
	</KDropdown>

	<KDropdown trigger="manual">
		<KButton suffixIcon="i-carbon-chevron-down" type="error">Dropdown manual</KButton>
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
