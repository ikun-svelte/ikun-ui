<script lang="ts">
	import { KSkeleton } from '../../src/index';
	let title = true;
</script>

<KSkeleton loading {title}>
	<div>hello</div>
</KSkeleton>
<button id="test_title" on:click={() => (title = false)}></button>
