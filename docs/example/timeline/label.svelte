<script lang="ts">
	import { KTimeline } from '@ikun-ui/timeline';
	import type { KTimelineItem } from '@ikun-ui/timeline';
	import { KRadio } from '@ikun-ui/radio';
	import { KRadioGroup } from '@ikun-ui/radio-group';
	const items = [
		{
			uid: 'Create a services site 2015-09-01',
			label: '2015-09-01',
			children: 'Create a services site'
		},
		{
			uid: 'Solve initial network problems 2015-09-01',
			label: '2015-09-01 09:12:11',
			children: 'Solve initial network problems'
		},
		{
			uid: 'Technical testing 2015-09-01',
			children: 'Technical testing'
		},
		{
			uid: 'Network problems being solved 2015-09-01',
			label: '2015-09-01 09:12:11',
			children: 'Network problems being solved'
		}
	] as KTimelineItem[];

	let mode = 'alternate';
	const handleUpdated = (e) => {
		mode = e.detail;
	};
</script>

<KRadioGroup value={mode} on:updateValue={handleUpdated}>
	<KRadio uid="left">Left</KRadio>
	<KRadio uid="alternate">Alternate</KRadio>
	<KRadio uid="right">Right</KRadio>
</KRadioGroup>

<KTimeline {items} {mode}></KTimeline>
