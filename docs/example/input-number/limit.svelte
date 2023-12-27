<script lang="ts">
	import { KInputNumber } from '@ikun-ui/input-number';
	let num = 2;
	const handleInput = (value: CustomEvent) => {
		num = value.detail;
	};
</script>

<KInputNumber value={num} on:input={handleInput} cls="w-120px" min={2} max={10} step={4} />
<p class="px-2">{num}</p>
