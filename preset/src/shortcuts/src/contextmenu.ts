export const contextmenuShortcuts: Record<string, string> = {
	'k-contextmenu--base': 'pf rounded shadow-lg bg-white !px-2 m-0 list-none',
	'k-contextmenu-item': 'list-none rounded text-sm my-1',
	'k-contextmenu-item--base':
		'p-1 cursor-pointer text-ikun-tx-base hover:(text-white bg-ikun-main)',
	'k-contextmenu-item__disabled': 'p-1 k-bg-disabled k-cur-disabled text-ikun-info',
	'k-contextmenu-item__divider':
		'my-1 border-solid border-t-1 border-l-0 border-r-0 border-b-0 border-ikun-bd-base',
	'k-contextmenu-sub-menu--base': 'k-contextmenu-item k-contextmenu-item--base fbc',
	'k-contextmenu-sub-menu-item': 'k-contextmenu--base',
	'k-contextmenu-sub-menu__disabled':
		'k-contextmenu-item__disabled !hover:(k-bg-disabled text-ikun-info)',

	// dark
	'k-contextmenu--base__dark': 'dark:bg-ikun-dark-300',
	'k-contextmenu-item--base__dark': 'dark:text-ikun-white',
	'k-contextmenu-sub-menu--base__dark': 'dark:text-ikun-white',
	'k-contextmenu-sub-menu-item__dark': 'k-contextmenu--base__dark',
	'k-contextmenu-item__disabled__dark': 'ikun:40:bg-ikun-main',
	'k-contextmenu-sub-menu__disable__dark': 'k-contextmenu-item__disabled__dark'
};
