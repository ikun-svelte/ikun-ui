<script lang="ts">
	import { KMenu, KMenuItem } from '@ikun-ui/menu';
	import { KSwitch } from '@ikun-ui/switch';
	import type { SubMenuType } from '@ikun-ui/menu';
	const items: SubMenuType[] = [
		{
			label: 'Navigation One',
			uid: 'mail',
			icon: 'i-carbon-email'
		},
		{
			label: 'Navigation Two',
			uid: 'app',
			disabled: true,
			icon: 'i-carbon-apps'
		},
		{
			label: 'Navigation Three - Submenu',
			uid: 'SubMenu',
			icon: 'i-carbon-cloud-satellite-config',
			children: [
				{
					type: 'group',
					uid: 'SubMenu Item 1',
					label: 'Item 1',
					children: [
						{ label: 'Option 1', uid: 'setting:1-g', disabled: true },
						{ label: 'Option 2', uid: 'setting:2-g' },
						{
							label: 'Option 3',
							uid: 'setting:3-g',
							children: [
								{ label: 'Option 3 - c1', uid: 'etting:3c1' },
								{ label: 'Option 3 - c2', uid: 'etting:3c2' }
							]
						}
					]
				},
				{
					type: 'group',
					label: 'Item 2',
					uid: 'SubMenu Item 2',
					children: [
						{
							label: 'Option 4',
							uid: 'setting:3',
							children: [
								{ label: 'Option 4 - c1', uid: 'etting:4c1' },
								{ label: 'Option 4 - c2', uid: 'etting:4c2' }
							]
						},
						{ label: 'Option 5 Item 2', uid: 'setting:5' }
					]
				}
			]
		},
		{
			uid: 'alipay',
			label: 'Navigation Four'
		}
	];
	let theme = 'dark';
	const handleClick = (item: CustomEvent) => {
		theme = item.detail;
	};
</script>

<KSwitch value={theme} checkedValue="dark" unCheckedValue="light" on:updateValue={handleClick}>
	<span slot="unCheckedRender" class="mr-3px">{theme}</span>
	<span slot="checkedRender" class="mr-22px">{theme}</span>
</KSwitch>
<div style:width={'300px'} class="my-2">
	<KMenu mode="inline" ctxKey="inline" {theme}>
		<KMenuItem {items} ctxKey="inline" />
	</KMenu>
</div>
