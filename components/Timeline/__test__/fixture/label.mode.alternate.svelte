<script lang="ts">
	import { KTimeline } from '@ikun-ui/timeline';
	import type { KTimelineItem } from '@ikun-ui/timeline';
	const items = [
		{
			label: 'ikun ui 1',
			children: 'Technical testing 2015-09-01'
		},
		{
			label: 'ikun ui 2',
			children: 'Network problems being solved'
		}
	] as KTimelineItem[];
</script>

<KTimeline {items} mode="alternate"></KTimeline>
