<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { KIcon } from '@ikun-ui/icon';
	import { SmokeDistance } from 'smoke-distance';
	import type { easingType } from 'smoke-distance';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { clsx, type ClassValue } from 'clsx';

	export let cls: ClassValue = undefined;
	export let attrs: Record<string, string> = {};
	export let right: number = 40;
	export let bottom: number = 40;
	export let showHeight: number = 200;
	export let target: string = '';
	export let easing: string = 'quartOut';
	export let duration: number = 500;

	let show = false;
	let targetEl: undefined | HTMLElement = undefined;
	let container: undefined | Document | HTMLElement = undefined;
	$: backTopStyle = {
		right: `${right}px`,
		bottom: `${bottom}px`
	};

	const scrollToTop = () => {
		if (!targetEl) return;
		const { scrollTop } = targetEl;
		const smoke = new SmokeDistance({
			from: { scrollTop },
			to: { scrollTop: 0 },
			easing: easing as easingType,
			duration: duration,
			delay: 0,
			onUpdate: (keys: any) => {
				if (targetEl) targetEl.scrollTop = keys.scrollTop;
			}
		});
		smoke.start();
	};

	const dispatch = createEventDispatcher();
	const handleClick = (event: MouseEvent) => {
		scrollToTop();
		dispatch('click', event);
	};

	const setContainer = () => {
		container = document;
		targetEl = document.documentElement;
		if (target) {
			targetEl = document.querySelector<HTMLElement>(target) ?? undefined;
			if (!targetEl) {
				console.error(`[ikun-ui]: backtop component - ${target} does not exist`);
				targetEl = document.body;
			}
			container = targetEl;
		}
	};

	const handleScroll = () => {
		if (targetEl) {
			const { scrollTop } = targetEl;
			show = scrollTop >= showHeight;
		}
	};
	handleScroll();
	onMount(() => {
		setContainer();
		container && container.addEventListener('scroll', handleScroll);
	});

	onDestroy(() => {
		container && container.removeEventListener('scroll', handleScroll);
	});

	const prefixCls = getPrefixCls('backtop');

	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true,
			[`${prefixCls}__dark`]: true
		},
		cls
	);
</script>

{#if show}
	<div
		class={cnames}
		style:right={backTopStyle.right}
		style:bottom={backTopStyle.bottom}

		on:click|stopPropagation={handleClick}
		{...$$restProps}
		{...attrs}
	>
		<slot>
			<KIcon icon="i-carbon-arrow-up" />
		</slot>
	</div>
{/if}
