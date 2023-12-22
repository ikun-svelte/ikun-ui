/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import type { ScrollTarget } from './utils';
export type KAffixProps = {
	listenTo: string | ScrollTarget | (() => HTMLElement) | undefined;
	top: number | undefin;
	bottom: number | undefin;
	triggerTop: number | undefin;
	triggerBottom: number | undefin;
	positionOption: 'fixed' | 'absolute';
	cls: ClassValue;
	attrs: Record<string, string>;
};
