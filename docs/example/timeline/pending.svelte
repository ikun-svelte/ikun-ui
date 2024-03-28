<script lang="ts">
	import { KTimeline } from '@ikun-ui/timeline';
	import type { KTimelineItem } from '@ikun-ui/timeline';
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
			uid: 'ikun ui',
			children: 'ikun ui'
		}
	] as KTimelineItem[];
</script>

<KTimeline {items} pending>
	<div slot="pendingDot" let:cls class={cls} style:top="-5px" style:left="-5px">❌</div>
	<div slot="pending" let:cls class={cls} let:children>
		pending...🏀 {children}
	</div>
</KTimeline>
