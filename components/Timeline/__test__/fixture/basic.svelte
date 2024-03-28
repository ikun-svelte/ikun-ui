<script lang="ts">
	import { KTimeline } from '@ikun-ui/timeline';
	import type { KTimelineItem } from '@ikun-ui/timeline';
	const items = [
		{
			uid: '1',
			children: 'Technical testing 2015-09-01'
		},
		{
			uid: '2',
			children: 'Network problems being solved'
		}
	] as KTimelineItem[];
</script>

<KTimeline {items}></KTimeline>
