/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
export type KStepsProps = {
	cls: ClassValue;
	attrs: Record<string, string>;
};

export interface KStepsOption {
	uid: string | number;
	title: string;
	subTitle: string;
	description: string;
	status: 'wait' | 'process' | 'finish' | 'error';
	disabled: boolean;
}

export type KStepsOptions = Array<KStepsOption>;
// TODO: KSteps props active - number ｜ string 当前步骤， 值应该是uid
// TODO: KSteps props direction - 'vertical' | 'horizontal' 显示方向
// TODO: KSteps props direction - 'vertical' | 'horizontal' label位置
// TODO: KSteps props dot - boolean 点状步骤（step 变为圆点）
// TODO: KSteps props navigation - boolean 导航步骤（连接变为箭头，与 dot 互斥）
// TODO: KSteps props options - KStepsOptions
// TODO: KSteps props canClick - boolean 可以点击切换

// TODO: KSteps events change - (active) => void 点击时触发

// TODO: KSteps slots default 应该传入 KStep

// TODO: KStep 仅做自定义插槽渲染
// TODO: KStep props uid

// TODO: KStep slots default
// TODO: KStep slots title
// TODO: KStep slots subTitle
// TODO: KStep slots description
