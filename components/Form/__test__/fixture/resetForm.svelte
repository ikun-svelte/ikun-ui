<script lang="ts">
	import { KForm, KFormItem } from '@ikun-ui/form';
	import { KInput } from '@ikun-ui/input';
	import { KSwitch } from '@ikun-ui/switch';
	import { KRate } from '@ikun-ui/rate';
	import { KRadio } from '@ikun-ui/radio';
	import { KRadioGroup } from '@ikun-ui/radio-group';
	import { KCheckbox } from '@ikun-ui/checkbox';
	import { KCheckboxGroup } from '@ikun-ui/checkbox-group';
	import { KSelect } from '@ikun-ui/select';
	import { createEventDispatcher } from 'svelte';
	import { KSlider } from '@ikun-ui/slider';
	import { KInputNumber } from '@ikun-ui/input-number';
	export let initValue = {};
	let KFormInst: KForm | undefined = undefined;
	const dataList = [
		{ label: '白发三千丈', value: '白发', id: '1' },
		{ label: '缘愁似个长', value: '缘愁', id: '2' },
		{ label: '不知明镜里', value: '不知', id: '3' },
		{ label: '何处得秋霜', value: '何处', id: '4' }
	];

	const rules = {
		KInput: [
			{ required: true, msg: 'KInput required' },
			{ min: 3, max: 5, msg: 'KInput 3 ~5' }
		],
		KInputNumber: [
			{ required: true, msg: 'KInputNumber required' },
			{ min: 3, max: 5, msg: 'KInputNumber 3 ~5' }
		],
		KSwitch: [
			{
				required: true,
				msg: 'KSwitch error'
			}
		],
		KRate: [
			{
				required: true,
				msg: 'KRate error'
			}
		],
		KRadio: [
			{
				required: true,
				msg: 'KRadio error'
			}
		],
		KCheckbox: [
			{
				required: true,
				msg: 'KRadio error'
			}
		],
		KSelect: [
			{
				required: true,
				msg: 'KSelect error'
			}
		],
		KSelectString: [
			{
				required: true,
				msg: 'KSelectString error',
				validator: (value, callback) => {
					if (!value) {
						callback('KSelectString custom error');
					}
				}
			}
		]
	};

	const dispatch = createEventDispatcher();
	const handleValidate = () => {
		if (KFormInst) {
			KFormInst.validateForm((data, isValid, invalidFields) => {
				dispatch('getRes', {
					data,
					isValid,
					invalidFields
				});
			});
		}
	};

	const handleReset = () => {
		if (KFormInst) {
			KFormInst.resetForm();
		}
	};
</script>

<KForm {initValue} {rules} labelWidth="120" bind:this={KFormInst}>
	<KFormItem field="KInput" label="KInput">
		<KInput placeholder="Please input value"></KInput>
	</KFormItem>
	<KFormItem field="KSwitch" label="KSwitch">
		<KSwitch />
	</KFormItem>
	<KFormItem field="KRate" label="KRate">
		<KRate clearable />
	</KFormItem>
	<KFormItem field="KInputNumber" label="KInputNumber">
		<KInputNumber />
	</KFormItem>
	<KFormItem field="KRadio" label="KRadio">
		<KRadioGroup>
			<KRadio uid="1">KRadio 1</KRadio>
			<KRadio uid="2">KRadio 2</KRadio>
			<KRadio uid="3">KRadio 3</KRadio>
			<KRadio uid="4" disabled>KRadio 4</KRadio>
		</KRadioGroup>
	</KFormItem>
	<KFormItem field="KCheckbox" label="KCheckbox">
		<KCheckboxGroup>
			<KCheckbox uid="1">KCheckbox 1</KCheckbox>
			<KCheckbox uid="2">KCheckbox 2</KCheckbox>
			<KCheckbox uid="3">KCheckbox 3</KCheckbox>
			<KCheckbox uid="4" disabled>KCheckbox 4</KCheckbox>
		</KCheckboxGroup>
	</KFormItem>

	<KFormItem field="KSelect" label="KSelect">
		<KSelect {dataList} labelKey="label" valueKey="value" key="id"></KSelect>
	</KFormItem>
	<KFormItem field="KSelectString" label="KSelectString">
		<KSelect dataList={['Tiny', 'Small', 'Normal', 'Large', 'Huge']}></KSelect>
	</KFormItem>
	<KFormItem field="slider" label="slider">
		<KSlider cls="w-300px"></KSlider>
	</KFormItem>
</KForm>
<button id="validate" on:click={handleValidate}>validate</button>
<button id="reset" on:click={handleReset}>reset</button>
