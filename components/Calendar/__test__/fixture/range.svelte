<script>
	import { KCalendar } from '@ikun-ui/calendar';
	import dayjs from 'dayjs';
	let v = dayjs('2024-04-25');
	const range = [dayjs('2024-04-24'), dayjs('2024-04-26')];
</script>

<KCalendar fullscreen mode="month" validRange={range} value={v}></KCalendar>
