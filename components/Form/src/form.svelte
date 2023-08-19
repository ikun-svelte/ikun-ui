<script lang="ts">
	import { createForm } from './helper';
	import type { IKunFormInstance } from '@ikun-ui/utils';
	import { onMount, setContext } from 'svelte';
	export const form: IKunFormInstance = createForm();
	onMount(() => {
		console.log('@Form start');
	});
	setContext('Form', form);
</script>

<div>
	<slot {form} />
</div>
