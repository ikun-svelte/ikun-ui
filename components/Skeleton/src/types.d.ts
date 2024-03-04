/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import type { IKunSize } from '@ikun-ui/utils';

export type KSkeletonProps = {
	loading: boolean;
	// @default false
	active: boolean;
	size: IKunSize;
	// @default true
	title?: boolean | KSkeletonTitleProps;
	// @default true
	paragraph?: boolean | KSkeletonParagraphProps;
	// @default false
	avatar?: boolean | KSkeletonAvatarProps;
	// @default false
	round: boolean;
	cls?: ClassValue;
	attrs?: Record<string, string>;
};

export type KSkeletonTitleProps = {
	width?: number | string;
	cls?: ClassValue;
	attrs?: Record<string, string>;
	round: boolean;
	active?: boolean;
	size?: IKunSize;
};

export type KSkeletonParagraphProps = {
	active?: boolean;
	size?: IKunSize;
	round: boolean;
	width?: number | string | Array<number | string>;
	rows?: number;
	cls?: ClassValue;
	attrs?: Record<string, string>;
};

export type KSkeletonAvatarProps = {
	active?: boolean;
	/**
	 * @internal
	 */
	isInSK?: boolean;
	size?: IKunSize;
	shape?: 'circle' | 'round' | 'square';
	cls?: ClassValue;
	attrs?: Record<string, string>;
};

export type KSkeletonButtonProps = {
	active: boolean;
	size: IKunSize;
	block: boolean;
	shape: 'circle' | 'round' | 'square';
	cls: ClassValue;
	attrs: Record<string, string>;
};

export type KSkeletonInputProps = {
	active: boolean;
	size: IKunSize;
	block: boolean;
	cls: ClassValue;
	attrs: Record<string, string>;
};

export type KSkeletonImageProps = {
	active: boolean;
	cls: ClassValue;
	attrs: Record<string, string>;
};
