<script lang="ts">
	import { createForm } from './helper';
	import type { FormInstance } from './types';
	import { setContext } from 'svelte';

	export const form: FormInstance = createForm();
	setContext('Form', form);
</script>

<div>
	<slot {form} />
</div>
