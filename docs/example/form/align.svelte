<script lang="ts">
	import { KForm, KFormItem } from '@ikun-ui/form';
	import { KInput } from '@ikun-ui/input';
	import { KButton } from '@ikun-ui/button';
	import { KButtonGroup } from '@ikun-ui/button-group';
	import { KSwitch } from '@ikun-ui/switch';
	import { KRadioGroup } from '@ikun-ui/radio-group';
	import { KRadio } from '@ikun-ui/radio';
	import { KCheckbox } from '@ikun-ui/checkbox';
	import { KSelect } from '@ikun-ui/select';
	import { KCheckboxGroup } from '@ikun-ui/checkbox-group';
	import { KRate } from '@ikun-ui/rate';
	import { KSlider } from '@ikun-ui/slider';
	const initValue = {
		name: 'Ikun',
		KInputs: {
			KInputs1: 'KInputs1',
			KInputs2: 'KInputs2'
		},
		KSwitch: true,
		KRate: null,
		KRadio: '',
		KCheckbox: [],
		KSelect: null,
		KSelectString: '',
		textarea: '',
		slider: 43
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

	let labelPosition: 'horizontal' | 'vertical' = 'horizontal';
	const handleLabelPosition = (v: 'horizontal' | 'vertical') => {
		labelPosition = v;
	};

	let labelAlign: 'left' | 'right' | 'center' = 'right';
	const handleLabelAlign = (v: 'left' | 'right' | 'center') => {
		labelAlign = v;
	};
</script>

<KForm {initValue} {labelPosition} {labelAlign} bind:this={KFormInst}>
	<KFormItem label="labelAlign">
		<KButtonGroup>
			<KButton on:click={() => handleLabelAlign('right')} type="primary">right</KButton>
			<KButton on:click={() => handleLabelAlign('center')} type="primary">center</KButton>
			<KButton on:click={() => handleLabelAlign('left')} type="primary">left</KButton>
		</KButtonGroup>
	</KFormItem>

	<KFormItem label="labelPosition">
		<KButtonGroup>
			<KButton on:click={() => handleLabelPosition('horizontal')} type="primary"
				>horizontal
			</KButton>
			<KButton on:click={() => handleLabelPosition('vertical')} type="primary">vertical</KButton>
		</KButtonGroup>
	</KFormItem>

	<KFormItem field="name" label="Name">
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
	<KFormItem field="KSwitch" label="KSwitch">
		<KSwitch />
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
	<KFormItem field="KSelect" label="KSelect">
		<KSelect clearable dataList={['Tiny', 'Small', 'Normal', 'Large', 'Huge']}></KSelect>
	</KFormItem>
	<KFormItem field="textarea" label="textarea">
		<KInput placeholder="Please input value" type="textarea" cls="w-240px" autosize></KInput>
	</KFormItem>
	<KFormItem field="slider" label="slider">
		<KSlider cls="w-300px"></KSlider>
	</KFormItem>
	<KFormItem>
		<KButton on:click={handleValidate}>Submit</KButton>
		<KButton ghost on:click={handleReset}>Reset</KButton>
	</KFormItem>
</KForm>
