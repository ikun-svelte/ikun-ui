<script lang="ts">
	import { KForm, KFormItem } from '@ikun-ui/form';
	import { KInput } from '@ikun-ui/input';
	import { KButton } from '@ikun-ui/button';
	const initValue = {
		name: 'Ikun',
		foo: ''
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
</script>

<KForm {initValue} bind:this={KFormInst}>
	<KFormItem field="name" label="Name">
		<KInput placeholder="Please input value"></KInput>
	</KFormItem>
	<KFormItem field="foo" label="Foo">
		<KInput placeholder="Please input value"></KInput>
	</KFormItem>
	<KFormItem>
		<KButton on:click={handleValidate}>Submit</KButton>
		<KButton ghost on:click={handleReset}>Reset</KButton>
	</KFormItem>
</KForm>
