<script lang="ts">
	import { KSkeleton } from '../../src/index';
	let paragraph = true;
</script>

<KSkeleton loading {paragraph}>
	<div>hello</div>
</KSkeleton>
<button id="test_paragraph" on:click={() => (paragraph = false)}></button>
