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
	finishBtnText: string;
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
	target?: Element | null;
	title?: string;
	description?: string;
}
