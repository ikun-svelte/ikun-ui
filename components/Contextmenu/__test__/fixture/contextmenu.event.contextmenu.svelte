<script>
	import { KContextmenu, KContextmenuItem } from '@ikun-ui/contextmenu';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	const handleContextmenu = () => {
		dispatch('contextmenu');
	};
</script>

<div class="flex justify-center items-center w-full h-30vh bg-green-100">
	<KContextmenu on:contextmenu={handleContextmenu}>
		<KContextmenuItem>options 1</KContextmenuItem>
		<KContextmenuItem divider>options 2</KContextmenuItem>
		<KContextmenuItem>options 3</KContextmenuItem>
	</KContextmenu>
</div>
