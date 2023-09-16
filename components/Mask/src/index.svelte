<script lang="ts">
	import { onDestroy, tick } from 'svelte';
	import { fade } from 'svelte/transition';
	import { clsx, type ClassValue } from 'clsx';

	export let color = '';
	export let attrs: Record<string, string> = {};
	export let cls: ClassValue = undefined;
	export let value = false;
	export let target: null | HTMLElement = null;

	let maskRef: null | HTMLElement = null;
	let maskWidth = '100%';
	let maskHeight = '100%';
	let maskTop = 0;
	let maskLeft = 0;

	const getParentEle = () => {
		if (maskRef && maskRef.parentElement) {
			return maskRef.parentElement;
		}
		return document.body;
	};
	const updatedPosition = () => {
		const parentEl = getParentEle();
		const containerDomRect = target
			? target.getBoundingClientRect()
			: parentEl.getBoundingClientRect();
		if (containerDomRect) {
			maskWidth = containerDomRect.width ? `${containerDomRect.width}px` : '100%';
			maskHeight = '100%';
		}
	};

	async function setParent() {
		if (!value) return;

		await tick();

		const parentEl = target || getParentEle();
		const isBody = parentEl === document.body;

		if (isBody) {
			maskRef && (maskRef.style.position = 'fixed');
		}

		parentEl.style.overflow = 'hidden';
		parentEl.style.position = 'relative';
		updatedPosition();
		window.addEventListener('resize', updatedPosition);
	}

	const reset = () => {
		const parentEl = target || getParentEle();
		parentEl.style.overflow = '';
		parentEl.style.position = '';

		window.removeEventListener('resize', updatedPosition);
	};

	onDestroy(reset);
	let oldValue = value;
	$: if (value) {
		setParent();
		oldValue = value;
	} else {
		oldValue !== value &&
			setTimeout(() => {
				reset();
				oldValue = value;
			}, 300);
	}

	$: cnames = clsx('k-mask--base', cls);
</script>

{#if value}
	<div
		bind:this={maskRef}
		{...attrs}
		out:fade={{ duration: 300 }}
		in:fade={{ duration: 300 }}
		style:top="{maskTop}px"
		style:left="{maskLeft}px"
		style:width={maskWidth}
		style:height={maskHeight}
		style={color ? `background-color: ${color}` : undefined}
		class={cnames}
	>
		<slot />
	</div>
{/if}
