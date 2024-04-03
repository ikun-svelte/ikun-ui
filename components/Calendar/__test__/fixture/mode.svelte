<script>
	import { KCalendar } from '@ikun-ui/calendar';
	import dayjs from 'dayjs';
	const v = new dayjs('2024-04-25');
</script>

<KCalendar fullscreen mode="month" value={v}></KCalendar>
