<script lang="ts">
	import { createForm } from './helper';
	import type { IKunFormInstance } from './types';
	import { setContext } from 'svelte';
	import { formKey } from '@ikun-ui/utils';
	export const form: IKunFormInstance = createForm();
	// Set the form instance to the component context
	setContext(formKey, form);
</script>

<div>
	<slot {form} />
</div>
