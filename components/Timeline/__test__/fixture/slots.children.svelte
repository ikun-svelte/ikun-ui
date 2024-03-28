<script lang="ts">
	import { KTimeline } from '@ikun-ui/timeline';
	import type { KTimelineItem } from '@ikun-ui/timeline';
	const items = [
		{
			children: 'Technical testing 2015-09-01'
		},
		{
			children: 'Network problems being solved'
		}
	] as KTimelineItem[];
</script>

<KTimeline {items}>
	<div slot="children" let:cls let:children class={cls}>🍒 {children}</div>
</KTimeline>
