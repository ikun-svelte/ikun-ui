<script>
	import { KInfinite } from '@ikun-ui/infinite';
	import Ikun from './ikun.svelte';
	let list = ['🏀', '🏀', '🏀', '🏀', '🏀', '🏀', '🏀', '🏀', '🏀', '🏀'];
	const handleLoad = () => {
		list = list.concat(list);
	};
</script>

<KInfinite class="h-300px overflow-y-auto w-full px-2" threshold={100} on:loadMore={handleLoad}>
	{#each list as item, index}
		<p class="rounded ikun:50:bg-ikun-main w-full h-65px fcc">
			{item}
			{index}
			<Ikun></Ikun>
		</p>
	{/each}
</KInfinite>
