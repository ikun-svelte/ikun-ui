export const dropdownShortcuts: Record<string, string> = {
	// dropdown
	'k-dropdown': 'border-0 p-0 line-height-none bg-transparent',
	'k-dropdown-item-container': '!px-2 overflow-y-auto',
	'k-dropdown-item': 'rounded text-sm my-1',
	'k-dropdown-item--base': 'p-1 cursor-pointer text-ikun-tx-base hover:(text-white bg-ikun-main)',
	'k-dropdown-item__disabled': 'p-1 k-bg-disabled k-cur-disabled text-ikun-info',
	'k-dropdown-item__divider':
		'my-1 border-solid border-t-1 border-l-0 border-r-0 border-b-0 border-ikun-bd-base',
	// dark
	'k-dropdown-item--base__dark': 'dark:text-ikun-white',
	'k-dropdown-item__disabled__dark': 'dark:ikun:40:bg-ikun-main',
	'k-dropdown-item-container__dark': 'bg-white !px-2'
};
