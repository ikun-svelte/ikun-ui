<script lang="ts">
	import { createForm } from './helper';
	import type { IKunFormInstance } from '@ikun-ui/utils';
	import { setContext } from 'svelte';

	export const form: IKunFormInstance = createForm();
	setContext('Form', form);
</script>

<div>
	<slot {form} />
</div>
