/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
export type KMenuInstanceOption = {
	expandIcon?: string;
	inlineIndent?: number;
	inlineCollapsed?: boolean;
	mode?: `vertical` | `horizontal` | `inline`;
	openUids?: string[];
	selectedUids?: string[];
	selectable?: boolean;
	subMenuCloseDelay?: number;
	subMenuOpenDelay?: number;
	multiple?: boolean;
	theme?: 'light' | 'dark';
	triggerSubMenuAction?: 'hover' | 'click';
	attrs?: Record<string, string>;
	ctxKey?: string;
};

export type ClickEvtPa = {
	item: SubMenuType;
	uid: string;
	uidPath: string[];
	e: MouseEvent;
};

export type SelectEvtPa = {
	item: SubMenuType;
	uid: string;
	uidPath: string[];
	selectedUids: string[];
	selectedItems: SubMenuType[];
	selectedUidPaths: string[][];
	e: MouseEvent;
};

export type KMenuInstance = {
	__propHandleEvtMap: Array<(props: Record<any, any>) => void>;
	__dynamicProps: KMenuInstanceOption;
	__org_items?: SubMenuType[];
	__selectedUids?: Set<string>;
	__openUids?: Set<string>;
	__selectedItems?: Map<string, SubMenuType>;
	syncSelectedItems: (item: SubMenuType, opType: 'set' | 'delete' = 'set') => void;
	syncUids: (
		uid: string | string[],
		type: 'open' | 'selected',
		opType: 'add' | 'delete' = 'add'
	) => void;
	onOpenChange: (openUids: string[]) => void;
	onSelect: (param: SelectEvtPa) => void;
	onDeSelect: (param: SelectEvtPa) => void;
	onClick: (param: ClickEvtPa) => void;
};

export type KMenuProps = {
	/**
	 * TODO: 👀 上下文 key
	 */
	ctxKey?: string;
	/**
	 * TODO: 👀 展开图标
	 * TODO:  展开图标 horizontal(more menu 展示)
	 * @default 'i-carbon-chevron-down'
	 */
	expandIcon?: string;
	/**
	 * TODO: 👀 inline 模式的菜单缩进宽度
	 * @default 24
	 */
	inlineIndent?: number;
	/**
	 * TODO: inline 时菜单是否收起状态 (指显示图标的mini模式和展开到常规模式)
	 * @default false
	 */
	inlineCollapsed?: boolean;
	/**
	 * TODO: 👀 菜单类型，现在支持垂直、水平、和内嵌模式三种 inline
	 * TODO: 👀 菜单类型，现在支持垂直、水平、和内嵌模式三种 vertical
	 * TODO: 🎯 菜单类型，现在支持垂直、水平、和内嵌模式三种 horizontal
	 * `vertical` 和 `inline` 的区别在于 `vertical` 子菜单以 popover 形式出现
	 * @default `vertical`
	 */
	mode?: `vertical` | `horizontal` | `inline`;
	/**
	 * TODO: 👀 当前展开的 SubMenu 菜单项 key 数组 inline
	 * TODO: 👀 当前展开的 SubMenu 菜单项 key 数组 vertical
	 * TODO: 👀 当前展开的 SubMenu 菜单项 key 数组 horizontal
	 * @default `[]`
	 */
	openUids?: string[];
	/**
	 * TODO: 👀 当前选中的菜单项 key 数组(子菜单只高亮，不展开) inline
	 * TODO: 👀 当前选中的菜单项 key 数组(子菜单只高亮，不展开) vertical
	 * TODO: 👀 当前选中的菜单项 key 数组(子菜单只高亮，不展开) horizontal
	 * @default `[]`
	 */
	selectedUids?: string[];
	/**
	 * TODO: 👀 是否允许选中(为 false， 点击不高亮，不触发 select事件) inline
	 * TODO: 👀 是否允许选中(为 false，  点击不高亮，不触发 select事件) vertical
	 * TODO: 👀 是否允许选中(为 false，  点击不高亮，不触发 select事件) horizontal
	 * @default false
	 */
	selectable?: boolean;
	/**
	 * TODO: 👀 用户鼠标离开子菜单后关闭延时，单位：毫秒(非 inline 模式, hover触发)
	 * @default 100ms
	 */
	subMenuCloseDelay?: number;
	/**
	 * TODO: 👀 用户鼠标进入子菜单后开启延时，单位：毫秒(非 inline 模式, hover触发)
	 * @default 0
	 */
	subMenuOpenDelay?: number;
	/**
	 * TODO: 主题
	 * @default 'light'
	 */
	theme?: 'light' | 'dark';
	/**
	 * TODO: 是否允许多选
	 * @default 'true'
	 */
	multiple?: boolean;
	/**
	 * TODO: 👀 SubMenu 展开/关闭的触发行为(非 inline 模式)
	 * @default 'hover'
	 */
	triggerSubMenuAction?: 'hover' | 'click';
	cls: ClassValue;
	attrs: Record<string, string>;
	/**
	 * @internal
	 */
	show: boolean;
};

// TODO: 👀 onClick 点击 MenuItem 调用此函数(点击子菜单标题不触发） inline
// TODO: 👀 onOpenChange SubMenu 展开/关闭的回调 inline
// TODO: 👀 onSelect 被选中时调用(点击子菜单标题不触发） inline
// TODO: 👀 onDeSelect 被选中时调用(点击子菜单标题不触发） inline

// TODO: 👀 onClick 点击 MenuItem 调用此函数(点击子菜单标题不触发） vertical
// TODO: 👀 onOpenChange SubMenu 展开/关闭的回调 vertical
// TODO: 👀 onSelect 被选中时调用(点击子菜单标题不触发） vertical
// TODO: 👀 onDeSelect 被选中时调用(点击子菜单标题不触发） inline

// TODO: 👀 onClick 点击 MenuItem 调用此函数(点击子菜单标题不触发） horizontal
// TODO: 👀 onOpenChange SubMenu 展开/关闭的回调 horizontal
// TODO: 👀 onSelect 被选中时调用(点击子菜单标题不触发） horizontal
// TODO: 👀 onDeSelect 被选中时调用(点击子菜单标题不触发） inline

// TODO: 👀 slots expandIcon 展开图标 vertical
// TODO: 👀 slots expandIcon 展开图标 horizontal
// TODO: 👀 slots expandIcon 展开图标 inline

export type KMenuItemProps = {
	/**
	 * @internal
	 */
	level: number;
	/**
	 * TODO: 👀 上下文 key
	 */
	ctxKey?: string;
	items: SubMenuType[];
	cls: ClassValue;
	attrs: Record<string, string>;
};
export type SubMenuType = {
	/**
	 * TODO: 展示错误状态样式
	 * @default false
	 */
	danger?: boolean;
	/**
	 * TODO: 👀 展示為分組或分割綫
	 */
	type?: 'group' | 'divider';
	/**
	 * TODO:  👀 菜单图标
	 */
	icon?: string;
	/**
	 * TODO: 菜单项标题
	 */
	label?: string;
	/**
	 * TODO:  👀 item 的唯一标志
	 */
	uid?: string;
	/**
	 * TODO: 是否禁用
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * TODO: 设置子菜单的主题，默认从 Menu 上继承
	 * @default 'light'
	 */
	theme?: 'light' | 'dark';
	/**
	 * TODO: 🎯设置收缩时展示的悬浮标题(无子菜单情况下生效，不传时默认为 label)
	 */
	title?: string;
	/**
	 * TODO:  👀 子菜单的菜单项
	 */
	children?: SubMenuType[];
	/**
	 * TODO: 子菜单样式，mode="inline" 时无效
	 */
	popupClassName?: string;
	/**
	 * @internal
	 */
	inGroup?: boolean;
	/**
	 * @internal
	 */
	selected?: boolean;
	/**
	 * @internal
	 */
	open?: boolean;
	/**
	 * @internal
	 */
	selectedDeps?: Set<string>;
	[property: string]: any;
};

// TODO: onTitleClick 点击子菜单标题

// TODO: 🎯Items Slots slots label 分组标题 vertical
// TODO: 🎯Items Slots slots label 分组标题 horizontal
// TODO: 🎯Items Slots slots label 分组标题 inline
// TODO: 👀 Items Slots slots  icon  菜单图标 vertical
// TODO: 👀 Items Slots slots  icon  菜单图标 horizontal
// TODO: 👀 Items Slots slots  icon  菜单图标 inline

// 🎯 TODO horizontal 缩略适配
// 🎯 TODO horizontal 缩略颤抖
// 🎯 TODO horizontal 缩略与默认打开冲突
// 🎯 TODO horizontal 获取父节点
