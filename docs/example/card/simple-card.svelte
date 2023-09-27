<script>
	import { KCard } from '@ikun-ui/card';

	const components = ['KAlert', 'KAvatar', 'KButton', 'KCard'];
</script>

<KCard>
	<div class="my-4px">IKun UI is a component library based on svelte.</div>
	{#each components as component}
		<div class="my-4px">{component}</div>
	{/each}
</KCard>
