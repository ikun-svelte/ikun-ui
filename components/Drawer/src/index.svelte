<script lang="ts">
	import { KButton } from '@ikun-ui/button';
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { KIcon } from '@ikun-ui/icon';
	import { KMask } from '@ikun-ui/mask';
	import { KClientOnly } from '@ikun-ui/client-only';
	export let placement: 'right' | 'left' = 'right';
	export let value = false;
	export let target: null | HTMLElement = null;
	export let cls = '';
	export let attrs = {};
	export let footer = false;

	const dispatch = createEventDispatcher();
	$: showInner = value;

	const close = () => {
		showInner = !showInner;
		dispatch('close', showInner);
	};

	const toggleClose = () => {
		close();
	};

	const cancel = () => {
		dispatch('cancel');
		close();
	};

	const confirm = () => {
		dispatch('confirm');
		close();
	};

	$: isRight = placement === 'right';
</script>

<KClientOnly>
	<KMask {target} {value}>
		<div
			class="k-drawer--base k-drawer--base__dark {isRight ? 'right-0' : 'left-0'} {cls}"
			{...attrs}
			out:fly={{ duration: 250, x: isRight ? 200 : -200 }}
			in:fly={{ duration: 250, x: isRight ? 200 : -200 }}
		>
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
			<!-- Layout design needs to be optimized -->
			<div class="k-drawer--content" style="height: calc(100% - 24px - 0.5rem - 34px)">
				<slot />
			</div>
			{#if footer}
				<slot name="footer">
					<div class="k-drawer--footer">
						<KButton cls="k-drawer--footer--btn" on:click={cancel} type="info">Cancel</KButton>
						<KButton cls="k-drawer--footer--btn" on:click={confirm} type="primary">Confirm</KButton>
					</div>
				</slot>
			{/if}
		</div>
	</KMask>
</KClientOnly>
