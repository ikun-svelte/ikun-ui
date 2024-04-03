<script lang="ts">
	import { KCalendar } from '@ikun-ui/calendar';
	import dayjs from 'dayjs';
	import { KSelect } from '@ikun-ui/select';
	let value = dayjs('2024-04-25');
	const onSelect = (e: CustomEvent) => {
		value = e.detail.date;
	};
</script>

<KCalendar {value} on:select={onSelect}>
	<div
		slot="header"
		class="fsc"
		let:year
		let:month
		let:yearList
		let:monthList
		let:handleMonthSelect
		let:handleYearSelect
	>
		🏀
		<KSelect
			size="sm"
			cls="mx-8px"
			dataList={yearList}
			on:updateValue={handleYearSelect}
			value={year}
		></KSelect>

		<KSelect size="sm" dataList={monthList} on:updateValue={handleMonthSelect} value={month}
		></KSelect>
	</div>
	<div slot="dateCell" let:date>
		{#if date.instance.date() % 2}
			💃🎤🤟
		{/if}
	</div>
</KCalendar>
