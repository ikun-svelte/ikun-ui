<script lang="ts">
	import { KInputNumber } from '@ikun-ui/input-number';
	let num = 1;
	const handleInput = (value: CustomEvent) => {
		num = value.detail;
	};
</script>

<KInputNumber value={num} on:input={handleInput} cls="w-120px" step={2} />
<p class="px-2">{num}</p>
