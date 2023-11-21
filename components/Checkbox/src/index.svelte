<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { KIcon } from '@ikun-ui/icon';
	import { clsx } from 'clsx';
	import { checkboxGroupKey, getPrefixCls } from '@ikun-ui/utils';
	import type { checkboxGroupCtx } from '@ikun-ui/checkbox-group';
	import type { KCheckboxProps } from './types';

	export let label: KCheckboxProps['label'] = '';
	export let value: KCheckboxProps['value'] = false;
	export let uid: KCheckboxProps['uid'] = '';
	export let size: KCheckboxProps['size'] = 'md';
	export let disabled: KCheckboxProps['disabled'] = false;
	export let indeterminate: KCheckboxProps['indeterminate'] = false;
	export let cls: KCheckboxProps['cls'] = undefined;
	export let attrs: KCheckboxProps['attrs'] = {};
	// updateValue
	const dispatch = createEventDispatcher();

	$: isIndeterminate = indeterminate;

	const ctx = getContext(checkboxGroupKey) as checkboxGroupCtx;
	let valueInner = value;
	$: if (value !== valueInner && !ctx) {
		valueInner = value;
	}
	let classChecking = '';

	$: isDisabled = (ctx && ctx.disabled) || disabled;
	$: sizeInner = ctx && ctx.size ? ctx.size : size;
	const KCheckboxSize = {
		'lg': '16',
		'md': '14',
		'sm': '12'
	}

	/**
	 * Click the `checkbox` to update the binding value
	 */
	const handleUpdateValue = () => {
		if (isDisabled) return;
		doUpdatedValue(!valueInner, true);
		isIndeterminate = false;
		// Being in a checkbox group does not trigger it
		!ctx && dispatch('updateValue', valueInner);
	};


	/**
	 * Set checkbox value
	 * @param v latest value
	 * @param inner Whether it is an internal call, it may be called in the checkbox group
	 */
	const doUpdatedValue = (v: boolean, inner: boolean = false) => {
		valueInner = v;
		classChecking = 'animate-ikun-checking';
		setTimeout(() => {
			classChecking = '';
		}, 300);

		// When it is clicked in the checkbox group,
		// update the value to the checkbox group synchronously
		if (uid && ctx && inner) {
			ctx.updatedValueWhenCheckboxChange(v, uid);
		}
	};

	/**
	 * Method exposed to checkbox group.
	 * When the disabled value of checkbox group changes,
	 * it will be executed to update the disabled state of checkbox.
	 * @param v disabled value
	 */
	function setDisabled(v: boolean) {
		isDisabled = v;
	}

	function setSizes(v: KCheckboxProps['size']) {
		sizeInner = v;
	}

	/**
	 * Register checkbox
	 */
	function doRegisterCheckbox() {
		if (uid && ctx) {
			// Register checkbox
			ctx.registerCheckbox(uid, {
				// Expose the doUpdatedValue method,
				// and when the `checkbox group` binding value changes,
				// the `checkbox` can be updated synchronously
				doUpdatedValue,
				// Expose the setDisabled method.
				// When the disabled value bound to the `checkbox group` changes,
				// the `checkbox` can be disabled synchronously.
				setDisabled,
				setSizes
			});
		}
	}
	doRegisterCheckbox();

	// class
	const prefixCls = getPrefixCls('checkbox');
	$: cnames = clsx(
		`${prefixCls}--base`,
		`${prefixCls}--base__dark`,
		`${prefixCls}--${sizeInner}`,
		{
			[`k-cur-disabled`]: isDisabled
		},
		cls
	);

	$: boxCls = clsx(
		`${prefixCls}--box`,
		{
			[`bg-ikun-main border-ikun-main`]: (valueInner && !isDisabled) || isIndeterminate,
			[`${prefixCls}--box__disabled`]: isDisabled
		},
		classChecking
	);

	$: labelCls = clsx(`${prefixCls}--label`, {
		[`text-ikun-main`]: (valueInner && !isDisabled) || isIndeterminate
	});
</script>

<label class={cnames} {...attrs}>
	<input
		value={valueInner}
		disabled={isDisabled}
		type="checkbox"
		on:change={handleUpdateValue}
		hidden
	/>
	<div class={boxCls}>
		{#if valueInner && !isIndeterminate}
			<div out:fade={{ duration: 200 }} in:fade={{ duration: 200 }}>
				<KIcon
					icon="i-carbon-checkmark"
					color="!text-white"
					width={KCheckboxSize[sizeInner]}
					height={KCheckboxSize[sizeInner]}
				/>
			</div>
		{/if}
		{#if isIndeterminate}
			<KIcon
				icon="i-carbon-subtract"
				color="!text-white"
				width={KCheckboxSize[sizeInner]}
				height={KCheckboxSize[sizeInner]}
			/>
		{/if}
	</div>
	<slot>
		{#if label}
			<span class={labelCls}>
				{label}
			</span>
		{/if}
	</slot>
</label>
