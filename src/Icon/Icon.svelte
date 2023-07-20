<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let icon: string;
	export let isButton: boolean = false;
	export let width = '24px';
	export let height = '24px';
	export let customClass = '';
	export let color = '';
	export let colorCls = 'text-muted dark:text-white';
	export let attrs = {};

	$: colorStyle = color ? `color: ${color}` : '';
	$: iconInner = icon;

	const dispatch = createEventDispatcher();
	const handleClick = (e) => {
		dispatch('click', e);
	};
</script>

<div
	class="ui-icon flex-c {isButton ? 'cursor-pointer' : ''} {customClass}"
	{...attrs}
	on:click={handleClick}
>
	<div
		class="{iconInner} collapse--icon__transition {colorCls}"
		style="width: {width}; height:{height}; {colorStyle} "
	/>
</div>

<style>
	.collapse--icon__transition {
		transition: all 0.3s linear;
	}
</style>
