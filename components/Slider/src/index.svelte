<script lang="ts">
	import type { KSliderProps } from './types';
	import { createEventDispatcher } from 'svelte';
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';

	export let size: KSliderProps['size'] = 'md';
	export let min: KSliderProps['min'] = 0;
	export let max: KSliderProps['max'] = 100;
	export let value: KSliderProps['value'] = 0;
	export let step: KSliderProps['step'] = 1;
	export let disabled: KSliderProps['disabled'] = false;
	export let attrs: KSliderProps['attrs'] = {};
	export let cls: KSliderProps['cls'] = undefined;

	// current value
	let isDragging: boolean = false;
	let startX: number = 0;
	let startPosition: number;
	let newPosition: number;

	$: if (value < min) {
		value = min;
	} else if (value > max) {
		value = max;
	}
	$: percentage = `${((value - min) / (max - min)) * 100}%`;

	// element
	let runwayRef: null | HTMLElement = null;
	// updateValue
	const dispatch = createEventDispatcher();

	const handleRunwayClick = (event: MouseEvent) => {
		if (disabled) return;
		let newPercent = 0;
		const clientX = event.clientX;
		const sliderOffsetLeft = runwayRef!.getBoundingClientRect().left;
		const sliderSize = runwayRef!.getBoundingClientRect().width;
		newPercent = ((clientX - sliderOffsetLeft) / sliderSize) * 100;
		if (newPosition < 0 || newPosition > 100) return;
		setPosition(newPercent);
	};

	const handleMouseDown = (event: MouseEvent) => {
		if (disabled) return;
		onDragStart(event);
		window.addEventListener('mousemove', onDragging);
		window.addEventListener('mouseup', onDragEnd);
	};

	const getClientXY = ({ clientX, clientY }: MouseEvent) => {
		return {
			clientX,
			clientY
		};
	};

	const setPosition = (newPosition: number) => {
		if (Number.isNaN(+newPosition)) return;
		if (newPosition < 0) {
			newPosition = 0;
		}
		if (newPosition > 100) {
			newPosition = 100;
		}
		const lengthStep = 100 / ((max - min) / step);
		const steps = Math.round(newPosition / lengthStep);
		let newValue = steps * lengthStep * (max - min) * 0.01 + min;
		if (newValue !== value) {
			value = newValue;
			dispatch('input', value);
		}
	};

	const onDragStart = (event: MouseEvent) => {
		isDragging = true;
		const { clientX } = getClientXY(event);
		startX = clientX;
		startPosition = Number.parseFloat(percentage);
		newPosition = startPosition;
	};

	const onDragging = (event: MouseEvent) => {
		if (!isDragging || !runwayRef) return;
		let diff: number;
		const { clientX } = getClientXY(event);
		const sliderWidth = runwayRef.getBoundingClientRect().width;
		diff = ((clientX - startX) / sliderWidth) * 100;
		newPosition = startPosition + diff;
		setPosition(newPosition);
	};

	const onDragEnd = () => {
		if (!isDragging) return;
		isDragging = false;
		dispatch('change', value);
		window.removeEventListener('mousemove', onDragging);
		window.removeEventListener('mouseup', onDragEnd);
	};

	// class names
	const prefixCls = getPrefixCls('slider');
	$: baseCls = clsx(prefixCls, `${prefixCls}--base`, `${prefixCls}--${size}`, cls);
	$: buttonWrapperCls = clsx(`${prefixCls}--button-wrapper`);
	$: buttonCls = clsx(`${prefixCls}--button`, `${prefixCls}--button--${size}`);
	$: runwayCls = clsx(`${prefixCls}--runway`, `${prefixCls}--runway--${size}`, {
		[`${prefixCls}--runway__disabled`]: disabled
	});
</script>

<div class={baseCls} {...$$restProps} {...attrs}>
	<div bind:this={runwayRef} class={runwayCls} aria-hidden="true" on:mousedown={handleRunwayClick}>
		<div
			class={buttonWrapperCls}
			aria-hidden="true"
			on:mousedown={handleMouseDown}
			style:left={percentage}
		>
			{#if $$slots.buttonRender}
				<slot name="buttonRender" />
			{:else}
				<div class={buttonCls}></div>
			{/if}
		</div>
		<div class="k-slider--bar" style="width: {percentage}; left: 0%"></div>
	</div>
</div>
