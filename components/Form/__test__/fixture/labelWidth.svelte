<script lang="ts">
	import { KForm, KFormItem } from '@ikun-ui/form';
	import { KInput } from '@ikun-ui/input';
	const initValue = {
		KInput: 'KInput',
		KSwitch: true,
		KRate: 4,
		KRadio: '3',
		KCheckbox: ['2'],
		KSelect: { label: '不知明镜里', value: '不知', id: '3' },
		KSelectString: 'Huge'
	};
	let KFormInst: KForm | undefined = undefined;
	let w = 200;
</script>

<KForm {initValue} labelWidth={w} bind:this={KFormInst}>
	<KFormItem field="KInput" label="KInput">
		<KInput placeholder="Please input value"></KInput>
	</KFormItem>
</KForm>
<button on:click={() => (w = 100)}></button>
