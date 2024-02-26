/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import type { IKunSize } from '@ikun-ui/utils';
export type KSkeletonProps = {
	loading: boolean; // TODO unit test
	// @default false
	active: boolean; // TODO
	// @default true
	title: boolean | KSkeletonTitleProps; // TODO
	// @default false
	avatar: boolean | KSkeletonAvatarProps; // TODO
	// @default true
	paragraph: boolean | KSkeletonParagraphProps; // TODO
	// @default false
	round: boolean; // TODO
	cls: ClassValue;
	attrs: Record<string, string>;
};

export type KSkeletonTitleProps = {
	width?: number | string; // TODO
	cls: ClassValue; // TODO
	attrs: Record<string, string>;
	/**
	 * @internal
	 * @default false
	 */
	active: boolean; // TODO
	/**
	 * @internal
	 * @default 'md'
	 */
	size: IKunSize; // TODO
};

export type KSkeletonParagraphProps = {
	width: number | string | Array<number | string>; // TODO
	rows: number; // TODO
	cls: ClassValue;
	attrs: Record<string, string>;
};

export type KSkeletonAvatarProps = {
	active: boolean; // TODO
	size: IKunSize; // TODO
	shape: 'circle' | 'round'; // TODO
	cls: ClassValue;
	attrs: Record<string, string>;
};

export type KSkeletonButtonProps = {
	active: boolean; // TODO
	size: IKunSize; // TODO
	block: boolean; // TODO
	shape: 'circle' | 'round' | 'square'; // TODO
	cls: ClassValue;
	attrs: Record<string, string>;
};

export type KSkeletonInputProps = {
	active: boolean; // TODO
	size: IKunSize; // TODO
	cls: ClassValue;
	attrs: Record<string, string>;
};
