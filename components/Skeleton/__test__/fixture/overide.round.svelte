<script lang="ts">
	import { KSkeleton } from '../../src/index';
	let round = false;
</script>

<KSkeleton loading avatar {round} title={{ round: true }} paragraph={{ round: true }}>
	<div>hello</div>
</KSkeleton>
