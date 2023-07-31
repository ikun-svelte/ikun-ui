<script lang="ts">
	import {KMask} from '@ikun-ui/mask';
	import {KIcon} from '@ikun-ui/icon';
	import {KButton} from '@ikun-ui/button';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import {KClientOnly} from "@ikun-ui/clientOnly";
	export let show = false;
	export let attrs = {};
	export let cls = '';
	export let title = '';
	export let footer = false;
	// center、right
	export let layout = 'center';
	// close、cancel、confirm
	const dispatch = createEventDispatcher();
	$: showInner = show;
	const close = () => {
		showInner = !showInner;
		dispatch('close', showInner);
	};
	const cancel = () => {
		dispatch('cancel');
		close();
	};

	const confirm = () => {
		dispatch('confirm');
		close();
	};
</script>

<KClientOnly>
	<KMask value={showInner}>
		<div {...attrs}
			  class="k-modal--base dark:bg-dark-500 dark:shadow dark:shadow-main {cls}"
			  out:fly={{ y: -30, duration: 300 }}
			  in:fly={{ y: -30, duration: 300 }}>
			<slot name="header">
				<div class="k-modal--header">
					<h1 class="k-modal--header--title dark:text-white">
						{title}
					</h1>
					<KIcon icon="i-carbon-close"
						   on:click={close}
						   btn
						   color="k-modal--header--icon__hover" />
				</div>
			</slot>
			<div class="k-modal--body">
				<slot />
			</div>
			{#if footer}
				<slot name="footer">
					<div class="k-modal--footer {layout === 'center'
						? 'justify-center'
						: 'justify-end'}">
						<KButton cls="k-modal--footer--btn"
								 on:click={cancel}
								 type="info">Cancel</KButton>
						<KButton cls="k-modal--footer--btn"
								 on:click={confirm}
								 type="primary">Confirm</KButton>
					</div>
				</slot>
			{/if}
		</div>
	</KMask>
</KClientOnly>

