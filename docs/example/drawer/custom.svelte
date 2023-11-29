<script>
	import { KIcon } from '@ikun-ui/icon';
	import { KDrawer } from '@ikun-ui/drawer';
	import { KButton } from '@ikun-ui/button';
	let show = false;
	const open = () => (show = true);
	const close = () => (show = false);
</script>

<KButton on:click={open}>open the drawer(custom)</KButton>
<KDrawer footer value={show} target={document.body} on:close={close}>
	<span class="flex" slot="header">
		<div>
			<KIcon
				icon="i-carbon-close"
				on:click={() => (show = false)}
				btn
				color="k-drawer--header--icon__hover"
			/>
		</div>
		<div class="pl-12px">真正的ikun：提高爱豆知名度</div>
	</span>
	<div class="w-full fc">
		<h2 class="w-300px">
			作为一名ikun真的已经麻木了 ，解释没有用， 你去反驳得到的只会是一堆表情包，
			根本没人会站在你这边。这个世界充满恶意，坤坤到底怎么得罪你们了，为什么要这样对侍他，希望坤坤早点离开这个充满恶意的世界。热爱无罪，不爱也请不要诋毁！
		</h2>
	</div>
</KDrawer>
