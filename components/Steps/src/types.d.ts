/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
export type KStepsProps = {
	active: number | string; // 应该是 KStepsItems 的 index
	direction: 'vertical' | 'horizontal';
	labelPlacement: 'vertical' | 'horizontal';
	dot: boolean;
	navigation: boolean;
	items: KStepsItems;
	canClick: boolean;
	cls: ClassValue;
	attrs: Record<string, string>;
};

export interface KStepsItem {
	index: string | number; // 应该是具有顺序的索引数字
	title: string;
	subTitle?: string;
	description?: string;
	status?: KStepStatus; // 不填，则按照wait -> process -> finish
}

export type KStepsItems = Array<KStepsItem>;

export type KStepProps = {
	active: number | string;
	direction: 'vertical' | 'horizontal';
	labelPlacement: 'vertical' | 'horizontal';
	dot: boolean;
	eachIndex: number;
	last: boolean;
	item: KStepsItem;
	canClick: boolean;
	navigation: boolean;

	index: string | number;
	cls: ClassValue;
	attrs: Record<string, string>;
};

export type KStepStatus = 'wait' | 'process' | 'finish' | 'error';

// TODO: KSteps props direction - 'vertical' | 'horizontal' 显示方向 ✅
// TODO: KSteps props labelPlacement - 'vertical' | 'horizontal' label位置 ✅

// TODO: KSteps props dot - boolean 点状步骤（step 变为圆点） ✅

// TODO: KSteps props navigation - boolean 导航步骤（连接变为箭头，与 dot 互斥） ✅

// TODO: KSteps props items - KStepsItems ✅
// TODO: KSteps props active - number ｜ string 当前步骤， 值应该是 index ✅

// TODO: KSteps props canClick - boolean 可以点击切换 ✅
// TODO: KSteps events change - (active) => void 点击时触发 ✅

// TODO: KSteps slots default 应该传入 KStep ✅

// TODO: KStep 仅做自定义插槽渲染
// TODO: KStep props index ✅

// TODO: KStep slots icon ✅
// TODO: KStep slots title ✅
// TODO: KStep slots subTitle ✅
// TODO: KStep slots description ✅
