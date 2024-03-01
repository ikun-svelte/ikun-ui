<script lang="ts">
	import { KSkeleton } from '../../src/index';
	let avatar = true;
</script>

<KSkeleton loading {avatar}>
	<div>hello</div>
</KSkeleton>
<button id="test_avatar" on:click={() => (avatar = false)}></button>
