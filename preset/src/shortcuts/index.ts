import type { Theme } from '@unocss/preset-uno';
import type { UserShortcuts } from 'unocss';
import { baseShortcuts } from './base';
import { commonShortcuts } from './common';
import { iconShortcuts } from './icon';
import { ButtonShortcuts } from './button';
// 原子樣式的別名簡寫
export default [
	baseShortcuts,
	commonShortcuts,
	// icon
	iconShortcuts,
	// button
	ButtonShortcuts
] as UserShortcuts<Theme>;

export function getSafeList(){
	return Object.keys(iconShortcuts).concat(Object.keys(ButtonShortcuts))
}
