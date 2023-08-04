<script lang="ts">
	import { KIcon } from '@ikun-ui/icon';
	import { fly, type FlyParams, fade } from 'svelte/transition';
	import { tick } from 'svelte';
	import { isFunction, isString } from 'baiwusanyu-utils';
	type UncertainFunction<T = any> = () => T | void;
	// right-top left-top right-bottom left-bottom center
	export let placement:'right-top' | 'left-top' | 'right-bottom' | 'left-bottom' | 'center' = 'right-top';
	export let attrs = {};
	export let cls = '';
	export let close = false;
	// info warning error success
	export let type:'info' | 'warning'| 'error' | 'success' | null = null;
	export let onClose:null | UncertainFunction= null;
	export let offset = 0;
	export let show = false;
	export let index = 0;

	export let title: any = ''
	export let content: any = ''

	let notificationRef:null | HTMLElement = null;
	let x = '0';
	const resolveX = () => {
		if (placement.startsWith('left')) {
			x = '20px';
		}

		if (placement.startsWith('right')) {
			x = `calc(100% - ${notificationRef!.getBoundingClientRect().width + 20}px)`;
		}

		if (placement === 'center') {
			x = `calc(50% - ${notificationRef!.getBoundingClientRect().width / 2}px)`;
		}
	};

	let y = '0';
	const resolveY = () => {
		const domHeight = notificationRef!.getBoundingClientRect().height;
		if (placement.endsWith('top') || placement === 'center') {
			y = `${20 * (index + 1) + domHeight * index + offset}px`;
		}

		if (placement.endsWith('bottom')) {
			y = `calc(100% - ${(20 + domHeight) * (index + 1) + offset}px)`;
		}
	};

	let oldIndex = index;
	$: if (index !== oldIndex) {
		oldIndex = index;
		resolveY();
	}

	let flyAnimate = {
		in: {
			x: 100,
			duration: 300
		} as FlyParams
	};

	const resolveFlyX = () => {
		if (placement.startsWith('left')) {
			flyAnimate.in.x = -100;
			return;
		}

		if (placement.startsWith('right')) {
			flyAnimate.in.x = 100;
			return;
		}

		if (placement === 'center') {
			flyAnimate = {
				in: {
					y: -100,
					duration: 300
				} as FlyParams
			};
			return;
		}
	};

	async function resolvePosition() {
		resolveFlyX();
		await tick();
		resolveY();
		resolveX();
	}
	$: if (show) {
		resolvePosition();
	}
	const handleClose = () => {
		onClose && onClose();
	};
</script>

{#if show}
	<div
		class="k-notification--base k-notification--base__dark {cls}"
		bind:this={notificationRef}
		out:fade={{ duration: 200 }}
		in:fly={flyAnimate.in}
		{...attrs}
		style="top: {y}; left: {x}">
		<div class="k-notification--body">
			{#if title && isString(title)}
				<h1 class="k-notification--title">
					{#if type}
						<KIcon icon='k-notification--icon--{type}'
							   on:click={handleClose}
							   cls="k-notification--type--icon"
							   color="k-notification--{type}" />
					{/if}
					{@html title}
				</h1>
			{:else if title && isFunction(title)}
				<svelte:component this={title} />
			{/if}

			{#if close}
				<KIcon icon="i-carbon-close"
					   btn
					   on:click={handleClose}
					   color="k-notification--close--icon" />
			{/if}
		</div>
		{#if content}
			<div class="k-notification--content">
				{#if isString(content)}
					{@html content}
				{:else if isFunction(content)}
					<svelte:component this={content} />
				{/if}
			</div>
		{/if}
	</div>
{/if}
