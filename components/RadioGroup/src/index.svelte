<script lang="ts">
	import type { KRadioGroupProps, radioMapType, radioMapItem } from './types';
	import { radioGroupKey, getPrefixCls, formItemKey, formKey } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import { createEventDispatcher, setContext, getContext, tick } from 'svelte';
	import type { IKunFormInstance } from '@ikun-ui/form';
	export let value: KRadioGroupProps['value'] = '';
	export let size: KRadioGroupProps['size'] = 'md';
	export let disabled: KRadioGroupProps['disabled'] = false;
	export let cls: KRadioGroupProps['cls'] = undefined;
	export let attrs: KRadioGroupProps['attrs'] = {};

	/*********************** KForm logic start ************************/
	let disabledFrom = false;
	$: disabledInnerForm = disabledFrom || disabled;
	let sizeFrom = '';
	$: sizeInnerForm = sizeFrom || size;
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
			type: 'radio'
		};
		formInstance.__propHandleEvtMap.push(formPropsChangeCb);
	}
	/*********************** KForm logic end ************************/

	// updateValue
	const dispatch = createEventDispatcher();
	const radioMap: radioMapType = new Map();

	// value changes synchronizes the value of the radio
	let valueInner = value;
	$: if (valueInner !== value) {
		if (!disabledInnerForm) {
			setRadioValue((valueInner || '').toString(), false);
			valueInner = value;
			setRadioValue((value || '').toString(), true);
		}
	}

	// disable change synchronization radio disable status
	$: {
		Array.from(radioMap.values()).forEach((m: radioMapItem) => {
			m.setDisabled(disabledInnerForm);
		});
	}

	$: {
		Array.from(radioMap.values()).forEach((m: radioMapItem) => {
			m.setSizes(sizeInnerForm as KRadioGroupProps['size']);
		});
	}

	// Register radio
	// Registration will only be called when the radio component is initialized
	const registerRadio = (uid: string | number, op: radioMapItem) => {
		radioMap.set(uid.toString(), op);
		// Immediately after registration is completed,
		// the doUpdatedValue method provided by the radio component is executed.
		// In this way, the value of radio is initialized based
		// on the binding value of radio group.
		setRadioValue(uid.toString(), (valueInner || '').toString() === uid.toString());
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
	const updatedValueWhenRadioChange = async (status: boolean, uid: string | number) => {
		valueInner = uid;
		dispatch('updateValue', uid);
		if (formInstance) {
			formInstance?.updateField(field!, uid);
			await tick();
			value = uid;
		}
	};

	setContext(radioGroupKey, {
		// Passed to the radio component to register the radio in the context
		registerRadio,
		// Passed to the radio component to set the size during initialization
		size: sizeInnerForm || size,
		// Passed to the radio component to set the disable during initialization
		disabled: disabledInnerForm || disabled,
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
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<slot />
</div>
