<script lang="ts">
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { KIcon } from '@ikun-ui/icon';
	import { KMask } from '@ikun-ui/mask';
	import { KClientOnly } from '@ikun-ui/client-only';
	import { clsx } from 'clsx';
	import type { KDrawerProps } from './types';

	export let placement: KDrawerProps['placement'] = 'right';
	export let value: KDrawerProps['value'] = false;
	export let cls: KDrawerProps['cls'] = undefined;
	export let attrs: KDrawerProps['attrs'] = {};
	export let header: KDrawerProps['header'] = true;
	export let closeOnClickMask: KDrawerProps['closeOnClickMask'] = false;

	$: cnames = clsx(cls);
	$: maskCls = clsx('k-drawer--base k-drawer--base__dark', isRight ? 'right-0' : 'left-0', cnames);
	$: headerCls = clsx('k-drawer--op', isRight ? 'justify-start' : 'justify-end');

	const dispatch = createEventDispatcher();

	const toggleClose = () => {
		dispatch('close');
	};

	const onClickMask = () => {
		if (closeOnClickMask) toggleClose();
	};

	$: isRight = placement === 'right';
</script>

<KClientOnly>
	<KMask {onClickMask} target={document.body} {value}>
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<div
			class={maskCls}
			{...attrs}
			on:click|stopPropagation
			role="dialog"
			aria-modal="true"
			out:fly={{ duration: 250, x: isRight ? 200 : -200 }}
			in:fly={{ duration: 250, x: isRight ? 200 : -200 }}
		>
			{#if header}
				<slot name="header">
					<div class={headerCls}>
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
