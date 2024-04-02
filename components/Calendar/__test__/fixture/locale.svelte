<script>
	import { KCalendar } from '@ikun-ui/calendar';
	import dayjs from 'dayjs';
	const v = new dayjs('2024-04-25');
	const locale = {
		lang: {
			locale: 'zh_CH',
			shortWeekDays: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			shortMonths: [
				'一月',
				'二月',
				'三月',
				'四月',
				'五月',
				'六月',
				'七月',
				'八月',
				'九月',
				'十月',
				'十一月',
				'十二月'
			],
			month: '月',
			year: '年'
		}
	};
</script>

<KCalendar fullscreen {locale} value={v}></KCalendar>
