<script lang="ts">
	import { KTimeline } from '@ikun-ui/timeline';
	import type { KTimelineItem } from '@ikun-ui/timeline';
	const items = [
		{
			position: 'left',
			children: 'Technical testing 2015-09-01'
		},
		{
			position: 'right',
			children: 'Network problems being solved'
		}
	] as KTimelineItem[];
</script>

<KTimeline {items} mode="left"></KTimeline>
