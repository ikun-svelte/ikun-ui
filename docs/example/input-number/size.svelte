<script lang="ts">
	import { KInputNumber } from '@ikun-ui/input-number';
	let num = 2;
	const handleInput = (value: CustomEvent) => {
		num = value.detail;
	};
</script>

<div class="flex">
	<KInputNumber size="sm" value={num} on:input={handleInput} cls="w-120px" precision={2} />
	<KInputNumber size="md" value={num} on:input={handleInput} cls="w-120px mx-4" precision={2} />
	<KInputNumber size="lg" value={num} on:input={handleInput} cls="w-120px" precision={2} />
</div>
