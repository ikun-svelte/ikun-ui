<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import type { IKunFormInstance, FormContext } from '@ikun-ui/utils';
	import { getFormItemPath } from './helper';

	export let label: string = '';
	export let field: string = '';
	export let initialValue: string = '';
	// Set the component instance from the component context
	const form: IKunFormInstance = getContext('Form');
	// Get the form component context from the
	// component context (nested use of form-item.svelte)
	const formContext: FormContext = getContext('FormContext');
	// Set path according to `formContext.path` and `field`
	const currentPath = getFormItemPath(formContext?.path || '', field);
	// Set form component context
	const currentContext = {
		form,
		__FormContext__: true,
		initialValue: undefined,
		path: currentPath,
		updateField: (value: any) => {
			// It will be called when the value of the component changes,
			// and the related value will be updated to the corresponding field of the form instance
			// TODO: validate field
			form.setValue(currentPath, value);
		},
		initialField: (initialValueFromComponent: any) => {
			// get initValue ,initialValue is entered by the user, so initialValue is preferred.
			const initValue = initialValue !== undefined ? initialValue : initialValueFromComponent;
			// save this initValue, it will used in form.resetValues.
			currentContext.initialValue = initValue;
			form.setValue(currentPath, initValue);
			// record all leaf Context.
			form.setContext(currentPath, currentContext as FormContext);
		},
		// The subscription method will be called in the component
		// and register related callback functions
		subscribe: (callback: (value: any) => void) => {
			// Register the callback function of the component to
			// the form instance according to the currentPath
			form.subscribe(currentPath, (value: any) => {
				callback(value);
			});
		}
	};
	setContext('FormContext', currentContext);
</script>

<div class="k-form-item">
	<div class="k-form-item-content">
		{#if $$slots.label}
			<div class="k-form-item-label">
				<slot name="label" />
			</div>
		{/if}
		{#if !$$slots.label && label}
			<div class="k-form-item-label">
				{label}
			</div>
		{/if}
		<slot />
	</div>
</div>
