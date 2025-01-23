export const tabsShortcuts: Record<string, string> = {
	'k-tabs': 'w-full',
	'k-tabs__header': 'fbc pr',
	'k-tabs__header--card': 'k-tabs__header',
	'k-tabs__header--border': 'k-tabs__header bg-ikun-bg-tab',
	'k-tabs__nav--wrap': 'fbc pr overflow-hidden',
	'k-tabs__nav--wrap--card': 'border-solid border-ikun-bd-base n-bdb-1 rounded-t',
	'k-tabs__nav--wrap--border': 'border-solid border-ikun-bd-base n-bdb-1 rounded-tl',
	'k-tabs__nav': 'flex pr float-left whitespace-nowrap k-tab-transition z-1',
	'k-tabs__nav--scroll': 'fi overflow-hidden',
	'k-tabs__pad': 'py-0 px-20px box-border',
	'k-tabs__prev': 'fcc h-full pa left-0 cursor-pointer hover:text-ikun-main',
	'k-tabs__next': 'fcc h-full pa right-0 cursor-pointer hover:text-ikun-main',

	'k-tabs__add--wrap': 'flex-1 h-40px fec',
	'k-tabs__add--wrap--border': 'border-solid border-ikun-bd-base bdtr-1 rounded-tr',
	'k-tabs__add':
		'ml-4px border-solid border-1 border-ikun-bd-base rounded cursor-pointer hover:text-ikun-main',
	'k-tabs__add--border': 'mr-10px',
	'k-tabs__bar': 'pa left-0 bottom-0px h-2px bg-ikun-main z-1 w-full',
	'k-tabs__nav-item':
		'k-reset-btn  k-tab__nav-transition whitespace-nowrap pr box-border py-0 px-16px h-40px fcc text-base text-ikun-tx-base cursor-pointer select-none',
	'k-tabs__nav-item--active': 'text-ikun-main bg-white',
	'k-tabs__nav-item--hover': 'hover:(text-ikun-main)',
	'k-tabs__nav-item--disabled': 'opacity-50 k-cur-disabled',
	'k-tabs__nav-item--card': 'border-solid border-ikun-bd-base bdl-1',

	'k-tabs__content': 'p-10px box-border',
	'k-tabs__content--border': 'border-solid border-ikun-bd-base n-bdt-1 rounded-b',
	'k-tabs__close': 'k-reset-btn cursor-pointer ml-4px k-tab-transition-all fcc',
	'k-tabs__close--hover': 'hover:(text-white bg-ikun-main rounded-full)',

	// dark
	'k-tabs__nav-item--dark': 'dark:(text-ikun-white)',
	'k-tabs__nav-item--active--dark': 'dark:(bg-transparent text-ikun-main)',
	'k-tabs__nav-item--border--active--dark': 'dark:(bg-ikun-dark-500)',
	'k-tabs__header--border--dark': 'dark:(bg-ikun-dark-300)',
	'k-tabs__content--border--dark': 'k-tabs__nav-item--border--active--dark',
	'k-tabs__add--dark': 'dark:[&>span:hover]:text-ikun-main',
	'k-tabs__next--dark': 'k-tabs__add--dark',
	'k-tabs__prev--dark': 'dark:[&>span:hover]:text-ikun-main',
	'k-tabs__close--dark': 'dark:[&>span]:text-ikun-main',
	'k-tabs__close--hover--dark': 'dark:[&:hover>span]:text-white'
};
