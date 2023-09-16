<script lang="ts">
	import type { KCheckboxGroupProps, checkboxMapType, checkboxMapItem } from './types';
	import { checkboxGroupKey, getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import { createEventDispatcher, setContext } from 'svelte';
	import { jsonClone } from 'baiwusanyu-utils';

	export let disabled: KCheckboxGroupProps['disabled'] = false;
	export let value: KCheckboxGroupProps['value'] = [];
	export let cls: KCheckboxGroupProps['cls'] = undefined;
	export let attrs: KCheckboxGroupProps['attrs'] = {};
	// updateValue
	const dispatch = createEventDispatcher();
	const checkboxMap: checkboxMapType = new Map();

	// value changes synchronizes the value of the checkbox
	let valueInner = value;
	$: if (valueInner !== value) {
		if (!disabled) {
			valueInner.forEach((v: string | number) => {
				setCheckBoxValue(v.toString());
			});

			value.forEach((v: string | number) => {
				setCheckBoxValue(v.toString());
			});
			valueInner = value;
		}
	}

	// disable change synchronization checkbox disable status
	let disabledInner = disabled;
	$: if (disabledInner !== disabled) {
		Array.from(checkboxMap.values()).forEach((m: checkboxMapItem) => {
			m.setDisabled(disabled);
		});
		disabledInner = disabled;
	}

	// Register checkbox
	// Registration will only be called when the checkbox component is initialized
	const registerCheckbox = (uid: string | number, op: checkboxMapItem) => {
		checkboxMap.set(uid.toString(), op);
		// Immediately after registration is completed,
		// the doUpdatedValue method provided by the checkbox component is executed.
		// In this way, the value of checkbox is initialized based
		// on the binding value of checkbox group.
		setCheckBoxValue(uid.toString());
	};

	/**
	 * Set the value of checkbox based on the value of checkbox group
	 * @param uid
	 */
	const setCheckBoxValue = (uid: string) => {
		const cbMapItem = checkboxMap.get(uid);
		if (cbMapItem) {
			const cbMapItemDoUpdated = cbMapItem.doUpdatedValue;
			let res = value.some((v: string | number) => {
				return v.toString() === uid;
			});
			cbMapItemDoUpdated(res);
		}
	};

	/**
	 * When checkbox changes, update checkboxGroup value
	 * @param status
	 * @param uid
	 */
	const updatedValueWhenCheckboxChange = (status: boolean, uid: string | number) => {
		let finalValue = jsonClone(value);
		if (status) {
			finalValue.push(uid);
			finalValue = [...new Set([...finalValue])];
		} else {
			finalValue = finalValue.filter((v: string | number) => v !== uid);
		}
		valueInner = value;
		dispatch('updateValue', finalValue);
	};

	setContext(checkboxGroupKey, {
		// Passed to the checkbox component to register the checkbox in the context
		registerCheckbox,
		// Passed to the checkbox component to set the disable during initialization
		disabled,
		// Passed to the checkbox component to update the valueInner of checkboxGroup
		updatedValueWhenCheckboxChange
	});

	const prefixCls = getPrefixCls('checkbox-group');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<slot />
</div>
