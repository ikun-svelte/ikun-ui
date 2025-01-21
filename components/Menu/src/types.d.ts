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
	removeBorderStyleBg: () => void;
	getParentDom: () => HTMLElement | undefined | null;
};

export type KMenuProps = {
	/**
	 *  @zh 上下文 key, 用于组件内部逻辑，应该是一个全局唯一值,KMenuItem 与 KMenu 公用一个相同值
	 *  @en Context key, used for component internal logic,
	 *  should be a globally unique value, KMenuItem and KMenu share the same value
	 */
	ctxKey?: string;
	/**
	 * @zh 展开图标
	 * @en expand icon
	 * @default 'i-carbon-chevron-down'
	 */
	expandIcon?: string;
	/**
	 * @zh inline 模式的菜单缩进宽度
	 * @en Menu indent width in inline mode
	 * @default 24
	 */
	inlineIndent?: number;
	/**
	 * @zh inline 或 vertical 时菜单是否收起状态 (指显示图标的mini模式和展开到常规模式)
	 * @en Whether the menu is collapsed in inline or vertical mode
	 * @default false
	 */
	inlineCollapsed?: boolean;
	/**
	 * @zh 菜单渲染模式
	 * @en Menu rendering mode
	 * @default `vertical`
	 */
	mode?: `vertical` | `horizontal` | `inline`;
	/**
	 * @zh 默认打开的菜单 uid 数组
	 * @en Default open menu uid array
	 * @default `[]`
	 */
	openUids?: string[];
	/**
	 * @zh 默认选中的的菜单 uid 数组
	 * @en Default select menu uid array
	 * @default `[]`
	 */
	selectedUids?: string[];
	/**
	 * @zh 菜单可否被选中，设置为false将不会触发 Select 相关事件
	 * @en Whether the menu can be selected.
	 * Setting it to false will not trigger `select` related events
	 * @default true
	 */
	selectable?: boolean;
	/**
	 * @zh 用户鼠标离开子菜单后关闭延时，单位：毫秒(非 inline 模式, hover触发)
	 * @en The closing delay after the user leaves the submenu, unit: milliseconds
	 * @default 100ms
	 */
	subMenuCloseDelay?: number;
	/**
	 * @zh 用户鼠标进入子菜单后开启延时，单位：毫秒(非 inline 模式, hover触发)
	 * @en The delay after the user mouse enters the submenu, unit: milliseconds
	 * @default 0
	 */
	subMenuOpenDelay?: number;
	/**
	 * @zh 主题
	 * @en Theme style
	 * @default 'light'
	 */
	theme?: 'light' | 'dark';
	/**
	 * @zh 是否允许多选
	 * @en Whether to allow multiple selections
	 * @default 'false'
	 */
	multiple?: boolean;
	/**
	 * @zh Sub Menu 展开/关闭的触发行为(非 inline 模式)
	 * @en Sub menu expand/close trigger behavior
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

export type KMenuItemProps = {
	/**
	 * @internal
	 */
	level: number;
	ctxKey?: string;
	items: SubMenuType[];
	cls: ClassValue;
	attrs: Record<string, string>;
};
export type SubMenuType = {
	/**
	 * @zh 展示错误状态样式
	 * @en Display error state style
	 * @default false
	 */
	danger?: boolean;
	/**
	 * @zh 展示為分組或分割綫
	 * @en Render as groups or dividers
	 */
	type?: 'group' | 'divider';
	/**
	 * @zh 菜单图标
	 * @en Menu Icon
	 */
	icon?: string;
	/**
	 * @zh 菜单标题
	 * @en Menu Label
	 */
	label?: string;
	/**
	 * @zh item 的唯一标志， 在整个菜单树种应该是个唯一值
	 * @en The unique value of the menu item.
	 * It should be a unique value in the entire menu tree.
	 */
	uid?: string;
	/**
	 * @zh 是否禁用 优先级高于 danger, 子节点也禁用
	 * @en Indicates whether it is disabled. Its priority is higher than danger,
	 * and its child nodes are also disabled.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * TODO: 设置子菜单的主题，默认从 Menu 上继承
	 * @default 'light'
	 */
	theme?: 'light' | 'dark';
	/**
	 * @zh 悬浮标题
	 * @en title
	 */
	title?: string;
	/**
	 * @zh 子菜单的菜单项
	 * @en Menu items in submenus
	 */
	children?: SubMenuType[];
	/**
	 * @zh 子菜单 popover 的样式
	 * @en Submenu popover style
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
