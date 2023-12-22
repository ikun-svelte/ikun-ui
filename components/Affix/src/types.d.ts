/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import type { ScrollTarget } from './utils';
export type KAffixProps = {
	listenTo: string | ScrollTarget | (() => HTMLElement) | undefined;
	top: number | undefined;
	bottom: number | undefined;
	triggerTop: number | undefined;
	triggerBottom: number | undefined;
	positionOption: 'fixed' | 'absolute';
	cls: ClassValue;
	attrs: Record<string, string>;
};
