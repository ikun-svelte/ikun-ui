<script lang="ts">
	import { KForm, KFormItem } from '@ikun-ui/form';
	import { KInput } from '@ikun-ui/input';
	import { KButton } from '@ikun-ui/button';
	import { KSwitch } from '@ikun-ui/switch';
	import { KRadioGroup } from '@ikun-ui/radio-group';
	import { KRadio } from '@ikun-ui/radio';
	import { KCheckbox } from '@ikun-ui/checkbox';
	import { KSelect } from '@ikun-ui/select';
	import { KCheckboxGroup } from '@ikun-ui/checkbox-group';
	import { KRate } from '@ikun-ui/rate';
	import { KInputNumber } from '@ikun-ui/input-number';
	import { KColorPicker } from '@ikun-ui/color-picker';
	const initValue = {
		KInput: '',
		KInputs: {
			KInputs1: 'KInputs1',
			KInputs2: 'KInputs2'
		},
		KInputNumber: null,
		KSwitch: true,
		KColorPicker: null,
		KRate: null,
		KRadio: '',
		KCheckbox: [],
		KSelect: null,
		KSelectString: '',
		textarea: ''
	};
	let KFormInst: KForm | undefined = undefined;
	const handleValidate = () => {
		if (KFormInst) {
			KFormInst.validateForm((data, isValid, invalidFields) => {
				console.log(data, isValid, invalidFields);
				if (isValid) {
					// submit
					console.log('submit');
				}
			});
		}
	};

	const handleReset = () => {
		KFormInst && KFormInst.resetForm();
	};

	const rules = {
		KInput: [
			{ required: true, msg: 'KInput required' },
			{ min: 3, max: 5, msg: 'KInput 3 ~5' }
		],
		KInputNumber: [
			{ required: true, msg: 'KInputNumber required' },
			{ min: 3, max: 5, msg: 'KInputNumber 3 ~5' }
		],
		KInputs: [
			{ required: true, msg: 'KInput required' },
			{ min: 3, max: 5, msg: 'KInput 3 ~5' }
		],
		'KInputs.KInputs1': [
			{ required: true, msg: 'KInputs1 required' },
			{ min: 3, max: 5, msg: 'KInputs1 3 ~5' }
		],
		'KInputs.KInputs2': [
			{ required: true, msg: 'KInputs2 required' },
			{ min: 3, max: 5, msg: 'KInputs2 3 ~5' }
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
				msg: 'KCheckbox error'
			}
		],
		KSelect: [
			{
				required: true,
				msg: 'KSelect error',
				validator: (value: any, callback: any) => {
					if (!value) {
						callback('KSelect custom error');
					}
				}
			}
		],

		KColorPicker: [
			{
				required: true,
				msg: 'KColorPicker error',
				validator: (value: any, callback: any) => {
					if (!value) {
						callback('KColorPicker custom error');
					}
				}
			}
		],
		textarea: [
			{
				required: true,
				msg: 'textarea error'
			}
		]
	};
</script>

<KForm {initValue} {rules} bind:this={KFormInst}>
	<KFormItem field="KInput" label="KInput">
		<KInput placeholder="Please input value"></KInput>
	</KFormItem>
	<KFormItem field="KInputs" label="KInput">
		<KFormItem field="KInputs.KInputs1" label="" cls="mr-3">
			<KInput placeholder="Please input value"></KInput>
		</KFormItem>
		<KFormItem field="KInputs.KInputs2" label="">
			<KInput placeholder="Please input value"></KInput>
		</KFormItem>
	</KFormItem>
	<KFormItem field="KInputNumber" label="KInputNumber">
		<KInputNumber placeholder="KInputNumber" />
	</KFormItem>
	<KFormItem field="KSwitch" label="KSwitch">
		<KSwitch />
	</KFormItem>
	<KFormItem field="KColorPicker" label="KColorPicker">
		<KColorPicker defaultValue="#f8a153" allowClear format="hex" showText></KColorPicker>
	</KFormItem>
	<KFormItem field="KRate" label="KRate">
		<KRate clearable />
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
	<KFormItem field="KSelect" label="Custom Rule">
		<KSelect clearable dataList={['Tiny', 'Small', 'Normal', 'Large', 'Huge']}></KSelect>
	</KFormItem>
	<KFormItem field="textarea" label="textarea">
		<KInput placeholder="Please input value" type="textarea" cls="w-240px" autosize></KInput>
	</KFormItem>
	<KFormItem>
		<KButton on:click={handleValidate}>Submit</KButton>
		<KButton ghost on:click={handleReset}>Reset</KButton>
	</KFormItem>
</KForm>
