<script>
	import { KContextmenu, KContextmenuItem, KContextmenuSubMenu } from '@ikun-ui/contextmenu';
</script>

<div class="flex justify-center items-center w-full h-30vh ikun:50:bg-ikun-main">
	right click on me 🏀
	<KContextmenu>
		<KContextmenuItem>We were both young</KContextmenuItem>
		<KContextmenuItem divider></KContextmenuItem>
		<KContextmenuItem disabled>When I first saw you</KContextmenuItem>
		<KContextmenuItem>I closed my eyes</KContextmenuItem>
		<KContextmenuSubMenu title="Author">
			<KContextmenuItem>Taylor Swift</KContextmenuItem>
		</KContextmenuSubMenu>
	</KContextmenu>
</div>
