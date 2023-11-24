<script lang="ts">
	import { KIcon } from '@ikun-ui/icon';
	import { KMask } from '@ikun-ui/mask';
	import { isFunction, isString } from 'baiwusanyu-utils';
	import { KClientOnly } from '@ikun-ui/client-only';
	import { clsx, type ClassValue } from 'clsx';
	import { onMount, tick } from 'svelte';

	export let show: boolean = false;
	export let text = '';
	export let spinner: any = 'i-carbon-circle-dash';
	export let background = '';
	export let cls: ClassValue = undefined;
	export let attrs: Record<string, string> = {};
	export let target = document.body;
	export let rotating: boolean = true;

	let maskRef: any = null;
	export async function updatedPosition() {
		if (maskRef) {
			await tick();
			maskRef.updatedPosition();
		}
	}
	onMount(updatedPosition);
	$: cnames = clsx(cls);
</script>

<KClientOnly>
	<KMask value={show} color={background} {target} bind:this={maskRef}>
		<div class={cnames} {...attrs}>
			<div class="k-spin--spinner">
				<div class={rotating ? 'k-spin--spinner__rotating' : undefined}>
					{#if spinner && isString(spinner)}
						<KIcon icon={spinner} color="text-ikun-main" />
					{:else if spinner && isFunction(spinner)}
						<svelte:component this={spinner} />
					{/if}
				</div>
				{#if text}
					<p class="k-spin--text">{text}</p>
				{/if}
			</div>
		</div>
	</KMask>
</KClientOnly>
