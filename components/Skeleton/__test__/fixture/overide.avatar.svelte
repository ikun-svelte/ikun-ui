<script lang="ts">
	import { KSkeleton } from '../../src/index';
	import type { KSkeletonAvatarProps } from '../../src/types';
	let avatar = {
		active: true,
		size: 'lg'
	} as KSkeletonAvatarProps;
</script>

<KSkeleton loading {avatar} size="sm" active={false} paragraph={false} title={false}>
	<div>hello</div>
</KSkeleton>
