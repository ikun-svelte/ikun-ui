<script lang="ts">
	import { KCalendar } from '@ikun-ui/calendar';
	import dayjs from 'dayjs';
	let value = dayjs('2024-04-25');
	const onSelect = (e: CustomEvent) => {
		value = e.detail.date;
	};
</script>

<KCalendar {value} fullscreen={false} on:select={onSelect}></KCalendar>
