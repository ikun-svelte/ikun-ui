<script lang="ts">
	import { KForm, KFormItem } from '@ikun-ui/form';
	import { KInput } from '@ikun-ui/input';
	export let initValue = {
		KInput: 'KInput'
	};
	let KFormInst: KForm | undefined = undefined;

	const rules = {
		KInput: [
			{ required: true, msg: 'KInput required' },
			{ min: 3, max: 5, msg: 'KInput 3 ~5' }
		]
	};

	const handleValidate = () => {
		if (KFormInst) {
			KFormInst.validateField('KInput');
		}
	};
</script>

<KForm {initValue} {rules} labelWidth={120} bind:this={KFormInst}>
	<KFormItem field="KInput" label="KInput-Label">
		<div slot="error">Error-Slot</div>
		<KInput placeholder="Please input value"></KInput>
	</KFormItem>
</KForm>
<button id="validate" on:click={handleValidate}>validate</button>
