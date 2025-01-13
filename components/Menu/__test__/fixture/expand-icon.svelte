<script lang="ts">
	import { KMenu, KMenuItem } from '@ikun-ui/menu';
	import type { SubMenuType } from '@ikun-ui/menu';
	let items: SubMenuType[] = [
		{
			label: 'Navigation Three - Su',
			title: 'Navigation Three - Su',
			uid: 'SubMenu',
			popupClassName: 'ikun-test',
			icon: 'i-carbon-logo-vue',
			children: [
				{
					type: 'group',
					label: 'Item 1',
					title: 'Item 1',
					popupClassName: 'ikun-test',
					uid: 'asda',
					// icon: 'i-carbon-logo-vue',
					children: [
						{
							label: 'Option 1',
							title: 'Option 1',
							uid: 'setting:1',
							popupClassName: 'ikun-test',
							disabled: false,
							// icon: 'i-carbon-logo-vue',
							children: [
								{
									label: 'Option 3333 Option 3333 Option 3333',
									title: 'Option 3333',
									icon: 'i-carbon-logo-vue',
									popupClassName: 'ikun-test',
									uid: 'setting:3333'
								}
							]
						},
						{
							label: 'Navigation Four-dv',
							// icon: 'i-carbon-logo-react',
							type: 'divider',
							popupClassName: 'ikun-test',
							uid: 'alipay-dv'
						},
						{
							label: 'Option 2',
							popupClassName: 'ikun-test',
							uid: 'setting:2'
						}
					]
				},
				{
					label: 'Item 2',
					uid: 'asdqqda',
					disabled: true,
					popupClassName: 'ikun-test',
					// icon: 'i-carbon-logo-vue',
					children: [
						{
							label: 'Option 3',
							popupClassName: 'ikun-test',
							uid: 'setting:3'
						},
						{
							label: 'Option 4',
							popupClassName: 'ikun-test',
							uid: 'setting:4'
						}
					]
				}
			]
		}
	];
</script>

<div class="w-full fsc">
	<KMenu
		mode="vertical"
		id="expand_icon_test_vertical"
		expandIcon="i-carbon-logo-react"
		triggerSubMenuAction="click"
		ctxKey="11"
	>
		<KMenuItem {items} ctxKey="11" />
	</KMenu>
	<KMenu
		mode="inline"
		id="expand_icon_test_inline"
		expandIcon="i-carbon-logo-react"
		triggerSubMenuAction="click"
		ctxKey="22"
	>
		<KMenuItem {items} ctxKey="22" />
	</KMenu>
	<KMenu
		mode="horizontal"
		id="expand_icon_test_horizontal"
		expandIcon="i-carbon-logo-react"
		triggerSubMenuAction="click"
		ctxKey="33"
	>
		<KMenuItem {items} ctxKey="33" />
	</KMenu>
</div>
