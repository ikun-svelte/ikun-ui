<script lang="ts">
	import { KSkeleton } from '../../src/index';
	let round = true;
</script>

<KSkeleton loading avatar {round}>
	<div>hello</div>
</KSkeleton>
<button id="test_round" on:click={() => (round = false)}></button>
