<script lang="ts">
	import type { KCheckboxGroupProps, checkboxMapType, checkboxMapItem } from './types';
	import { checkboxGroupKey, formItemKey, formKey, getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import { createEventDispatcher, getContext, onMount, setContext, tick } from 'svelte';
	import { jsonClone } from 'baiwusanyu-utils';
	import type { IKunFormInstance } from '@ikun-ui/form';

	export let value: KCheckboxGroupProps['value'] = [];
	export let size: KCheckboxGroupProps['size'] = 'md';
	export let disabled: KCheckboxGroupProps['disabled'] = false;
	export let cls: KCheckboxGroupProps['cls'] = undefined;
	export let attrs: KCheckboxGroupProps['attrs'] = {};

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
	onMount(() => {
		// Register event, KForm can set KInput value
		if (formContext && formInstance) {
			formUpdateField(true);
			formPropsChangeCb(formInstance.__dynamicProps);
			formInstance.__itemCompMap[field!] = {
				update: formUpdateField,
				type: 'checkbox'
			};
			formInstance.__propHandleEvtMap.push(formPropsChangeCb);
		}
	});

	/*********************** KForm logic end ************************/

	// updateValue
	const dispatch = createEventDispatcher();
	const checkboxMap: checkboxMapType = new Map();

	// value changes synchronizes the value of the checkbox
	let valueInner = value;
	$: if (valueInner !== value) {
		if (!disabledInnerForm) {
			(valueInner || []).forEach((v: string | number) => {
				setCheckBoxValue(v.toString());
			});

			(value || []).forEach((v: string | number) => {
				setCheckBoxValue(v.toString());
			});
			valueInner = value;
		}
	}

	// disable change synchronization checkbox disable status
	$: {
		Array.from(checkboxMap.values()).forEach((m: checkboxMapItem) => {
			m.setDisabled(disabledInnerForm);
		});
	}

	$: {
		Array.from(checkboxMap.values()).forEach((m: checkboxMapItem) => {
			m.setSizes(sizeInnerForm as KCheckboxGroupProps['size']);
		});
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
			let res = (value || []).some((v: string | number) => {
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
	const updatedValueWhenCheckboxChange = async (status: boolean, uid: string | number) => {
		let finalValue = jsonClone(value || []);
		if (status) {
			finalValue.push(uid);
			finalValue = [...new Set([...finalValue])];
		} else {
			finalValue = finalValue.filter((v: string | number) => v !== uid);
		}
		valueInner = value;
		dispatch('updateValue', finalValue);
		if (formInstance) {
			formInstance?.updateField(field!, finalValue, !formInstance.__manual_validate);
			await tick();
			value = finalValue;
		}
	};

	setContext(checkboxGroupKey, {
		// Passed to the checkbox component to register the checkbox in the context
		registerCheckbox,
		// Passed to the checkbox component to set the size during initialization
		size: sizeInnerForm || size,
		// Passed to the checkbox component to set the disable during initialization
		disabled: disabledInnerForm || disabled,
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
