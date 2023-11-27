<script>
	import KAlert from '../../src/index.svelte';

	$: visible = true;
</script>

<KAlert title="KAlert title" closable on:close={() => (visible = false)}>
	<span slot="close" id="alert-close">this is close slot</span>
</KAlert>
<div id="alert-console">{visible}</div>
