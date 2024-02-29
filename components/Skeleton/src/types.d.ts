/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import type { IKunSize } from '@ikun-ui/utils';

// 默认包含 Title、Paragraph 和  Avatar，
// 可以自由组合其他
export type KSkeletonProps = {
	loading: boolean; // TODO unit test
	// @default false
	active: boolean; // TODO
	size: IKunSize; // TODO
	// @default true
	title: boolean | KSkeletonTitleProps; // TODO unit test
	// @default true
	paragraph: boolean | KSkeletonParagraphProps; // TODO unit test
	// @default false
	avatar: boolean | KSkeletonAvatarProps; // TODO unit test
	// @default false
	round: boolean; // TODO
	cls: ClassValue; // TODO unit test
	attrs: Record<string, string>; // TODO unit test
};

export type KSkeletonTitleProps = {
	width?: number | string; // TODO unit test
	cls?: ClassValue; // TODO unit test
	attrs?: Record<string, string>; // TODO unit test
	/**
	 * @internal
	 * @default false
	 */
	active?: boolean; // TODO unit test
	/**
	 * @internal
	 * @default 'md'
	 */
	size?: IKunSize; // TODO unit test
};

export type KSkeletonParagraphProps = {
	active?: boolean; // TODO unit test
	size?: IKunSize; // TODO unit test
	width?: number | string | Array<number | string>; // TODO unit test
	rows?: number; // TODO unit test
	cls?: ClassValue; // TODO unit test
	attrs?: Record<string, string>; // TODO unit test
};

export type KSkeletonAvatarProps = {
	active?: boolean; // TODO unit test
	size?: IKunSize; // TODO unit test
	shape?: 'circle' | 'round' | 'square'; // TODO unit test
	cls?: ClassValue; // TODO unit test
	attrs?: Record<string, string>; // TODO unit test
};

export type KSkeletonButtonProps = {
	active: boolean; // TODO unit test
	size: IKunSize; // TODO unit test
	block: boolean; // TODO unit test
	shape: 'circle' | 'round' | 'square'; // TODO unit test
	cls: ClassValue; // TODO unit test
	attrs: Record<string, string>; // TODO unit test
};

export type KSkeletonInputProps = {
	active: boolean; // TODO unit test
	size: IKunSize; // TODO unit test
	block: boolean; // TODO unit test
	cls: ClassValue; // TODO unit test
	attrs: Record<string, string>; // TODO unit test
};

export type KSkeletonImageProps = {
	active: boolean; // TODO unit test
	cls: ClassValue; // TODO unit test
	attrs: Record<string, string>; // TODO unit test
};
