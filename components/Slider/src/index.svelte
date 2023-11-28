<script lang="ts">
	import { createEventDispatcher, getContext } from "svelte";
	import { clsx } from 'clsx';
	import type { KSliderProps } from './types';
	import { formItemKey, formKey, getPrefixCls } from "@ikun-ui/utils";
	import type { IKunFormInstance } from "@ikun-ui/form";

	export let min: KSliderProps['min'] = 0;
	export let max: KSliderProps['max'] = 100;
	export let value: KSliderProps['value'] = 0;
	export let step: KSliderProps['step'] = 1;
	export let disabled: KSliderProps['disabled'] = false;
	export let size: KSliderProps['size'] = 'md';
	export let attrs: KSliderProps['attrs'] = {};
	export let cls: KSliderProps['cls'] = undefined;

	/*********************** KForm logic start ************************/
	let disabledFrom = false;
	$: disabledInner = disabledFrom || disabled;
	let sizeFrom = '';
	$: sizeInner = sizeFrom || size;

	const formContext = getContext(formItemKey) as string;
	const formInstance = getContext(formKey) as IKunFormInstance;
	let field: string | undefined = '';
	// Initialize the KInput value based
	// on the form value in the KFormItem context
	function formUpdateField(init = false) {
		field = formContext.split('&').pop();
		value = formInstance.getValueByPath(
			field,
			init ? formInstance.__default_value : formInstance.__value
		);
	}
	function formPropsChangeCb(props: Record<any, any>) {
		disabledFrom = props.disabled;
		sizeFrom = props.size;
	}

	// Register event, KForm can set KInput value
	if (formContext && formInstance) {
		formUpdateField(true);
		formPropsChangeCb(formInstance.__dynamicProps);
		formInstance.__itemCompMap[field] = {
			update: formUpdateField,
			type: 'slider'
		};
		formInstance.__propHandleEvtMap.push(formPropsChangeCb);
	}
	/*********************** KForm logic end ************************/

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
		if (disabledInner) return;
		let newPercent = 0;
		const clientX = event.clientX;
		const sliderOffsetLeft = sliderRunwayRef!.getBoundingClientRect().left;
		const sliderSize = sliderRunwayRef!.getBoundingClientRect().width;
		newPercent = ((clientX - sliderOffsetLeft) / sliderSize) * 100;
		if (newPosition < 0 || newPosition > 100) return;
		setPosition(newPercent);
	};

	const handleMouseDown = (event: MouseEvent) => {
		if (disabledInner) return;
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
		formInstance &&
		formInstance?.updateField( field!, value, !formInstance.__manual_validate);
		window.removeEventListener('mousemove', onDragging);
		window.removeEventListener('mouseup', onDragEnd);
	};

	const prefixCls = getPrefixCls('slider');
	$: cnames = clsx(prefixCls, cls);
	$: sliderRunwayCls = clsx(`${prefixCls}--runway`, {
		'k-cur-disabled': disabledInner
	});
	$: sizeCls = clsx(`${prefixCls}--base`, `${prefixCls}__${sizeInner}`);
	const barCls = `${prefixCls}--bar`;
	$: btnCls = clsx(`${prefixCls}--button`, `${prefixCls}--button__${sizeInner}`);
	$: btnWrapperCls = clsx(
		`${prefixCls}--button__wrapper`,
		`${prefixCls}--button__wrapper__${sizeInner}`
	);
</script>

<div class={cnames}>
	<div {...attrs} class={sizeCls}>
		<div
			bind:this={sliderRunwayRef}
			class={sliderRunwayCls}
			aria-hidden="true"
			on:mousedown={handleRunwayClick}
		>
			<div class={barCls} style="width: {percentage}; left: 0%"></div>
			<div
				class={btnWrapperCls}
				aria-hidden="true"
				on:mousedown={handleMouseDown}
				style:left={percentage}
			>
				{#if $$slots.buttonRender}
					<slot name="buttonRender" />
				{:else}
					<div class={btnCls}></div>
				{/if}
			</div>
		</div>
	</div>
</div>
