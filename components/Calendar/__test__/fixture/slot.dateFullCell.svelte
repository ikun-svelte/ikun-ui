<script>
	import { KCalendar } from '@ikun-ui/calendar';
	import dayjs from 'dayjs';
	let v = dayjs('2024-04-25');
</script>

<KCalendar fullscreen value={v}>
	<div slot="dateFullCell" let:date>{date.instance.date()}</div>
</KCalendar>
