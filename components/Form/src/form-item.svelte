<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import type { IKunFormInstance } from '@ikun-ui/utils';

	export let label: string = '';
	export let field: string = '';

	const form: IKunFormInstance = getContext('Form');
	setContext('$form', form);
	setContext('$updateField', (value: any) => {
		form.setValue(field, value);
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
