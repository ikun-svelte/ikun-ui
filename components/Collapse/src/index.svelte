<script lang="ts">
	import { fly } from 'svelte/transition';
	import { KIcon } from '@ikun-ui/icon';
	import { createEventDispatcher } from 'svelte';
	import { clsx, type ClassValue } from 'clsx';

	export let title = '';
	export let content = '';
	export let attrs = {};
	export let cls: ClassValue = '';
	export let show = false;

	$: cnames = clsx(cls);
	const dispatch = createEventDispatcher();
	let showInner = show;
	const showContent = () => {
		showInner = !showInner;
		dispatch('change', showInner);
	};
	$: if (show) showInner = true;
	else showInner = false;
</script>

<div class="k-collapse--base k-collapse--base__dark {cnames}" {...attrs}>
	<div class="k-collapse--title k-collapse--title__dark" on:click={showContent} aria-hidden="true">
		<slot name="title">
			{title}
		</slot>
		<KIcon icon="i-carbon-chevron-right {showInner ? 'rotate-90' : ''}" />
	</div>
	{#if showInner}
		<div
			class="k-collapse--content"
			out:fly={{ y: 0, duration: 300 }}
			in:fly={{ y: -60, duration: 300 }}
		>
			<div class="k-collapse--line" />
			<slot name="content">{content}</slot>
		</div>
	{/if}
</div>
