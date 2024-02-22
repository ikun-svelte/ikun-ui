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
	import { KSlider } from '@ikun-ui/slider';
	import { KInputNumber } from '@ikun-ui/input-number';
	import { KAutoComplete } from '@ikun-ui/auto-complete';
	const initValue = {
		KInput: 'KInput',
		KSwitch: true,
		KRate: 4,
		KInputNumber: 4,
		KRadio: '3',
		KCheckbox: ['2'],
		KSelect: { label: '不知明镜里', value: '不知', id: '3' },
		KSelectString: 'Huge',
		slider: 43,
		KAutoComplete: '白雾三语'
	};
	let KFormInst: KForm | undefined = undefined;
	const dataList = [
		{ label: '白发三千丈', value: '白发', id: '1' },
		{ label: '缘愁似个长', value: '缘愁', id: '2' },
		{ label: '不知明镜里', value: '不知', id: '3' },
		{ label: '何处得秋霜', value: '何处', id: '4' }
	];

	let size = 'sm';

	const restaurants = [
		{ value: 'vue', link: 'https://github.com/vuejs/vue' },
		{ value: 'element', link: 'https://github.com/ElemeFE/element' },
		{ value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
		{ value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
		{ value: 'vuex', link: 'https://github.com/vuejs/vuex' },
		{ value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
		{ value: 'babel', link: 'https://github.com/babel/babel' }
	];
	const createFilter = (queryString) => {
		return (restaurant) => {
			return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
		};
	};
	const fetchFn = (queryString, cb) => {
		const results = queryString ? restaurants.filter(createFilter(queryString)) : restaurants;
		cb(results);
	};
</script>

<KForm {initValue} {size} bind:this={KFormInst}>
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
	<KFormItem field="KAutoComplete" label="KAutoComplete">
		<KAutoComplete cls="w-300px" fetchSuggestions={fetchFn}></KAutoComplete>
	</KFormItem>
</KForm>

<button id="size_lg" on:click={() => (size = 'lg')}></button>
<button id="size_md" on:click={() => (size = 'md')}></button>
<button id="size_sm" on:click={() => (size = 'sm')}></button>
