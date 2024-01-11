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
	canClick: boolean;
	navigation: boolean;
	eachIndex: number;
	item: KStepsItem;
	index: string | number;
	last: boolean;

	cls: ClassValue;
	attrs: Record<string, string>;
};

export type KStepStatus = 'wait' | 'process' | 'finish' | 'error';
