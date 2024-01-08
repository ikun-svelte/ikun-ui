import { segmentedShortcuts } from './src/segmented';
import { flexShortcuts } from './src/flex';
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
import { cardShortcuts } from './src/card';
import { collapseShortcuts } from './src/collapse';
import { checkboxShortcuts } from './src/checkbox';
import { dividerShortcuts } from './src/divider';
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
import { emptyShortcuts } from './src/empty';
import { virtualListShortcuts } from './src/virtual-list';
import { pageShortcuts } from './src/pagination';
import { IKUN_SAFE_LIST } from '../utils/constant';
import { formShortcuts } from './src/form';
import { dropdownShortcuts } from './src/dropdown';
import { tabsShortcuts } from './src/tabs';
import { descriptionsShortcuts } from './src/descriptions';
import { getDescriptionsGridColCls } from '../rules/src/descriptions';
import { descriptionsItemShortcuts } from './src/descriptions-item';
import { getDescriptionsItemGridColStartCls } from '../rules/src/descriptions-item';
import { carouselShortcuts } from './src/carousel';
import { affixShortcuts } from './src/affix';
import { statisticShortcuts } from './src/statistic';
import { inputNumberShortcuts } from './src/input-number';
import { pageHeadersShortcuts } from './src/page-header';
import { scrollbarShortcuts } from './src/scrollbar';
import { imageShortcuts } from './src/image';
import { imageViewShortcuts } from './src/image-view';
export const defaultShortcuts = [
	baseShortcuts,
	commonShortcuts,
	// don't remove
	// anchor defaultShortcuts
	// segmented
	segmentedShortcuts,
	// flex
	flexShortcuts,
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
	// card
	cardShortcuts,
	// divider
	dividerShortcuts,
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
	// form fromItem
	formShortcuts,
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
	contextmenuShortcuts,
	// empty
	emptyShortcuts,
	// virtualList
	virtualListShortcuts,
	// page
	pageShortcuts,
	// dropdown
	dropdownShortcuts,
	// tabs
	tabsShortcuts,
	// descriptions
	descriptionsShortcuts,
	// descriptions item
	descriptionsItemShortcuts,
	// carousel
	carouselShortcuts,
	// affix
	affixShortcuts,
	// statistic
	statisticShortcuts,
	// input-number
	inputNumberShortcuts,
	// page-header
	pageHeadersShortcuts,
	// scrollbar
	scrollbarShortcuts,
	// image
	imageShortcuts,
	// image-view
	imageViewShortcuts
] as UserShortcuts<Theme>;

export function getSafeList() {
	// don't remove
	// anchor shortcuts
	const segmentedList = Object.keys(segmentedShortcuts);
	const flexList = Object.keys(flexShortcuts);
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
	const cardList = Object.keys(cardShortcuts);
	const collapseList = Object.keys(collapseShortcuts);
	const checkboxList = Object.keys(checkboxShortcuts);
	const dividerList = Object.keys(dividerShortcuts);
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
	const formList = Object.keys(formShortcuts);
	const spinList = Object.keys(spinShortcuts);
	const backtopList = Object.keys(backtopShortcuts);
	const sliderList = Object.keys(sliderShortcuts);
	const progressList = Object.keys(progressShortcuts);
	const linkList = Object.keys(linkShortcuts);
	const layoutList = Object.keys(layoutShortcuts);
	const gridList = Object.keys(gridShortcuts);
	const popconfirmList = Object.keys(popconfirmShortcuts);
	const contextmenuList = Object.keys(contextmenuShortcuts);
	const emptyList = Object.keys(emptyShortcuts);
	const virtualList = Object.keys(virtualListShortcuts);
	const pageList = Object.keys(pageShortcuts);
	const dropdownList = Object.keys(dropdownShortcuts);
	const tabsList = Object.keys(tabsShortcuts);
	const descriptionsList = Object.keys(descriptionsShortcuts);
	const descriptionsItemList = Object.keys(descriptionsItemShortcuts);
	const carouselList = Object.keys(carouselShortcuts);
	const affixList = Object.keys(affixShortcuts);
	const statisticList = Object.keys(statisticShortcuts);
	const inputNumberList = Object.keys(inputNumberShortcuts);
	const pageHeaderList = Object.keys(pageHeadersShortcuts);
	const scrollList = Object.keys(scrollbarShortcuts);
	const imageList = Object.keys(imageShortcuts);
	const imageViewList = Object.keys(imageViewShortcuts);
	let res = iconList
		// don't remove
		// anchor list
		.concat(segmentedList)
		.concat(flexList)
		.concat(IKUN_SAFE_LIST)
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
		.concat(cardList)
		.concat(collapseList)
		.concat(checkboxList)
		.concat(formList)
		.concat(spinList)
		.concat(backtopList)
		.concat(sliderList)
		.concat(progressList)
		.concat(linkList)
		.concat(layoutList)
		.concat(gridList)
		.concat(popconfirmList)
		.concat(dividerList)
		.concat(emptyList)
		.concat(contextmenuList)
		.concat(virtualList)
		.concat(pageList)
		.concat(dropdownList)
		.concat(tabsList)
		.concat(pageList)
		.concat(descriptionsList)
		.concat(descriptionsItemList)
		.concat(affixList)
		.concat(statisticList)
		.concat(inputNumberList)
		.concat(pageHeaderList)
		.concat(scrollList)
		.concat(imageList)
		.concat(imageViewList)
		.concat(carouselList);

	// rules
	const colSizeRules = Object.keys(createColSizeClsByNum());
	const colRules = Object.keys(getColCls());
	const descriptionsRules = Object.keys(getDescriptionsGridColCls());
	const descriptionsItemRules = Object.keys(getDescriptionsItemGridColStartCls());
	res = res
		.concat(colSizeRules)
		.concat(colRules)
		.concat(descriptionsRules)
		.concat(descriptionsItemRules);
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
export { cardShortcuts } from './src/card';
export { collapseShortcuts } from './src/collapse';
export { checkboxShortcuts } from './src/checkbox';
export { dividerShortcuts } from './src/divider';
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
export { emptyShortcuts } from './src/empty';
export { virtualListShortcuts } from './src/virtual-list';
export { pageShortcuts } from './src/pagination';
export { formShortcuts } from './src/form';
export { dropdownShortcuts } from './src/dropdown';
export { tabsShortcuts } from './src/tabs';
export { descriptionsShortcuts } from './src/descriptions';
export { descriptionsItemShortcuts } from './src/descriptions-item';
export { carouselShortcuts } from './src/carousel';
export { affixShortcuts } from './src/affix';
export { statisticShortcuts } from './src/statistic';
export { inputNumberShortcuts } from './src/input-number';
export { pageHeadersShortcuts } from './src/page-header';
export { scrollbarShortcuts } from './src/scrollbar';
export { imageShortcuts } from './src/image';
export { imageViewShortcuts } from './src/image-view';
export { flexShortcuts } from './src/flex';
export { segmentedShortcuts } from './src/segmented';
