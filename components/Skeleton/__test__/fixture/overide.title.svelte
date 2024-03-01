<script lang="ts">
	import { KSkeleton } from '../../src/index';
	import type { KSkeletonTitleProps } from '../../src/types';
	let title = {
		active: true,
		size: 'lg'
	} as KSkeletonTitleProps;
</script>

<KSkeleton loading {title} size="sm" active={false} paragraph={false} avatar={false}>
	<div>hello</div>
</KSkeleton>
