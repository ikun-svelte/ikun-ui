<script lang="ts">
	import { onDestroy, tick } from 'svelte';
	import { fade } from 'svelte/transition';
	export let modelValue = false;
	export let target: null | HTMLElement = null;
	let drawerRef: null | HTMLElement = null;
	let drawerWidth = '100%';
	let drawerHeight = '100%';
	let drawerTop = 0;
	let drawerLeft = 0;

	const getParentEle = () => {
		if(drawerRef && drawerRef.parentElement){
			return drawerRef.parentElement
		}
		return document.body
	}
	const updatedPosition = () => {
		const parentEl = getParentEle()
		const containerDomRect = target
			? target.getBoundingClientRect()
			: parentEl.getBoundingClientRect();
		if (containerDomRect) {
			drawerWidth = containerDomRect.width ? `${containerDomRect.width}px` : '100%';
			drawerHeight = containerDomRect.height ? `${containerDomRect.height}px` : '100%';
			drawerTop = containerDomRect.top;
			drawerLeft = containerDomRect.left;
		}
	};

	async function setParent() {
		if (!target && modelValue) {
			await tick();
			const parentEl = getParentEle()
			parentEl.style.overflow = 'hidden'
			parentEl.style.position = 'relative'
			updatedPosition();
			window.addEventListener('resize', updatedPosition);
		}

		if (target && modelValue) {
			await tick();
			drawerRef && (target.style.overflow = 'hidden');
			drawerRef && (target.style.position = 'relative');
			updatedPosition();
			window.addEventListener('resize', updatedPosition);
		}
	}

	const reset = () => {
		const parentEl = getParentEle()
		parentEl.style.overflow = ''
		parentEl.style.position = ''
		window.removeEventListener('resize', updatedPosition);
	};
	onDestroy(reset);

	$: if (modelValue) {
		setParent();
	} else {
		reset();
	}
</script>

{#if modelValue}
	<div
		bind:this={drawerRef}
		out:fade={{ duration: 300 }}
		in:fade={{ duration: 300 }}
		style="top:{drawerTop}px;left:{drawerLeft}px;width:{drawerWidth};height:{drawerHeight}"
		class="ui-mask bg-black:50 absolute z-999 fixed">
		<slot />
	</div>
{/if}
