/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
export type KMenuProps = {
	/**
	 * TODO: 展开图标
	 */
	expandIcon?: string
	/**
	 * TODO: inline 模式的菜单缩进宽度
	 * @default 24
	 */
	inlineIndent?: number
	/**
	 * TODO: inline 时菜单是否收起状态 (指显示图标的mini模式和展开到常规模式)
	 * @default 24
	 */
	inlineCollapsed?: number
	/**
	 * TODO: 菜单内容
	 */
	items?: KItemType[]
	/**
	 * TODO: 菜单类型，现在支持垂直、水平、和内嵌模式三种
	 * `vertical` 和 `inline` 的区别在于 `vertical` 子菜单以 popover 形式出现
	 * @default `vertical`
	 */
	mode?: `vertical` | `horizontal` | `inline`
	/**
	 * TODO: 当前展开的 SubMenu 菜单项 key 数组
	 * @default `[]`
	 */
	openUids?: string[]
	/**
	 * TODO: 用于自定义 Menu 水平空间不足时的省略收缩的图标
	 */
	overflowedIndicator?: string
	/**
	 * TODO: 当前选中的菜单项 key 数组
	 * @default `[]`
	 */
	selectedUids?: string[]
	/**
	 * TODO: 是否允许选中(为 false， 仅不触发 select事件)
	 * @default false
	 */
	selectable?: boolean
	/**
	 * TODO: 用户鼠标离开子菜单后关闭延时，单位：毫秒
	 * @default 100ms
	 */
	subMenuCloseDelay?: boolean
	/**
	 * TODO: 用户鼠标进入子菜单后开启延时，单位：毫秒
	 * @default 0
	 */
	subMenuOpenDelay?: number
	/**
	 * TODO: 主题
	 * @default 'light'
	 */
	theme?: 'light' | 'dark'
	/**
	 * TODO: SubMenu 展开/关闭的触发行为(非 inline 模式)
	 * @default 'hover'
	 */
	triggerSubMenuAction?: 'hover' | 'click'
	cls: ClassValue;
	attrs: Record<string, string>;
};

// TODO: onClick 点击 MenuItem 调用此函数(点击子菜单标题不触发）
// TODO: onOpenChange SubMenu 展开/关闭的回调
// TODO: onSelect 被选中时调用(点击子菜单标题不触发）

// TODO: slots overflowedIndicator 用于自定义 Menu 水平空间不足时的省略收缩的图标
// TODO: slots expandIcon 展开图标

export type KItemType = KMenuItemType | DividerItem | SubMenuType | GroupItem

export type KMenuItemType = {
	/**
	 * TODO: 菜单图标
	 */
	icon?: string
	/**
	 * TODO: 菜单项标题
	 */
	label?: string
	/**
	 * TODO: item 的唯一标志
	 */
	uid?: string
	/**
	 * TODO: 设置收缩时展示的悬浮标题(无子菜单情况下生效，不传时默认为 label)
	 */
	title?: string
	/**
	 * TODO: 是否禁用
	 * @default false
	 */
	disabled: boolean
	/**
	 * TODO: 展示错误状态样式
	 * @default false
	 */
	danger: boolean
}

export type SubMenuType = {
	/**
	 * TODO: 菜单图标
	 */
	icon?: string
	/**
	 * TODO: 菜单项标题
	 */
	label?: string
	/**
	 * TODO: item 的唯一标志
	 */
	uid?: string
	/**
	 * TODO: 是否禁用
	 * @default false
	 */
	disabled: boolean
	/**
	 * TODO: 设置子菜单的主题，默认从 Menu 上继承
	 * @default 'light'
	 */
	theme?: 'light' | 'dark'
	/**
	 * TODO: 子菜单的菜单项
	 */
	children?: KItemType[]
	/**
	 * TODO: 子菜单样式，mode="inline" 时无效
	 */
	popupClassName?: string
};

// TODO: onTitleClick 点击子菜单标题

export type GroupItem = {
	type?: 'group', // Must have
	/**
	 * TODO: 分组标题
	 */
	label: string
	/**
	 * TODO: 分组的菜单项
	 */
	children: KMenuItemType[],
};

export type DividerItem = {
	type?: 'divider', // Must have
};

// TODO: Items Slots slots label 分组标题
// TODO: Items Slots slots  icon  菜单图标
