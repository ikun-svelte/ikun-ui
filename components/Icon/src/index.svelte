<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { clsx, type ClassValue } from 'clsx';

	export let icon: string;
	export let btn = false;
	export let width = '24px';
	export let height = '24px';
	export let color = '';
	export let attrs: Record<string, string> = {};
	export let cls: ClassValue = undefined;

	const dispatch = createEventDispatcher();
	const handleClick = (e: Event) => {
		dispatch('click', e);
	};
</script>

<div
	role={btn ? 'button' : undefined}
	aria-hidden="true"
	class={clsx(cls, ['k-icon--base k-icon--base__dark'], {
		'cursor-pointer': btn
	})}
	on:click={handleClick}
	{...attrs}
>
	<div class={clsx(icon, color, ['k-icon-transition'])} style:width style:height />
</div>
