/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import type Dayjs from 'dayjs';
export type KCalendarProps = {
	value?: Dayjs;
	disabledDate?: (currentDate: Dayjs) => boolean;
	fullscreen?: boolean;
	locale: Record<string, any>;
	mode?: 'month' | 'year';
	validRange?: [Dayjs, Dayjs];
	cls?: ClassValue;
	attrs?: Record<string, string>;
};

// TODO: dark mode
// TODO: 月份切换失败
