<script lang="ts">
	import { fly } from 'svelte/transition';
	import { KIcon } from '@ikun-ui/icon';
	import { createEventDispatcher } from 'svelte';
	export let title = '';
	export let content = '';
	export let customClass = '';
	export let show = false;

	const dispatch = createEventDispatcher();
	let showInner = show;
	const showContent = () => {
		showInner = !showInner;
		dispatch('updateModelValue', showInner);
	};
	$: if (show) showInner = true;
	else showInner = false;
</script>

<div class="rounded border-c border border-solid {customClass}">
	<div class="p4 flex justify-between cursor-pointer" on:click={showContent} aria-hidden="true">
		<slot name="title">
			{title}
		</slot>
		<KIcon icon="i-carbon-chevron-right collapse--icon__transition {showInner ? 'rotate-90' : ''}" />
	</div>
	{#if showInner}
		<div class="pl4 pb4 pr4" out:fly={{ y: 0, duration: 300 }} in:fly={{ y: -60, duration: 300 }}>
			<div style="border-top-width: 1px" class="border-c border-solid mb-4" />
			<slot name="content">{content}</slot>
		</div>
	{/if}
</div>
