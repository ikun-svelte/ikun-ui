<script lang="ts">
	import { checkboxGroupKey, getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KCheckboxGroupProps, checkboxMapType, checkboxMapItem } from './types';
	import { createEventDispatcher, setContext } from 'svelte';
	import { jsonClone } from 'baiwusanyu-utils';

	export let disabled: KCheckboxGroupProps['disabled'] = false;
	// 与 checkbox uid 对应
	export let value: KCheckboxGroupProps['value'] = [];
	export let cls: KCheckboxGroupProps['cls'] = undefined;
	export let attrs: KCheckboxGroupProps['attrs'] = {};
	// updateValue
	const dispatch = createEventDispatcher();
	const checkboxMap: checkboxMapType = new Map();

	// value 变化 同步 checkbox value 值
	let valueInner = value;
	$: if (valueInner !== value) {
		if (!disabled) {
			// 当 checkbox group 变化时，同步 value 到 checkbox
			valueInner.forEach((v: string | number) => {
				setCheckBoxValue(v.toString());
			});
			// TODO patch
			console.log(valueInner.length);
			if (valueInner.length === 0) {
				value.forEach((v: string | number) => {
					setCheckBoxValue(v.toString());
				});
			}
			valueInner = value;
		}
	}

	// disable 变化 同步 checkbox disable 状态
	let disabledInner = disabled;
	$: if (disabledInner !== disabled) {
		Array.from(checkboxMap.values()).forEach((m: checkboxMapItem) => {
			m.setDisabled(disabled);
		});
		disabledInner = disabled;
	}
	// 注册 checkbox
	const registerCheckbox = (
		uid: string | number,
		op: {
			doUpdatedValue: (v: boolean, inner?: boolean) => void;
			setDisabled: (v: boolean) => void;
		}
	) => {
		checkboxMap.set(uid.toString(), op);
		// 根据 checkbox group 值，设置 checkbox
		setCheckBoxValue(uid.toString());
	};

	// 根据 checkbox group 值，设置 checkbox
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

	// 当 checkbox 变化时， 更新 checkboxGroup 值
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
	// ✅ disabled 时可以初始化值
	// ✅ disabled 时value 变化 ，不能 change 所有checkbox值
	// ✅ disabled 变化时，值时 value 最新值

	// ✅ disabled 时，value 变化 , change 所有checkbox值
	// ✅ 非 disabled 时，可以初始值
	// ✅ 非 disabled 时，checkbox 有一个值变化时，则触发 group 值
	setContext(checkboxGroupKey, {
		// 传递给 checkbox 组件，注册 checkbox
		registerCheckbox,
		// 传递给 checkbox 组件， 设置禁用
		disabled,
		// 传递给 checkbox 组件， 更新 checkboxGroup valueInner
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
