/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import type { IKunPlacement, IKunSize, IKunTrigger } from '@ikun-ui/utils';
import type { RgbaColor, HsvaColor } from 'colord';
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
	 * @expiremrnt 可能会删除，初始化时决定线性范围，他会根据颜色的 slider 来变化
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
	 * @default 'rgb'
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
	presets?: boolean;
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
	value: HsvaColor;
	/**
	 * 默认颜色的值
	 * @expiremrnt 可能会删除，初始化时决定线性范围，他会根据颜色的 slider 来变化
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
	focus: boolean;
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

// TODO:
//  手風琴
//  🚧 slider
//  顔色格式轉換
//  多個 popover

// TODO: 🚧 Title and Clear
// TODO: 🚧 颜色选择区
// TODO: 🚧 颜色选择条
// TODO: 🚧 透明度选择条
// TODO: HEX 格式输入控件与值输出
// TODO: HSB 格式输入控件与值输出
// TODO: RGB 格式输入控件与值输出
// TODO: 颜色预设区域
// TODO: 受控模式

// TODO: 🚧 props allowClear 允许清除选择的颜色 boolean @default false
// TODO: props value 颜色的值 string @default ''
// TODO: defaultValue value 初始化时决定线性范围 string @default ''
// TODO: props format 颜色格式值 rgb | hex | hsb @default rgb
// TODO: props disabled 禁用颜色选择器 boolean @default false
// TODO: props disabledAlpha 禁用透明度 boolean @default false
// TODO: 🚧 props placement unit test
// TODO: props presets 预设的颜色  { label: string, colors: Array<string | Color>, defaultOpen?: boolean }[] @default undefined
// TODO: props size 触发器大小 IkunSize @default 'md'
// TODO: props showText 触发器是否显示文本 boolean @default false
// TODO: 🚧 props trigger unit test

// TODO: event change 颜色变化的回调 (value: Color, hex: string) => void
// TODO: event changeComplete 颜色选择完成的回调 (value: Color) => void
// TODO: event formatChange 颜色格式变化的回调 (format: 'hex' | 'rgb' | 'hsb') => void
// TODO: event openChange 当 open 被改变时的回调 (open: boolean) => void
// TODO: event clear 清除的回调 () => void

// TODO: slot presetLabel 预设的 label 插槽
// TODO: slot trigger 后置插槽
// TODO: slot default 自定义触发插槽

// TODO: dark mode
// TODO: Kdropdownitem
// TODO: input show format
