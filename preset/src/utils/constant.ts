export const DEFAULT_COLOR = '#f8a153';
export const DEFAULT_PRESET_NAME = '@ikun-ui/preset';

export const BREAK_POINT = {
	xs: '768px',
	sm: '768px',
	md: '992px',
	lg: '1200px',
	xl: '1920px'
};

export const COLOR_PREFIX = '--ikun';

/**
 * 部分原子类没有抽取为 shortcut
 * 某些情况会被 unocss 忽略（#331）
 * 所以需要放入 safelist 中
 */
export const IKUN_SAFE_LIST = [
	'i-carbon-close-outline',
	'i-carbon-circle-dash',
	'i-carbon-arrow-up',
	'i-carbon-checkmark',
	'i-carbon-subtract',
	'i-carbon-chevron-right',
	'i-carbon:close-outline',
	'i-carbon-view-off',
	'i-carbon-view',
	'i-carbon-close',
	'i-carbon-add',
	'i-carbon-chevron-left',
	'i-carbon-settings',
	'i-carbon:radio-button-checked',
	'i-carbon-chevron-down',
	'i-carbon-overflow-menu-horizontal',
	'i-carbon-page-last',
	'i-carbon-page-first',
	'rotate-180',
	'px-0',
	'w-full',
	'flex',
	'inline-flex',
	'ml-1',
	'ml-2',
	'mr-2',
	'text-white',
	'rotate-90',
	'right-0',
	'justify-start',
	'justify-end',
	'left-0'
];
