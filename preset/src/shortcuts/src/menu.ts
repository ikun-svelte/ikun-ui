export const menuShortcuts: Record<string, string> = {
	'k-menu':
		'bg-white text-ikun-tx-base p-0 m-0 box-border text-14px leading-0 list-none outline-none focus:outline-none k-menu-transition-w',


	'k-menu-item': 'box-border select-none',
	'k-menu-item-icon': 'inline-flex text-inherit items-center leading-0 min-w-14px',
	'k-menu-title-content': 'truncate box-border k-menu-transition-c select-none',
	'k-menu-title-content-i': 'm-is-6px m-ie-6px k-menu-transition-o opacity-[1] truncate',
	'k-menu-item-divider': 'my-0',

	'k-menu-sub': 'border-none bg-transparent',
	'k-menu-sub-bg': 'ikun:2:bg-black',

	'k-menu-horizontal': '',
	'k-menu-item-horizontal': '',

	'k-menu-item-selected': 'ikun:20:bg-ikun-main text-ikun-main hover:(ikun:20:bg-ikun-main)',
	'k-menu-item-selected-ih': 'text-ikun-main',
	'k-menu-item-hover-ih': 'hover:(ikun:6:bg-ikun-black)',
	'k-menu-item-vh-child': 'justify-between',

	'k-menu-inline': 'bdr-1 b-e-solid border-ikun-bd-base',
	'k-menu-vertical': 'bdr-1 b-e-solid border-ikun-bd-base',
	'k-menu-item-vertical': '',
	'k-menu-item-inline':
		'cursor-pointer k-menu-w k-menu-transition ' +
		'flex items-center pr h-40px leading-40px list-style-position ps-16px p-ie-16px m-is-4px m-ie-4px m-bs-4px m-be-4px ' +
		'rounded-8px active:(ikun:20:bg-ikun-main)',
	'k-menu-item-inline-group':
		'k-menu-w k-menu-transition ' +
		'flex items-center pr h-40px leading-40px list-style-position ps-16px p-ie-16px m-is-4px m-ie-4px m-bs-4px m-be-4px ' +
		'rounded-8px ikun:50:text-black'
};
