/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import type { IKunPlacement } from '@ikun-ui/utils';
export type KTourProps = {
	/**
	 * @default true
	 */
	mask: boolean;
	/**
	 * @default i-carbon-close
	 */
	closeIcon: string;
	/**
	 * @default prev
	 */
	prevBtnText: string;
	/**
	 * @default next
	 */
	nextBtnText: string;
	/**
	 * @default 'top'
	 */
	placement: IKunPlacement;
	/**
	 * @default false
	 */
	open: boolean;
	/**
	 * @default 0
	 */
	current: number;
	/**
	 * @default true
	 */
	scrollIntoViewOptions?: boolean | ScrollIntoViewOptions;
	/**
	 * @default 1001
	 */
	zIndex: number;
	steps: KTourStepsOption[];
	cls: ClassValue;
	contentCls: ClassValue;
	attrs: Record<string, string>;
};

export interface KTourStepsOption {
	target: Element;
	title?: string;
	description?: string;
}

// TODO: 交互\上、下、

// TODO: ☑️KTour props open 打开引导
// TODO: ☑️️KTour props scrollIntoViewOptions 是否支持当前元素(引导元素)滚动到视窗内，也可传入配置指定滚动视窗的相关参数

// TODO: ☑️KTour slots closeIcon 自定义关闭按钮插槽
// TODO: ☑️ KTour slots indicators 自定义指示器
// TODO: ☑️ KTour slots title 标题
// TODO: ☑️ KTour slots description 主要描述部分
// TODO: ☑️ KTour slots footer 主要描述部分
// TODO: ☑️ KTour slots nextButton 自定义下一步按钮
// TODO: ☑️ KTour slots prevButton 自定义上一步按钮
