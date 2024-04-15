/// <reference types="./types" />
import Menu from './index.svelte';
export { Menu as KMenu };

export default Menu;

export type {
    KMenuProps,
    DividerItem,
    GroupItem,
    SubMenuType,
    KMenuItemType
} from './types'
