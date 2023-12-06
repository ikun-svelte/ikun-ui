<script lang="ts">
	import type { KSliderProps } from './types';
	import type { IKunFormInstance } from '@ikun-ui/form';
	import { createEventDispatcher, getContext } from 'svelte';
	import { formItemKey, formKey, getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';

	export let size: KSliderProps['size'] = 'md';
	export let min: KSliderProps['min'] = 0;
	export let max: KSliderProps['max'] = 100;
	export let value: KSliderProps['value'] = 0;
	export let step: KSliderProps['step'] = 1;
	export let disabled: KSliderProps['disabled'] = false;
	export let vertical: KSliderProps['vertical'] = false;
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
	let startY: number = 0;
	let startPosition: number;
	let newPosition: number;

	$: if (value < min) {
		value = min;
	} else if (value > max) {
		value = max;
	}
	$: percentage = `${((value - min) / (max - min)) * 100}%`;
	$: barStyle = vertical ? `height: ${percentage}; bottom: 0%` : `width: ${percentage}; left: 0%`;
	$: btnStyle = vertical ? `bottom: ${percentage}` : `left: ${percentage}`;

	// element
	let runwayRef: null | HTMLElement = null;
	// updateValue
	const dispatch = createEventDispatcher();

	const handleRunwayClick = (event: MouseEvent) => {
		if (disabledInner) return;
		let newPercent = 0;
		const clientX = event.clientX;
		const clientY = event.clientY;
		const sliderOffsetLeft = runwayRef!.getBoundingClientRect().left;
		const sliderOffsetBottom = runwayRef!.getBoundingClientRect().bottom;
		const sliderSize = vertical
			? runwayRef!.getBoundingClientRect().height
			: runwayRef!.getBoundingClientRect().width;
		newPercent = vertical
			? ((sliderOffsetBottom - clientY) / sliderSize) * 100
			: ((clientX - sliderOffsetLeft) / sliderSize) * 100;
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
		const { clientX, clientY } = getClientXY(event);
		startX = clientX;
		startY = clientY;
		startPosition = Number.parseFloat(percentage);
		newPosition = startPosition;
	};

	const onDragging = (event: MouseEvent) => {
		if (!isDragging || !runwayRef) return;
		let diff: number;
		const { clientX, clientY } = getClientXY(event);
		const { width: sliderWidth, height: sliderHeight } = runwayRef.getBoundingClientRect();
		diff = vertical
			? ((startY - clientY) / sliderHeight) * 100
			: ((clientX - startX) / sliderWidth) * 100;
		newPosition = startPosition + diff;
		setPosition(newPosition);
	};

	const onDragEnd = () => {
		if (!isDragging) return;
		isDragging = false;
		dispatch('change', value);
		formInstance && formInstance?.updateField(field!, value, !formInstance.__manual_validate);
		window.removeEventListener('mousemove', onDragging);
		window.removeEventListener('mouseup', onDragEnd);
	};

	// class names
	const prefixCls = getPrefixCls('slider');
	$: baseCls = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: !vertical,
			[`${prefixCls}--base__vertical`]: vertical
		},
		{
			[`${prefixCls}--${sizeInner}`]: !vertical,
			[`${prefixCls}--${sizeInner}__vertical`]: vertical
		},
		cls
	);
	$: buttonWrapperCls = clsx({
		[`${prefixCls}--button-wrapper`]: !vertical,
		[`${prefixCls}--button-wrapper__vertical`]: vertical
	});
	$: buttonCls = clsx(`${prefixCls}--button`, `${prefixCls}--button--${sizeInner}`);
	$: runwayCls = clsx({
		[`${prefixCls}--runway__disabled`]: disabledInner,
		[`${prefixCls}--runway--${sizeInner}`]: !vertical,
		[`${prefixCls}--runway`]: !vertical,
		[`${prefixCls}--runway--${sizeInner}__vertical`]: vertical,
		[`${prefixCls}--runway__vertical`]: vertical
	});
	$: barCls = clsx({
		[`${prefixCls}--bar`]: !vertical,
		[`${prefixCls}--bar__vertical`]: vertical
	});
</script>

<div class={baseCls} {...$$restProps} {...attrs}>
	<div bind:this={runwayRef} class={runwayCls} aria-hidden="true" on:mousedown={handleRunwayClick}>
		<div
			class={buttonWrapperCls}
			aria-hidden="true"
			on:mousedown={handleMouseDown}
			style={btnStyle}
		>
			{#if $$slots.buttonRender}
				<slot name="buttonRender" />
			{:else}
				<div class={buttonCls}></div>
			{/if}
		</div>
		<div class={barCls} style={barStyle}></div>
	</div>
</div>
