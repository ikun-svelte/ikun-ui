/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import type { IKunPlacement, IKunSize, IKunTrigger } from '@ikun-ui/utils';
export type KColorPickerProps = {
	/**
	 * 标题
	 * @type string ;
	 * @default ''
	 */
	title: string;
	/**
	 * 允许清除选择的颜色
	 * @type boolean
	 * @default false
	 */
	allowClear?: boolean;
	/**
	 * 默认颜色的值
	 * @expiremrnt 决定线性范围，他会根据颜色的 slider 来变化
	 * @type string | RgbaColor | HsvaColor;
	 * @default ''
	 */
	defaultValue: string | RgbaColor | HsvaColor;
	/**
	 * 颜色的值
	 * @type string | RgbaColor | HsvaColor;
	 * @default ''
	 */
	value: string | RgbaColor | HsvaColor;
	/**
	 * 颜色格式值
	 * @type 'rgb' | 'hex' | 'hsv'
	 * @default 'hex'
	 */
	format?: 'rgb' | 'hex' | 'hsv';
	/**
	 * 禁用颜色选择器
	 * @type boolean
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * 禁用透明度
	 * @type boolean
	 * @default false
	 */
	disabledAlpha?: boolean;
	/**
	 * 弹出窗口的位置
	 * @type IKunPlacement
	 * @default 'top'
	 */
	placement?: IKunPlacement;
	/**
	 * 预设的颜色
	 * @type { label: string, colors: Array<string | Color>, defaultOpen?: boolean }[]
	 * @default undefined
	 */
	presets?: KColorPickerPreset[];
	/**
	 * 触发器大小
	 * @type IKunSize
	 * @default 'md'
	 */
	size: IKunSize;
	/**
	 * 触发器是否显示文本
	 * @type boolean
	 * @default false
	 */
	showText: boolean;
	/**
	 * 颜色选择器的触发模式
	 * @type IKunTrigger
	 * @default 'click'
	 */
	trigger: IKunTrigger;
	cls: ClassValue;
	attrs: Record<string, string>;
};

export type KColorPickerPaletteProps = {
	/**
	 * 颜色的值
	 * @type string | RgbaColor | HsvaColor;
	 * @default ''
	 */
	value: string | RgbaColor | HsvaColor;
	/**
	 * 默认颜色的值
	 * @expiremrnt 决定线性范围，他会根据颜色的 slider 来变化
	 * @type string | RgbaColor | HsvaColor;
	 * @default ''
	 */
	defaultValue: string | RgbaColor | HsvaColor;
	cls: ClassValue;
	attrs: Record<string, string>;
};

export type KColorPickerSliderProps = {
	max: number;
	min: number;
	step: number;
	isAlpha: boolean;
	/**
	 * 颜色的值
	 * @type string | RgbaColor | HsvaColor;
	 * @default ''
	 */
	value: string | RgbaColor | HsvaColor;
	cls: ClassValue;
	attrs: Record<string, string>;
};

export type KColorPickerBlockProps = {
	disabled: boolean;
	focus: boolean;
	error: boolean;
	isClear: boolean;
	trigger: boolean;
	/**
	 * 颜色的值
	 * @type string | RgbaColor | HsvaColor;
	 * @default ''
	 */
	value: string | RgbaColor | HsvaColor;
	/**
	 * 触发器大小
	 * @type IKunSize
	 * @default 'md'
	 */
	size: IKunSize;
	cls: ClassValue;
	attrs: Record<string, string>;
};

export type KColorPickerFormatProps = {
	/**
	 * 禁用透明度
	 * @type boolean
	 * @default false
	 */
	disabledAlpha?: boolean;
	/**
	 * 颜色格式值
	 * @type 'rgb' | 'hex' | 'hsv'
	 * @default 'rgb'
	 */
	format?: 'rgb' | 'hex' | 'hsv';
	/**
	 * 颜色的值
	 * @type string | RgbaColor | HsvaColor;
	 * @default ''
	 */
	value: string | RgbaColor | HsvaColor;
	cls: ClassValue;
	attrs: Record<string, string>;
};

// TODO: form support
// TODO: form 文档更新
// TODO: form 单测更新

export interface RgbaColor {
	r: number;
	g: number;
	b: number;
	a?: number;
}

export interface HsvaColor {
	h: number;
	s: number;
	v: number;
	a?: number;
}

export interface KColorPickerPreset {
	defaultOpen?: boolean;
	label: string;
	colors: string[] | RgbaColor[] | HsvaColor[];
}
export type KColorPickerPresetProps = {
	/**
	 * 颜色的值
	 * @type string | RgbaColor | HsvaColor;
	 * @default ''
	 */
	value: string | RgbaColor | HsvaColor;
	/**
	 * 预设颜色的值
	 * @type string[] | RgbaColor[] | HsvaColor[];
	 * @default ''
	 */
	presets: KColorPickerPreset[];
	cls: ClassValue;
	attrs: Record<string, string>;
};
