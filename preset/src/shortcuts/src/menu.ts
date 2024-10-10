export const menuShortcuts: Record<string, string> = {
	'k-menu':
		'bg-white text-ikun-tx-base p-0 m-0 box-border text-14px leading-0 list-none outline-none focus:outline-none k-menu-transition-w',

	'k-menu-item': 'box-border select-none',
	'k-menu-item-icon-root': 'truncate fsc',
	'k-menu-item-icon-root--collapsed': 'truncate w-full fcc',
	'k-menu-item-icon': 'inline-flex text-inherit items-center leading-0 min-w-14px',
	'k-menu-title-content': 'truncate box-border k-menu-transition-c select-none',
	'k-menu-title-content-i': 'm-is-6px m-ie-6px k-menu-transition-o opacity-[1] truncate',
	'k-menu-item-divider': 'my-0 w-full',

	'k-menu-sub': 'border-none bg-transparent',
	'k-menu-sub-bg': 'ikun:2:bg-black',

	'k-menu-item-selected': 'ikun:20:bg-ikun-main text-ikun-main hover:(ikun:20:bg-ikun-main)',
	'k-menu-item-selected-group': 'text-ikun-main',
	'k-menu-item-hover': 'hover:(ikun:6:bg-ikun-black)',

	'k-menu-item-selected-after':
		'after:(content-empty pa -bottom-1px bdb-3 border-solid b-b-ikun-main w-full left-0 animate-ikun-scale)',
	'k-menu-item-selected-h': 'text-ikun-main k-menu-item-selected-after',
	'k-menu-item-selected-group-h': 'text-ikun-main k-menu-item-selected-after',
	'k-menu-item-hover-h': 'hover:(k-menu-item-selected-after)',

	'k-menu-item-child': 'justify-between',

	'k-menu-vertical': 'bdr-1 b-e-solid border-ikun-bd-base overflow-hidden',
	'k-menu-item-popover-trigger-vertical': 'box-border my-4px',
	'k-menu-item-vertical': 'k-menu-item-inline my-0',
	'k-menu-item-vertical-group':
		'k-menu-w k-menu-transition ' +
		'flex items-center pr h-40px leading-40px list-inside ps-16px p-ie-16px m-is-4px m-ie-4px ' +
		'rounded-8px ikun:50:text-black',

	'k-menu-horizontal': 'bdb-1 b-solid border-ikun-bd-base flex [&.k-menu-sub-horizontal]:block',
	'k-menu-item-popover-trigger-horizontal': 'box-border my-4px',
	'k-menu-item-popover-content': 'p-0 box-border',
	'k-menu-item-horizontal':
		'cursor-pointer k-menu-w k-menu-transition ' +
		'fcc pr h-40px leading-40px list-inside ps-16px p-ie-16px m-is-4px m-ie-4px my-4px ' +
		'rounded-8px my-0',
	'k-menu-item-horizontal-not-top': 'k-menu-item-horizontal fbc active:(ikun:20:bg-ikun-main)',
	'k-menu-item-horizontal-group':
		'k-menu-w k-menu-transition ' +
		'flex items-center pr h-40px leading-40px list-inside ps-16px p-ie-16px m-is-4px m-ie-4px ' +
		'rounded-8px ikun:50:text-black',
	'k-menu-item-popover-trigger-horizontal-divider': 'fcc',
	'k-menu-item-divider-horizontal': 'h-32px',

	'k-menu-inline': 'bdr-1 b-e-solid border-ikun-bd-base overflow-hidden',
	'k-menu-item-inline':
		'cursor-pointer k-menu-w k-menu-transition ' +
		'flex items-center pr h-40px leading-40px list-inside ps-16px p-ie-16px m-is-4px m-ie-4px my-4px ' +
		'rounded-8px active:(ikun:20:bg-ikun-main)',
	'k-menu-item-inline-group':
		'k-menu-w k-menu-transition ' +
		'flex items-center pr h-40px leading-40px list-inside ps-16px p-ie-16px m-is-4px m-ie-4px my-4px ' +
		'rounded-8px ikun:50:text-black'
};
