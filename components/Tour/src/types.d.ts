/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
export type KTourProps = {
	cls: ClassValue;
	attrs: Record<string, string>;
};

// TODO: KTour props mask 是否启用遮罩
// TODO: KTour props closeIcon 自定义关闭按钮
// TODO: KTour props placement 引导卡片相对于目标元素的位置
// TODO: KTour props disabledInteraction 禁用高亮区交互
// TODO: KTour props placement 引导卡片相对于目标元素的位置
// TODO: KTour props open 打开引导
// TODO: KTour props current 当前处于哪一步（number default）
// TODO: KTour props scrollIntoViewOptions 是否支持当前元素(引导元素)滚动到视窗内，也可传入配置指定滚动视窗的相关参数
// TODO: KTour props zIndex Tour 的层级
// TODO: KTour props uids step 的唯一id

// TODO: KTour events onClose 关闭引导时的回调函数
// TODO: KTour events onFinish 引导完成时的回调
// TODO: KTour events onChange 步骤改变时的回调，current 为当前的步骤，(current: number) => void

// TODO: KTour slots closeIcon 自定义关闭按钮插槽

// TODO: KTourStep props target 获取引导卡片指向的元素，为空时居中于屏幕 ❓❓❓
// TODO: KTourStep props title 标题 ❓❓❓
// TODO: KTourStep props description 标题 ❓❓❓
// TODO: KTourStep slots indicatorsRender 自定义指示器 ❓❓❓
// TODO: KTourStep slots title 标题 ❓❓❓
// TODO: KTourStep slots description 主要描述部分 ❓❓❓
// TODO: KTourStep slots cover 覆盖除上下一步按钮的内容区 ❓❓❓
// TODO: KTourStep slots nextButton 自定义下一步按钮 ❓❓❓
// TODO: KTourStep slots prevButton 自定义上一步按钮 ❓❓❓

// <KTour><KTourStep target={btn1}></KTourStep></KTour>
// <KButton ref={btn1}></KButton>
