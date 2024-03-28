/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
export type KTimelineProps = {
	items: Array<KTimelineItem>;
	/**
	 * TODO: ☑️通过设置 mode 可以改变时间轴和内容的相对位置,
	 * TODO: ☑️这里是指 label 的位置，没有label，
	 * TODO: ☑️也要变化对应的 children 位置（children永远在label 对面）
	 * @default -
	 */
	mode?: 'left' | 'alternate' | 'right';
	/**
	 * TODO: ☑️ 节点倒序与否
	 * @default false
	 */
	reverse?: boolean;
	/**
	 * TODO: ☑️ 最后一个节点是否是幽灵节点或内容
	 * TODO: ☑️ string
	 * TODO: ☑️ Boolean（只显示 dot）
	 * TODO: ☑️ 插槽
	 * @default false
	 */
	pending?: boolean | string;
	/**
	 * TODO: ☑️ 最后一个节点是幽灵节点时的时间图点（pending 为真时使用）
	 * TODO: ☑️ dot
	 * TODO: ☑️ tail
	 * TODO: ☑️ 插槽
	 * @default false
	 */
	pendingDot?: boolean | string;
	cls?: ClassValue;
	attrs?: Record<string, string>;
};

export type KTimelineItemsProps = {
	/**
	 * TODO: ☑️ 自定义时间轴点
	 * @default -
	 */
	dot?: unknown;
};

export interface KTimelineItem<L = string, C = string> {
	// TODO: ☑️ 指定圆圈颜色
	color?: string;
	// TODO: ☑️ 自定义节点位置，它只有当 mode 为 'alternate' 时，影响 children 水平对齐
	position?: 'left' | 'right';
	// TODO: ⚠️
	label?: L;
	// TODO: ☑️
	children: C;
	uid: string | number;
}

export interface KTimelineItemInner<L = string, C = string> extends KTimelineItem<L, C> {
	pending?: boolean;
}
