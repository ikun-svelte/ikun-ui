import type { Theme } from '@unocss/preset-uno';
import type { UserShortcuts } from 'unocss';
import { baseShortcuts } from './base';
import { commonShortcuts } from './common';
import { iconShortcuts } from './icon';
import { buttonShortcuts } from './button';
import { callapseShortcuts } from './callapse';
import { checkboxShortcuts } from './checkbox';
import { drawerShortcuts } from './drawer';
import { maskShortcuts } from './mask';
import { eyeDropperShortcuts } from './eye-dropper';
import { inputShortcuts } from './input';
import { popoverShortcuts } from './popover';
import { modalShortcuts } from "./modal";
// 原子樣式的別名簡寫
export default [
	baseShortcuts,
	commonShortcuts,
	// icon
	iconShortcuts,
	// button
	buttonShortcuts,
	// callapse
	callapseShortcuts,
	// checkbox
	checkboxShortcuts,
	// drawer
	drawerShortcuts,
	// mask
	maskShortcuts,
	// eyeDropper
	eyeDropperShortcuts,
	// input
	inputShortcuts,
	// popover
	popoverShortcuts,
	// modal
	modalShortcuts
] as UserShortcuts<Theme>;

export function getSafeList() {
	const iconList = Object.keys(iconShortcuts);
	const buttonList = Object.keys(buttonShortcuts);
	const callapseList = Object.keys(callapseShortcuts);
	const checkboxList = Object.keys(checkboxShortcuts);
	const drawerList = Object.keys(drawerShortcuts);
	const inputList = Object.keys(inputShortcuts);
	const maskList = Object.keys(maskShortcuts);
	const eyeDropperList = Object.keys(eyeDropperShortcuts);
	const popoverList = Object.keys(popoverShortcuts);
	const modalList = Object.keys(modalShortcuts);
	return iconList
		.concat(modalList)
		.concat(popoverList)
		.concat(drawerList)
		.concat(inputList)
		.concat(maskList)
		.concat(eyeDropperList)
		.concat(buttonList)
		.concat(callapseList)
		.concat(checkboxList);
}
