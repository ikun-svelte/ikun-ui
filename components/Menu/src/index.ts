/// <reference types="./types" />
import Menu from './index.svelte';
import MenuItem from './item.svelte';
export { Menu as KMenu };
export { MenuItem as KMenuItem };
export default Menu;

export type {
    KMenuProps,
    DividerItem,
    GroupItem,
    SubMenuType,
    KMenuItemType
} from './types'
