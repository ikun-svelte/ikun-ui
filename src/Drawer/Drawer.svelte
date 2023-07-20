<script lang="ts">
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import Icon from '../Icon/Icon.svelte';
	import Mask from '../Mask/Mask.svelte';
	export let placement: 'right' | 'left' = 'right';
	export let modelValue = false;
	export let target = null;
	export let customClass = '';
	const dispatch = createEventDispatcher();
	const toggleClose = () => {
		dispatch('close');
	};
</script>

<Mask {target} {modelValue}>
	<div
		class="ui-drawer dark:bg-dark bg-white absolute z-1000 top-0 min-w-1/3 h-full p2 {placement ===
		'right'
			? 'right-0'
			: 'left-0'} {customClass}"
		out:fly={{ duration: 250, x: placement === 'right' ? 200 : -200 }}
		in:fly={{ duration: 250, x: placement === 'right' ? 200 : -200 }}
	>
		<div class="w-24px h-24px">
			<Icon
				icon={placement === 'right' ? 'i-carbon-chevron-right' : 'i-carbon-chevron-left'}
				colorCls="hover:text-main"
				customClass={placement === 'right' ? 'justify-start' : 'justify-end'}
				on:click={toggleClose}
				isButton
			/>
		</div>
		<div
			class="ui-drawer--content overflow-y-auto scroll-bar mt-2"
			style="height: calc(100% - 24px)"
		>
			<slot />
		</div>
	</div>
</Mask>
