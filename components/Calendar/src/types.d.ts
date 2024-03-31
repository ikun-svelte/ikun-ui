/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import type Dayjs from 'dayjs';
export type KCalendarProps = {
	/**
	 * TODO: ☑️ 展示的日期
	 */
	value?: Dayjs;
	/**
	 * TODO: ☑️ 不可选择的日期，参数为当前
	 */
	disabledDate?: (currentDate: Dayjs) => boolean;
	/**
	 * TODO: 是否全屏显示，为 false 时则为卡片模式
	 */
	fullscreen?: boolean;
	/**
	 * TODO: ☑️ 国际化配置
	 */
	locale: Record<string, any>;
	/**
	 * TODO: ☑️ 初始模式
	 */
	mode?: 'month' | 'year';
	/**
	 * TODO: 设置可以显示的日期(实现了年月，日期要限制)
	 */
	validRange?: [Dayjs, Dayjs];
	cls?: ClassValue;
	attrs?: Record<string, string>;
};

// TODO: slot dateCell 追加到日期单元格后的插槽
// TODO: slot dateFullCell 替换整个日期单元格内容的插槽
// TODO: slot header 头部插槽
// TODO: slot monthCell 追加到月单元格后的插槽
// TODO: slot monthFullCell 替换整个月单元格内容的插槽

// TODO: event panelChange 日期面板变化回调
// TODO: event select 选择日期回调，包含来源信息
// TODO: bg 动画
// TODO: dark mode
