<script lang="ts">
	import { KIcon } from '@ikun-ui/icon';
	import { fly, type FlyParams, fade } from 'svelte/transition';
	import { tick, getContext } from 'svelte';
	import { isFunction, isString } from 'baiwusanyu-utils';
	type UncertainFunction<T = any> = () => T | void;
	// right-top left-top right-bottom left-bottom center
	export let placement = 'right-top';
	export let customClass = '';
	export let close = false;
	export let title = '';
	// info warning error success
	export let type:'info' | 'warning'| 'error' | 'success' | null = null;
	export let onClose:null | UncertainFunction= null;
	export let offset = 0;
	export let show = false;
	export let index = 0;

	$: curType = () => {
		const typeDict = {
			info: {
				icon: 'i-carbon-information-filled',
				color: 'text-info'
			},
			warning: {
				icon: 'i-carbon-warning-filled',
				color: 'text-warning'
			},
			error: {
				icon: 'i-carbon-error-filled',
				color: 'text-danger'
			},
			success: {
				icon: 'i-carbon-checkmark-filled',
				color: 'text-success'
			}
		};
		if(type){
			return typeDict[type];
		}else {
			typeDict['info']
		}
	};

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
	const slotTitle: any = getContext('slotTitle');
	const slot:string | any = getContext('slot');
</script>

{#if show}
	<div
		class="ui-notify fixed z-1001 rounded shadow bg-white p2 min-w-240px dark:bg-dark-500 dark:shadow-main {customClass}"
		bind:this={notificationRef}
		out:fade={{ duration: 200 }}
		in:fly={flyAnimate.in}
		style="top: {y}; left: {x}"
	>
		<div class="w-full flex items-center justify-between">
			{#if slotTitle && isString(slotTitle)}
				{@html slotTitle}
			{:else if slotTitle && isFunction(slotTitle)}
				<svelte:component this={slotTitle} />
			{:else}
				<h1 class="flex-c">
					{#if type}
						<KIcon icon={curType()?.icon || ''} on:click={handleClose} colorCls="{curType()?.color} mr-2" />
					{/if}
					{title}
				</h1>
			{/if}

			{#if close}
				<KIcon icon="i-carbon-close" isButton on:click={handleClose} colorCls="hover:text-main" />
			{/if}
		</div>
		{#if slot}
			<div class="p2 mt-2">
				{#if isString(slot)}
					{@html slot}
				{:else if isFunction(slot)}
					<svelte:component this={slot} />
				{/if}
			</div>
		{/if}
	</div>
{/if}

<style>
	.ui-notify {
		transition: top linear 0.3s;
	}
</style>
