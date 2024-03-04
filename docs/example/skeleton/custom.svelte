<script lang="ts">
	import { KSkeleton } from '@ikun-ui/skeleton';
	import { KFlex } from '@ikun-ui/flex';
	import { KSwitch } from '@ikun-ui/switch';
	let loading = true;
	function changeLoading(e) {
		loading = e.detail;
	}
</script>

<KFlex align="center">
	Active:
	<KSwitch value={loading} on:updateValue={changeLoading} cls="ml-2" />
</KFlex>

<KSkeleton {loading}>
	<div slot="skeleton">ikun-ui</div>
	<div>content</div>
</KSkeleton>
