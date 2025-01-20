<script lang="ts">
	import { KMenu, KMenuItem } from '@ikun-ui/menu';
	import type { SubMenuType } from '@ikun-ui/menu';
	import { KButton } from '@ikun-ui/button';
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

	let isCollapsed: boolean = false;
	let icn = 'i-carbon-side-panel-close-filled';
	let w = '300px';
	const handleClick = () => {
		isCollapsed = !isCollapsed;
		w = isCollapsed ? '60px' : '300px';
		icn = !isCollapsed ? 'i-carbon-side-panel-close-filled' : 'i-carbon-side-panel-open-filled';
	};
</script>

<KButton icon={icn} size="lg" on:click={handleClick} type="primary" cls="my-2" />

<div style:width={w} style:transition="width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)">
	<KMenu mode="vertical" inlineCollapsed={isCollapsed} ctxKey="vertical">
		<KMenuItem {items} ctxKey="vertical" />
	</KMenu>
</div>
