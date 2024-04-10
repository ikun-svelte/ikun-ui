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
	scrollIntoViewOptions: boolean | ScrollIntoViewOptions;
	/**
	 * @default 1001
	 */
	zIndex: number;
	steps: KTourStepsOption[];
	cls: ClassValue;
	attrs: Record<string, string>;
};

export interface KTourStepsOption {
	target: Element;
	title?: string;
	description?: string;
}
// TODO: ☑️KTour props mask 是否启用遮罩
// TODO: KTour props closeIcon 自定义关闭按钮
// TODO: ✅KTour props placement 引导卡片相对于目标元素的位置
// TODO: ☑️KTour props open 打开引导
// TODO: ☑️KTour props current 当前处于哪一步（number default）
// TODO: ☑️️KTour props scrollIntoViewOptions 是否支持当前元素(引导元素)滚动到视窗内，也可传入配置指定滚动视窗的相关参数
// TODO: ☑️ KTour props zIndex Tour 的层级

// TODO: KTour events onClose 关闭引导时的回调函数
// TODO: ☑️KTour events onFinish 引导完成时的回调
// TODO: ☑️KTour events onChange 步骤改变时的回调，current 为当前的步骤，(current: number) => void

// TODO: KTour slots closeIcon 自定义关闭按钮插槽

// TODO: KTour props step  step.target 获取引导卡片指向的元素，为空时居中于屏幕 ❓❓❓
// TODO: KTour props step  step.title 标题 ❓❓❓
// TODO: KTour props step  step.description 标题 ❓❓❓

// TODO: KTour slots indicatorsRender 自定义指示器 ❓❓❓
// TODO: KTour slots title 标题 ❓❓❓
// TODO: KTour slots description 主要描述部分 ❓❓❓
// TODO: KTour slots cover 覆盖除上下一步按钮的内容区 ❓❓❓
// TODO: KTour slots nextButton 自定义下一步按钮 ❓❓❓
// TODO: KTour slots prevButton 自定义上一步按钮 ❓❓❓
