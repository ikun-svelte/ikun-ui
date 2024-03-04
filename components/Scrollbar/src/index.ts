/// <reference types="./types" />
import Scrollbar from './index.svelte';
export { Scrollbar as KScrollbar };
export { scrollDefaultProps, genCSSVariable } from './utils';
export default Scrollbar;

export * from './utils';

export type { KScrollbarProps } from './types';
