<script lang="ts">
	import { onDestroy, tick } from 'svelte';
	import { fade } from 'svelte/transition';
	export let color = '';
	export let attrs = {};
	export let cls = '';
	export let value = false;
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
			// drawerTop = containerDomRect.top;
			// drawerLeft = containerDomRect.left;
		}
	};

	async function setParent() {
		if (!target && value) {
			await tick();
			const parentEl = getParentEle()
			if(parentEl === document.body){
				drawerRef && (drawerRef.style.position = 'fixed');
			}
			parentEl.style.overflow = 'hidden'
			parentEl.style.position = 'relative'
			updatedPosition();
			window.addEventListener('resize', updatedPosition);
		}

		if (target && value) {
			await tick();
			if(target === document.body){
				drawerRef && (drawerRef.style.position = 'fixed');
			}
			drawerRef && (target.style.overflow = 'hidden');
			drawerRef && (target.style.position = 'relative');
			updatedPosition();
			window.addEventListener('resize', updatedPosition);
		}
	}

	const reset = () => {
		if (!target){
			const parentEl = getParentEle()
			parentEl.style.overflow = ''
			parentEl.style.position = ''
		}else {
			target.style.overflow = ''
			target.style.position = ''
		}

		window.removeEventListener('resize', updatedPosition);
	};
	onDestroy(reset);

	$: if (value) {
		setParent();
	} else {
		reset();
	}
</script>

{#if value}
	<div
		bind:this={drawerRef}
		{...attrs}
		out:fade={{ duration: 300 }}
		in:fade={{ duration: 300 }}
		style:top="{drawerTop}px"
		style:left="{drawerLeft}px"
		style:width="{drawerWidth}"
		style:height="{drawerHeight}"
		style={color ? `background-color: ${color}` : ''}
		class="k-mask--base {cls}">
		<slot />
	</div>
{/if}
