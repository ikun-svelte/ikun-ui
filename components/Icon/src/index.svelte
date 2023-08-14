<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let icon: string = ''
	export let btn = false;
	export let width = '24px';
	export let height = '24px';
	export let color = '';
	export let attrs = {};
	export let cls = '';

	$: iconInner = icon;
	$: tag = btn ? 'button' : '';
	const dispatch = createEventDispatcher();
	const handleClick = (e:Event) => {
		dispatch('click', e);
	};
</script>

<div
	role={tag}
	aria-hidden="true"
	{...attrs}
	class="k-icon--base k-icon--base__dark {btn ? 'cursor-pointer' : ''} {cls}"
	on:click={handleClick}>
	<div class="{iconInner} k-icon-transition {color}"
		 style="
		 width: {width}; height:{height};"
	/>
</div>
