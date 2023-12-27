<script lang="ts">
	import { KForm, KFormItem } from '@ikun-ui/form';
	import { KInputNumber } from '@ikun-ui/input-number';
	const initValue = {
		KInputNumber: null
	};
	let KFormInst: KForm | undefined = undefined;
	const handleReset = () => {
		KFormInst && KFormInst.resetForm();
	};

	const rules = {
		KInputNumber: [
			{ required: true, msg: 'KInputNumber required' },
			{ min: 3, max: 5, msg: 'KInputNumber 3 ~5' }
		]
	};
</script>

<KForm {initValue} {rules} bind:this={KFormInst}>
	<KFormItem field="KInputNumber" label="KInputNumber">
		<KInputNumber placeholder="KInputNumber" />
	</KFormItem>
</KForm>
<button id="reset" on:click={handleReset}>reset</button>
