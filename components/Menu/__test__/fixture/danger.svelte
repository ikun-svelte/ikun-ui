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
					icon: 'i-carbon-logo-vue',
					children: [
						{
							label: 'Option 1',
							title: 'Option 1',
							uid: 'setting:1',
							popupClassName: 'ikun-test',
							disabled: false,
							icon: 'i-carbon-logo-vue',
							children: [
								{
									label: 'Option 3333 Option 3333 Option 3333',
									title: 'Option 3333',
									icon: 'i-carbon-logo-vue',
									popupClassName: 'ikun-test',
									uid: 'setting:3333',
									danger: true
								}
							]
						},
						{
							label: 'Navigation Four-dv',
							icon: 'i-carbon-logo-react',
							type: 'divider',
							popupClassName: 'ikun-test',
							uid: 'alipay-dv',
							danger: true
						},
						{
							label: 'Option 2',
							popupClassName: 'ikun-test',
							danger: true,
							uid: 'setting:2'
						}
					]
				},
				{
					label: 'Item 2',
					uid: 'asdqqda',
					disabled: true,
					popupClassName: 'ikun-test',
					icon: 'i-carbon-logo-vue',
					danger: true,
					children: [
						{
							label: 'Option 3',
							popupClassName: 'ikun-test',
							uid: 'setting:3'
						},
						{
							label: 'Option 4',
							popupClassName: 'ikun-test',
							danger: true,
							uid: 'setting:4'
						}
					]
				}
			]
		}
	];

	let triggerTime = 0;
	let res: any = {};
	const handleClick = (item: CustomEvent) => {
		res = item.detail;
		triggerTime = triggerTime + 1;
	};
</script>

<div class="w-full fsc">
	<KMenu
		mode="vertical"
		id="danger_test_vertical"
		triggerSubMenuAction="click"
		on:select={handleClick}
		on:deSelect={handleClick}
		multiple
		ctxKey="11"
	>
		<KMenuItem {items} ctxKey="11" />
	</KMenu>
	<KMenu
		mode="inline"
		on:select={handleClick}
		on:deSelect={handleClick}
		id="danger_test_inline"
		triggerSubMenuAction="click"
		ctxKey="22"
	>
		<KMenuItem {items} ctxKey="22" />
	</KMenu>
	<KMenu
		mode="horizontal"
		on:select={handleClick}
		on:deSelect={handleClick}
		id="danger_test_horizontal"
		triggerSubMenuAction="click"
		ctxKey="22"
	>
		<KMenuItem {items} ctxKey="22" />
	</KMenu>
	<div id="trigger_time">{triggerTime}</div>
	<div>{JSON.stringify(res.selectedUidPaths)}</div>
</div>
