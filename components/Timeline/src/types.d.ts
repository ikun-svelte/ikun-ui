/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
export type KTimelineProps = {
	items: Array<unknown>;
	/**
	 * TODO: 通过设置 mode 可以改变时间轴和内容的相对位置,
	 * TODO: 这里是指 label 的位置，没有label，
	 * TODO: 也要变化对应的 children 位置（children永远在label 对面）
	 * @default -
	 */
	mode?: 'left' | 'alternate' | 'right';
	/**
	 * TODO: 节点倒序与否
	 * @default false
	 */
	reverse?: boolean;
	/**
	 * TODO: 🤔 最后一个节点是否是幽灵节点或内容
	 * @default false
	 */
	pending?: boolean;
	/**
	 * TODO: 🤔 最后一个节点是幽灵节点时的时间图点
	 * @default false
	 */
	pendingDot?: boolean;
	cls?: ClassValue;
	attrs?: Record<string, string>;
};

export type KTimelineItemsProps = {
	/**
	 * TODO: 指定圆圈颜色
	 * @default 'blue'
	 */
	color?: string;
	/**
	 * TODO: 自定义时间轴点
	 * @default -
	 */
	dot?: unknown;
	/**
	 * TODO: 设置标签
	 * @default -
	 */
	label?: unknown;
	/**
	 * TODO: 设置内容
	 * @default -
	 */
	children?: unknown;
	/**
	 * TODO: 自定义节点位置，它只有当 mode 为 'alternate' 时，影响 children 水平对齐
	 * @default -
	 */
	position?: 'left' | 'right';
	cls?: ClassValue;
	attrs?: Record<string, string>;
};
