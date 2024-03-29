<script lang="ts">
	import { KButton } from '@ikun-ui/button';
	import { KClientOnly } from '@ikun-ui/client-only';
	import { KMask } from '@ikun-ui/mask';
	import { KIcon } from '@ikun-ui/icon';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import { clsx } from 'clsx';
	import type { KModalProps } from './types';

	export let show: KModalProps['show'] = false;
	export let attrs: KModalProps['attrs'] = {};
	export let cls: KModalProps['cls'] = '';
	export let title: KModalProps['title'] = '';
	export let footer: KModalProps['footer'] = false;
	// center、right
	export let layout: KModalProps['layout'] = 'center';
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

	$: cnames = clsx('k-modal--base k-modal--base__dark', cls);
	$: footerCls = clsx('k-modal--footer', layout === 'center' ? 'justify-center' : 'justify-end');
</script>

<KClientOnly>
	<KMask value={showInner} target={document.body}>
		<div
			{...attrs}
			class={cnames}
			out:fly={{ y: -30, duration: 300 }}
			in:fly={{ y: -30, duration: 300 }}
		>
			<slot name="header">
				<div class="k-modal--header">
					<span class="k-modal--header--title k-modal--header--title__dark">
						{title}
					</span>
					<KIcon icon="i-carbon-close" on:click={close} btn color="k-modal--header--icon__hover" />
				</div>
			</slot>
			<div class="k-modal--body">
				<slot />
			</div>
			{#if footer}
				<slot name="footer">
					<div class={footerCls}>
						<KButton cls="k-modal--footer--btn" on:click={cancel} type="info">Cancel</KButton>
						<KButton cls="k-modal--footer--btn" on:click={confirm} type="primary">Confirm</KButton>
					</div>
				</slot>
			{/if}
		</div>
	</KMask>
</KClientOnly>
