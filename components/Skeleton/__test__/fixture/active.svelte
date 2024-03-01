<script lang="ts">
	import { KSkeleton } from '../../src/index';
	let active = true;
</script>

<KSkeleton loading avatar {active}>
	<div>hello</div>
</KSkeleton>
<button id="test_active" on:click={() => (active = false)}></button>
