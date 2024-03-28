<script lang="ts">
	import { KTimeline } from '@ikun-ui/timeline';
	import type { KTimelineItem } from '@ikun-ui/timeline';
	import { KButton } from '@ikun-ui/button';
	const items = [
		{
			uid: 'Create a services site 2015-09-01',
			children: 'Create a services site 2015-09-01'
		},
		{
			uid: 'Solve initial network problems 2015-09-01',
			children: 'Solve initial network problems 2015-09-01'
		},
		{
			uid: 'Technical testing 2015-09-01',
			children: 'Technical testing 2015-09-01'
		},
		{
			uid: 'Network problems being solved 2015-09-01',
			children: 'Network problems being solved 2015-09-01'
		}
	] as KTimelineItem[];
	let reverse = false;
</script>

<KTimeline {items} pending="Recording..." {reverse}></KTimeline>
<KButton
	on:click={() => {
		reverse = !reverse;
	}}
	type="primary">Toggle Reverse</KButton
>
