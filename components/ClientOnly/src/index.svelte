<script lang="ts">
	import { BROWSER } from 'esm-env';
</script>

{#if BROWSER}
	<slot />
{/if}
