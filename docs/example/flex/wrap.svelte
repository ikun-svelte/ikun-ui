<script lang="ts">
	import { KFlex } from '@ikun-ui/flex';
	import { KButton } from '@ikun-ui/button';
	const arrs = Array.from({ length: 24 });
</script>

<KFlex gap="sm" wrap="wrap">
	{#each arrs as item}
		<KButton cls="!ml-0" id={item}>button</KButton>
	{/each}
</KFlex>
