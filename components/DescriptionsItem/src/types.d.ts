/// <reference types="svelte" />
import type { ClassValue } from 'clsx';

export type KDescriptionsItemProps = {
	label: string;
	span: string;
	cls: ClassValue;
	attrs: Record<string, string>;
};
