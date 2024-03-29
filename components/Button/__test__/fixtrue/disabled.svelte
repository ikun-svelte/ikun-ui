<script>
	import { KButton } from '@ikun-ui/button';
	let disabled = false;
</script>

<KButton {disabled} on:click={() => (disabled = !disabled)}>
	{disabled}
</KButton>
