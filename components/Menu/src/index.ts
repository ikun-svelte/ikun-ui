/// <reference types="./types" />
import Menu from './index.svelte';
import MenuItem from './item.svelte';
export { Menu as KMenu };
export { MenuItem as KMenuItem };
export default Menu;

export type {
  KMenuInstanceOption,
  KMenuItemProps,
  KMenuInstance,
  KMenuProps,
  SubMenuType
} from './types';
