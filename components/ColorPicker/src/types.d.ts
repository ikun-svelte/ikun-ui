/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
export type KColorPickerProps = {
	cls: ClassValue;
	attrs: Record<string, string>;
};

// TODO: Title and Clear
// TODO: 颜色选择区
// TODO: 颜色选择条
// TODO: 透明度选择条
// TODO: HEX 格式输入控件与值输出
// TODO: HSB 格式输入控件与值输出
// TODO: RGB 格式输入控件与值输出
// TODO: 颜色预设区域
// TODO: 受控模式

// TODO: props allowClear 允许清除选择的颜色 boolean @default false
// TODO: props value 颜色的值 string @default ''
// TODO: props defaultFormat 颜色格式值 rgb | hex | hsb @default rgb
// TODO: props disabled 禁用颜色选择器 boolean @default false
// TODO: props disabledAlpha 禁用透明度 boolean @default false
// TODO: props placement 弹出窗口的位置 'top' / 'left' / 'right' / 'bottom'  @default top
// TODO: props disabledAlpha 预设的颜色  { label: string, colors: Array<string | Color>, defaultOpen?: boolean }[] @default undefined
// TODO: props size 触发器大小 IkunSize @default 'md'
// TODO: props showText 触发器是否显示文本 boolean @default false
// TODO: props trigger 颜色选择器的触发模式 IKunTrigger @default click

// TODO: event change 颜色变化的回调 (value: Color, hex: string) => void
// TODO: event changeComplete 颜色选择完成的回调 (value: Color) => void
// TODO: event formatChange 颜色格式变化的回调 (format: 'hex' | 'rgb' | 'hsb') => void
// TODO: event openChange 当 open 被改变时的回调 (open: boolean) => void
// TODO: event clear 清除的回调 () => void

// TODO: slot presetLabel 预设的 label 插槽
// TODO: slot trigger 后置插槽
// TODO: slot default 自定义触发插槽
