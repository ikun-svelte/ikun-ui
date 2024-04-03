/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import type Dayjs from 'dayjs';
export type KCalendarProps = {
	value?: Dayjs;
	disabledDate?: (currentDate: Dayjs) => boolean;
	/**
	 * TODO: 是否全屏显示，为 false 时则为卡片模式
	 */
	fullscreen?: boolean;
	locale: Record<string, any>;
	mode?: 'month' | 'year';
	validRange?: [Dayjs, Dayjs];
	cls?: ClassValue;
	attrs?: Record<string, string>;
};

// TODO: dark mode
