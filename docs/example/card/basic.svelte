<script>
	import { KCard } from '@ikun-ui/card';

	const components = ['KAlert', 'KAvatar', 'KButton', 'KCard'];
</script>

<div class="fi">
	<KCard cls="mx-10px" title="Card Name Set By title attribute">
		<div class="my-4px">IKun UI is a component library based on svelte.</div>
		{#each components as component}
			<div class="my-4px">{component}</div>
		{/each}
	</KCard>
	<KCard cls="mx-10px">
		<div slot="header">Card Name Set By header slot</div>
		<div class="my-4px">IKun UI is a component library based on svelte.</div>
		{#each components as component}
			<div class="my-4px">{component}</div>
		{/each}
	</KCard>
</div>
