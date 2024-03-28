/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
export type KTimelineProps = {
	items: Array<KTimelineItem>;
	mode?: 'left' | 'alternate' | 'right';
	reverse?: boolean;
	pending?: boolean | string;
	cls?: ClassValue;
	attrs?: Record<string, string>;
};

export interface KTimelineItem<L = string, C = string> {
	color?: string;
	position?: 'left' | 'right';
	label?: L;
	children: C;
	uid: string | number;
}

export interface KTimelineItemInner<L = string, C = string> extends KTimelineItem<L, C> {
	pending?: boolean;
}
