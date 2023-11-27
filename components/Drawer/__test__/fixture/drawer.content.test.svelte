<script>
	import KDrawer from '../../src/index.svelte';
</script>

<KDrawer value={true} on:close={close}>
	<div class="w-full fc" id="k_drawer_content">
		<h2 class="w-300px text-center !my-2">
			A person's loneliness, never had the lonely mood is wrapped by this dark night.
		</h2>
	</div>
</KDrawer>
