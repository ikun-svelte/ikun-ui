<script>
	import { KCalendar } from '@ikun-ui/calendar';
	import dayjs from 'dayjs';
	let v = dayjs('2024-04-25');
</script>

<KCalendar fullscreen value={v}>
	<div slot="monthCell" let:month>{month.instance.month()}</div>
</KCalendar>
