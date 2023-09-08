<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { clsx, type ClassValue } from 'clsx';

	export let min: number = 0;
	export let max: number = 100;
	export let value: number = 0;
	export let step: number = 1;
	export let disabled: boolean = false;
	export let attrs: Record<string, string> = {};
	export let cls: ClassValue = undefined;

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
	let sliderRunwayRef: null | HTMLElement = null;
	// updateValue
	const dispatch = createEventDispatcher();

	const handleRunwayClick = (event: MouseEvent) => {
		if (disabled) return;
		let newPercent = 0;
		const clientX = event.clientX;
		const sliderOffsetLeft = sliderRunwayRef!.getBoundingClientRect().left;
		const sliderSize = sliderRunwayRef!.getBoundingClientRect().width;
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
		if (!isDragging || !sliderRunwayRef) return;
		let diff: number;
		const { clientX } = getClientXY(event);
		const sliderWidth = sliderRunwayRef.getBoundingClientRect().width;
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

	$: cnames = clsx('k-slider--base', cls);
	$: sliderRunwayCls = clsx('k-slider--runway', {
		'k-cur-disabled': disabled
	});
</script>

<div class="w-full flex">
	<div {...attrs} class={cnames}>
		<div
			bind:this={sliderRunwayRef}
			class={sliderRunwayCls}
			aria-hidden="true"
			on:mousedown={handleRunwayClick}
		>
			<div class="k-slider--bar" style="width: {percentage}; left: 0%"></div>
			<div
				class="k-slider--button-wrapper"
				aria-hidden="true"
				on:mousedown={handleMouseDown}
				style:left={percentage}
			>
				{#if $$slots.buttonRender}
					<slot name="buttonRender" />
				{:else}
					<div class="k-slider--button"></div>
				{/if}
			</div>
		</div>
	</div>
</div>
