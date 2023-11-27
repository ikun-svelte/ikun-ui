<script>
	import { KContextmenu, KContextmenuItem, KContextmenuSubMenu } from '@ikun-ui/contextmenu';
</script>

<div class="flex justify-center items-center w-full h-30vh bg-green-100">
	<KContextmenu>
		<KContextmenuItem>options 1</KContextmenuItem>
		<KContextmenuItem divider>options 2</KContextmenuItem>
		<KContextmenuItem>options 3</KContextmenuItem>
		<KContextmenuSubMenu title="contextmenu-sub-title">
			<KContextmenuItem>options 4</KContextmenuItem>
		</KContextmenuSubMenu>
	</KContextmenu>
</div>
