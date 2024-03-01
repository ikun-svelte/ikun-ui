<script lang="ts">
	import { KSkeleton } from '../../src/index';
	let loading = true;
</script>

<KSkeleton {loading}>
	<div>hello</div>
</KSkeleton>
<button id="test_loading" on:click={() => (loading = false)}></button>
