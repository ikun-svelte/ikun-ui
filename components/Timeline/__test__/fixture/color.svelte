<script lang="ts">
	import { KTimeline } from '@ikun-ui/timeline';
	import type { KTimelineItem } from '@ikun-ui/timeline';
	const items = [
		{
			color: '#00ffff',
			children: 'Technical testing 2015-09-01'
		},
		{
			color: '#00ffff',
			children: 'Network problems being solved'
		}
	] as KTimelineItem[];
</script>

<KTimeline {items}></KTimeline>
