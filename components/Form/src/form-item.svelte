<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import type { IKunFormInstance, FormContext } from '@ikun-ui/utils';
	import { getFormItemPath } from './helper';

	export let label: string = '';
	export let field: string = '';
	// Set the component instance from the component context
	const form: IKunFormInstance = getContext('Form');
	// Get the form component context from the
	// component context (nested use of form-item.svelte)
	const formContext: FormContext = getContext('FormContext');
	// Set path according to `formContext.path` and `field`
	const currentPath = getFormItemPath(formContext?.path || '', field);
	// Set form component context
	setContext('FormContext', {
		form,
		path: currentPath,
		updateField: (value: any) => {
			// It will be called when the value of the component changes,
			// and the related value will be updated to the corresponding field of the form instance
			// TODO: validate field
			form.setValue(currentPath, value);
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
	});
</script>

<div class="k-form-item">
	<div class="k-form-item-content">
		{#if $$slots.label || label}
			<div class="k-form-item-label">
				<slot name="label" />
				{#if !$$slots.label && label}
					{label}
				{/if}
			</div>
		{/if}
		<slot />
	</div>
</div>
