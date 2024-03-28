<script lang="ts">
	import { KTimeline } from '@ikun-ui/timeline';
	import type { KTimelineItem } from '@ikun-ui/timeline';
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
</script>

<KTimeline {items}>
	<div slot="dot" let:cls class={cls} style:top="-5px" style:left="calc(50% - 5px)">⭕</div>
	<div slot="children" let:cls let:children class={cls}>🍒 {children}</div>
	<div slot="label" let:cls let:label class={cls}>🔥 {label}</div>
</KTimeline>
