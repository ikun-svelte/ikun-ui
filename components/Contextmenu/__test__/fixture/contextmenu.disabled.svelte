<script>
	import { KContextmenu, KContextmenuItem, KContextmenuSubMenu } from '@ikun-ui/contextmenu';
</script>

<div class="flex justify-center items-center w-full h-30vh bg-green-100">
	<KContextmenu disabled>
		<KContextmenuItem>options 1</KContextmenuItem>
		<KContextmenuItem disabled>options 2</KContextmenuItem>
		<KContextmenuItem divider></KContextmenuItem>
		<KContextmenuItem>options 3</KContextmenuItem>
		<KContextmenuSubMenu title="options 4" disabled>
			<KContextmenuItem disabled>options 4 - 1</KContextmenuItem>
		</KContextmenuSubMenu>
	</KContextmenu>
</div>
