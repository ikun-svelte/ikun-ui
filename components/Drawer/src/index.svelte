<script lang="ts">
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { KIcon } from '@ikun-ui/icon';
	import { KMask } from '@ikun-ui/mask';
	import { KClientOnly } from '@ikun-ui/client-only';
	export let placement: 'right' | 'left' = 'right';
	export let value = false;
	export let cls = '';
	export let attrs = {};
	export let header = true;

	const dispatch = createEventDispatcher();

	const toggleClose = () => {
		dispatch('close');
	};

	$: isRight = placement === 'right';
</script>

<KClientOnly>
	<KMask target={document.body} {value}>
		<div
			class="k-drawer--base k-drawer--base__dark {isRight ? 'right-0' : 'left-0'} {cls}"
			{...attrs}
			out:fly={{ duration: 250, x: isRight ? 200 : -200 }}
			in:fly={{ duration: 250, x: isRight ? 200 : -200 }}
		>
			{#if header}
				<slot name="header">
					<div class="k-drawer--op {isRight ? 'justify-start' : 'justify-end'}">
						<KIcon
							icon={isRight ? 'i-carbon-chevron-right' : 'i-carbon-chevron-left'}
							color="hover:text-main"
							on:click={toggleClose}
							btn
						/>
					</div>
				</slot>
			{/if}
			<div class="k-drawer--content" style="height: calc(100% - 24px)">
				<slot />
			</div>
		</div>
	</KMask>
</KClientOnly>
