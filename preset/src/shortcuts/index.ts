import type { Theme } from '@unocss/preset-uno';
import type { UserShortcuts } from 'unocss';
import { baseShortcuts } from './src/base';
import { commonShortcuts } from './src/common';
import { iconShortcuts } from './src/icon';
import { alertShortcuts } from './src/alert';
import { avatarShortcuts } from './src/avatar';
import { badgeShortcuts } from './src/badge';
import { breadcrumbShortcuts } from './src/breadcrumb';
import { breadcrumbItemShortcuts } from './src/breadcrumb-item';
import { buttonShortcuts } from './src/button';
import { buttonGroupShortcuts } from './src/button-group';
import { collapseShortcuts } from './src/collapse';
import { checkboxShortcuts } from './src/checkbox';
import { drawerShortcuts } from './src/drawer';
import { maskShortcuts } from './src/mask';
import { eyeDropperShortcuts } from './src/eye-dropper';
import { inputShortcuts } from './src/input';
import { popoverShortcuts } from './src/popover';
import { radioShortcuts } from './src/radio';
import { rateShortcuts } from './src/rate';
import { modalShortcuts } from './src/modal';
import { tagShortcuts } from './src/tag';
import { notificationShortcuts } from './src/notification';
import { switchShortcuts } from './src/swtich';
import { selectShortcuts } from './src/select';
import { msgBoxShortcuts } from './src/message-box';
import { spinShortcuts } from './src/spin';
import { backtopShortcuts } from './src/backtop';
import { sliderShortcuts } from './src/slider';
import { progressShortcuts } from './src/progress';
import { linkShortcuts } from './src/link';
import { layoutShortcuts } from './src/layout';
import { gridShortcuts } from './src/grid';
import { createColSizeClsByNum, getColCls } from '../rules/src/grid';
import { popconfirmShortcuts } from './src/popconfirm';
import { contextmenuShortcuts } from './src/contextmenu';
export const defaultShortcuts = [
	baseShortcuts,
	commonShortcuts,
	// icon
	iconShortcuts,
	// alert
	alertShortcuts,
	// avatar
	avatarShortcuts,
	// badge
	badgeShortcuts,
	// breadcrumb
	breadcrumbShortcuts,
	// breadcrumb item
	breadcrumbItemShortcuts,
	// button
	buttonShortcuts,
	// button group
	buttonGroupShortcuts,
	// collapse
	collapseShortcuts,
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
	// radio
	radioShortcuts,
	// rate
	rateShortcuts,
	// modal
	modalShortcuts,
	// tag
	tagShortcuts,
	// notification
	notificationShortcuts,
	// switch
	switchShortcuts,
	// select
	selectShortcuts,
	// message box
	msgBoxShortcuts,
	// spin
	spinShortcuts,
	// backtop
	backtopShortcuts,
	// slider
	sliderShortcuts,
	// progress
	progressShortcuts,
	// link
	linkShortcuts,
	// layout
	layoutShortcuts,
	// grid
	gridShortcuts,
	// popconfirm
	popconfirmShortcuts,
	// contextmenu
	contextmenuShortcuts
] as UserShortcuts<Theme>;

export function getSafeList() {
	// shortcuts
	const comList = Object.keys(baseShortcuts);
	const baseList = Object.keys(commonShortcuts);
	const iconList = Object.keys(iconShortcuts);
	const alertList = Object.keys(alertShortcuts);
	const avatarList = Object.keys(avatarShortcuts);
	const badgeList = Object.keys(badgeShortcuts);
	const breadcrumbList = Object.keys(breadcrumbShortcuts);
	const breadcrumbItemList = Object.keys(breadcrumbItemShortcuts);
	const buttonList = Object.keys(buttonShortcuts);
	const buttonGroupList = Object.keys(buttonGroupShortcuts);
	const collapseList = Object.keys(collapseShortcuts);
	const checkboxList = Object.keys(checkboxShortcuts);
	const drawerList = Object.keys(drawerShortcuts);
	const inputList = Object.keys(inputShortcuts);
	const maskList = Object.keys(maskShortcuts);
	const eyeDropperList = Object.keys(eyeDropperShortcuts);
	const popoverList = Object.keys(popoverShortcuts);
	const radioList = Object.keys(radioShortcuts);
	const rateList = Object.keys(rateShortcuts);
	const modalList = Object.keys(modalShortcuts);
	const tagList = Object.keys(tagShortcuts);
	const notificationList = Object.keys(notificationShortcuts);
	const switchList = Object.keys(switchShortcuts);
	const selectList = Object.keys(selectShortcuts);
	const msgBoxList = Object.keys(msgBoxShortcuts);
	const spinList = Object.keys(spinShortcuts);
	const backtopList = Object.keys(backtopShortcuts);
	const sliderList = Object.keys(sliderShortcuts);
	const progressList = Object.keys(progressShortcuts);
	const linkList = Object.keys(linkShortcuts);
	const layoutList = Object.keys(layoutShortcuts);
	const gridList = Object.keys(gridShortcuts);
	const popconfirmList = Object.keys(popconfirmShortcuts);
	const contextmenuList = Object.keys(contextmenuShortcuts);

	let res = iconList
		.concat(comList)
		.concat(baseList)
		.concat(msgBoxList)
		.concat(selectList)
		.concat(switchList)
		.concat(notificationList)
		.concat(tagList)
		.concat(modalList)
		.concat(popoverList)
		.concat(radioList)
		.concat(rateList)
		.concat(drawerList)
		.concat(inputList)
		.concat(maskList)
		.concat(eyeDropperList)
		.concat(alertList)
		.concat(avatarList)
		.concat(badgeList)
		.concat(breadcrumbList)
		.concat(breadcrumbItemList)
		.concat(buttonList)
		.concat(buttonGroupList)
		.concat(collapseList)
		.concat(checkboxList)
		.concat(spinList)
		.concat(backtopList)
		.concat(sliderList)
		.concat(progressList)
		.concat(linkList)
		.concat(layoutList)
		.concat(gridList)
		.concat(contextmenuList)
		.concat(popconfirmList);

	// rules
	const colSizeRules = Object.keys(createColSizeClsByNum());
	const colRules = Object.keys(getColCls());
	res = res.concat(colSizeRules).concat(colRules);
	return res;
}

export { baseShortcuts } from './src/base';
export { commonShortcuts } from './src/common';
export { iconShortcuts } from './src/icon';
export { alertShortcuts } from './src/alert';
export { avatarShortcuts } from './src/avatar';
export { badgeShortcuts } from './src/badge';
export { breadcrumbShortcuts } from './src/breadcrumb';
export { breadcrumbItemShortcuts } from './src/breadcrumb-item';
export { buttonShortcuts } from './src/button';
export { buttonGroupShortcuts } from './src/button-group';
export { collapseShortcuts } from './src/collapse';
export { checkboxShortcuts } from './src/checkbox';
export { drawerShortcuts } from './src/drawer';
export { maskShortcuts } from './src/mask';
export { eyeDropperShortcuts } from './src/eye-dropper';
export { inputShortcuts } from './src/input';
export { popoverShortcuts } from './src/popover';
export { radioShortcuts } from './src/radio';
export { rateShortcuts } from './src/rate';
export { modalShortcuts } from './src/modal';
export { tagShortcuts } from './src/tag';
export { notificationShortcuts } from './src/notification';
export { switchShortcuts } from './src/swtich';
export { selectShortcuts } from './src/select';
export { msgBoxShortcuts } from './src/message-box';
export { spinShortcuts } from './src/spin';
export { backtopShortcuts } from './src/backtop';
export { sliderShortcuts } from './src/slider';
export { progressShortcuts } from './src/progress';
export { linkShortcuts } from './src/link';
export { layoutShortcuts } from './src/layout';
export { gridShortcuts } from './src/grid';
export { popconfirmShortcuts } from './src/popconfirm';
export { contextmenuShortcuts } from './src/contextmenu';
