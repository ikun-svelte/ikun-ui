<script lang="ts">
	import { KTimeline } from '@ikun-ui/timeline';
	import type { KTimelineItem } from '@ikun-ui/timeline';
	const items = [
		{
			position: 'right',
			children: 'Technical testing 2015-09-01'
		},
		{
			position: 'left',
			children: 'Network problems being solved'
		}
	] as KTimelineItem[];
</script>

<KTimeline {items} mode="alternate"></KTimeline>
