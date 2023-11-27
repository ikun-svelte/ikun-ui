<script>
	import { KDrawer } from '@ikun-ui/drawer';
	import { KButton } from '@ikun-ui/button';
	let show = false;
	const open = () => (show = true);
	const close = () => (show = false);
</script>

<KButton on:click={open}>open the drawer</KButton>
<KDrawer value={show} target={document.body} on:close={close}>
	<div class="w-full fc">
		<h2 class="w-300px text-center !my-2">
			A person's loneliness, never had the lonely mood is wrapped by this dark night.
		</h2>
	</div>
</KDrawer>
