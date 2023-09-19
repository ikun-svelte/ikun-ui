<script>
	import { KContextmenu, KContextmenuItem } from '@ikun-ui/contextmenu';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	const handleChange = () => {
		dispatch('change');
	};
</script>

<div class="flex justify-center items-center w-full h-30vh bg-green-100">
	<KContextmenu on:change={handleChange}>
		<KContextmenuItem>options 1</KContextmenuItem>
		<KContextmenuItem divider>options 2</KContextmenuItem>
		<KContextmenuItem>options 3</KContextmenuItem>
	</KContextmenu>
</div>
