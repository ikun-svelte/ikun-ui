<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { KIcon } from '@ikun-ui/icon';
	import { clsx, type ClassValue } from 'clsx';
	import { checkboxGroupKey, getPrefixCls } from '@ikun-ui/utils';
	import type { checkboxGroupCtx } from '@ikun-ui/checkbox-group';

	export let disabled = false;
	export let value = false;
	export let cls: ClassValue = undefined;
	export let attrs: Record<string, string> = {};
	export let label = '';
	export let uid: string | number = '';
	// updateValue
	const dispatch = createEventDispatcher();

	const ctx = getContext(checkboxGroupKey) as checkboxGroupCtx;

	let valueInner = value;
	$: if (value !== valueInner && !ctx) {
		valueInner = value;
	}
	let classChecking = '';

	$: isDisabled = (ctx && ctx.disabled) || disabled;

	/**
	 * Click the `checkbox` to update the binding value
	 */
	const handleUpdateValue = () => {
		if (isDisabled) return;
		doUpdatedValue(!valueInner, true);
		// Being in a checkbox group does not trigger it
		ctx && dispatch('updateValue', valueInner);
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
				setDisabled
			});
		}
	}
	doRegisterCheckbox();

	// class
	const prefixCls = getPrefixCls('checkbox');
	$: cnames = clsx(
		`${prefixCls}--base`,
		`${prefixCls}--base__dark`,
		{
			[`k-cur-disabled`]: isDisabled
		},
		cls
	);

	$: boxCls = clsx(
		`${prefixCls}--box`,
		{
			[`bg-ikun-main border-ikun-main`]: valueInner && !isDisabled,
			[`${prefixCls}--box__disabled`]: isDisabled
		},
		classChecking
	);

	$: labelCls = clsx(`${prefixCls}--label`, {
		[`text-ikun-main`]: valueInner && !isDisabled
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
		{#if valueInner}
			<div out:fade={{ duration: 200 }} in:fade={{ duration: 200 }}>
				<KIcon icon="i-carbon-checkmark" color="!text-white" width="16px" height="16px" />
			</div>
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
