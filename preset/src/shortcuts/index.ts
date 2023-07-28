import type { Theme } from '@unocss/preset-uno';
import type { UserShortcuts } from 'unocss';
import { baseShortcuts } from './base';
import { commonShortcuts } from './common';
import { iconShortcuts } from './icon';
import { ButtonShortcuts } from './button';
import {callapseShortcuts} from "./callapse";
// 原子樣式的別名簡寫
export default [
	baseShortcuts,
	commonShortcuts,
	// icon
	iconShortcuts,
	// button
	ButtonShortcuts,
	// callapse
	callapseShortcuts
] as UserShortcuts<Theme>;

export function getSafeList() {
	const iconList = Object.keys(iconShortcuts)
	const buttonList = Object.keys(ButtonShortcuts)
	const callapseList = Object.keys(callapseShortcuts)
	return iconList.concat(buttonList).concat(callapseList)
}
