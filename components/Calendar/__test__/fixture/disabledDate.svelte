<script>
	import { KCalendar } from '@ikun-ui/calendar';
	import dayjs from 'dayjs';
	let v = new dayjs('2024-04-25');
	const handleDisabled = (currentDate) => {
		if (currentDate.format('YYYY-MM-DD') === '2024-04-26') {
			return true;
		}

		if (currentDate.format('YYYY-MM') === '2024-06') {
			return true;
		}
		return false;
	};

	const handleSelect = (e) => {
		v = e.detail.date;
	};
</script>

<KCalendar fullscreen on:select={handleSelect} disabledDate={handleDisabled} value={v}></KCalendar>
<div id="test">{v.format('YYYY-MM-DD')}</div>
