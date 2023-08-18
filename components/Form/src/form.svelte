<script lang="ts">
	import { createForm } from './helper';
	import type { FormInstance } from './types';

	export const form: FormInstance = createForm();
</script>

<div>
	<slot {form} />
</div>
