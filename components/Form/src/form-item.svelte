<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import type { IKunFormInstance, FormContext } from '@ikun-ui/utils';
	import { getFormItemPath } from './helper';

	export let label: string = '';
	export let field: string = '';
	const form: IKunFormInstance = getContext('Form');
	const formContext: FormContext = getContext('FormContext');

	const currentPath = getFormItemPath(formContext?.path || '', field);
	setContext('FormContext', {
		form,
		path: currentPath,
		updateField: (value: any) => {
			form.setValue(currentPath, value);
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
