/// <reference types="./types" />
import Dropdown from './index.svelte';
import DropdownItem from './item.svelte';
export { Dropdown as KDropdown };
export { DropdownItem as KDropdownItem };
export default Dropdown;

export type { KDropdownProps, KDropdownItemProps, KDropdownCtx } from './types';
