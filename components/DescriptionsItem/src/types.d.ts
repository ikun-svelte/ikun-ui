/// <reference types="svelte" />
import type { ClassValue } from 'clsx';

export type KDescriptionsItemProps = {
	label: string;
	cls: ClassValue;
	attrs: Record<string, string>;
};
