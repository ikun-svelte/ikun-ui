<script lang="ts">
	import type { KRadioGroupProps, radioMapType, radioMapItem } from './types';
	import { radioGroupKey, getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import { createEventDispatcher, setContext } from 'svelte';

	export let cls: KRadioGroupProps['cls'] = '';
	export let attrs: KRadioGroupProps['attrs'] = {};
	export let disabled: KRadioGroupProps['disabled'] = false;
	export let value: KRadioGroupProps['value'] = '';
	// updateValue
	const dispatch = createEventDispatcher();
	const radioMap: radioMapType = new Map();

	// value changes synchronizes the value of the radio
	let valueInner = value;
	$: if (valueInner !== value) {
		if (!disabled) {
			setRadioValue(valueInner.toString(), false);
			valueInner = value;
			setRadioValue(value.toString(), true);
		}
	}

	// disable change synchronization radio disable status
	let disabledInner = disabled;
	$: if (disabledInner !== disabled) {
		Array.from(radioMap.values()).forEach((m: radioMapItem) => {
			m.setDisabled(disabled);
		});
		disabledInner = disabled;
	}

	// Register radio
	// Registration will only be called when the radio component is initialized
	const registerRadio = (uid: string | number, op: radioMapItem) => {
		radioMap.set(uid.toString(), op);
		// Immediately after registration is completed,
		// the doUpdatedValue method provided by the radio component is executed.
		// In this way, the value of radio is initialized based
		// on the binding value of radio group.
		setRadioValue(uid.toString(), valueInner === uid);
	};

	/**
	 * Set the value of radio based on the value of radio group
	 * @param uid
	 * @param v
	 */
	const setRadioValue = (uid: string, v: boolean) => {
		const cbMapItem = radioMap.get(uid);
		if (cbMapItem) {
			const cbMapItemDoUpdated = cbMapItem.doUpdatedValue;
			cbMapItemDoUpdated(v);
		}
	};

	/**
	 * When radio changes, update radioGroup value
	 * @param status
	 * @param uid
	 */
	const updatedValueWhenRadioChange = (status: boolean, uid: string | number) => {
		valueInner = uid;
		dispatch('updateValue', uid);
	};

	setContext(radioGroupKey, {
		// Passed to the radio component to register the radio in the context
		registerRadio,
		// Passed to the radio component to set the disable during initialization
		disabled,
		// Passed to the radio component to update the valueInner of radioGroup
		updatedValueWhenRadioChange
	});

	const prefixCls = getPrefixCls('radio-group');

	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);

	// ✅ 非禁用，可以初始化
	// ✅ 非禁用，value 变化同步到 radio
	// ✅ 非禁用，radio 变化同步到 radio group

	// ✅ 禁用，可以初始化
	// ✅ 禁用，value 变化不同步到 radio
	// ✅ 禁用，radio 变化不同步到 radio group
	// ✅ 禁用 -> 非禁用，radio group 同步最新 radio值
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<slot />
</div>
