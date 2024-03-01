<script lang="ts">
	import { KSkeleton } from '../../src/index';
	import type { KSkeletonParagraphProps } from '../../src/types';
	let paragraph = {
		active: true,
		size: 'lg'
	} as KSkeletonParagraphProps;
</script>

<KSkeleton loading {paragraph} size="sm" active={false} title={false} avatar={false}>
	<div>hello</div>
</KSkeleton>
