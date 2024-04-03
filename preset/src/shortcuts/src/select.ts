export const selectShortcuts: Record<string, string> = {
	// select
	'k-select--base': 'fi k-border border-ikun-bd-base rounded px-2 py-1 box-border cursor-pointer',
	'k-select--base__disabled': 'k-bg-disabled k-cur-disabled',
	'k-select__hover': 'hover:border-ikun-main',
	'k-select__focus': 'focus-within:border-ikun-main focus-within:k-input-shadow',
	'k-select--prefix': 'mr-0.4em text-1em op50',
	'k-select--suffix': 'mx-0.4em text-1em op50',
	'k-select--icon': 'op50 k-icon-transition',
	'k-select--inner': 'w-full h-full flex-auto !outline-none border-transparent bg-transparent',
	'k-select--inner__sm': 'text-12px',
	'k-select--inner__md': 'text-14px',
	'k-select--inner__lg': 'text-16px',
	'k-select__sm': 'h-24px',
	'k-select__md': 'h-30px',
	'k-select__lg': 'h-38px',

	'k-select--icon__sm': '!w-12px !h-12px',
	'k-select--icon__md': '!w-16px !h-16px',
	'k-select--icon__lg': '!w-20px !h-20px',

	'k-select--clear__animate': 'animate-ikun-checking-main',
	'k-select--tx__empty': 'w-full text-center text-ikun-tx-gr',
	// option ikun:50:bg-ikun-main
	'k-select--option': 'rounded mx-2 pl-2 py-1 box-border cursor-pointer text-ikun-tx-base',
	'k-select--option__hover': 'hover:ikun:80:bg-ikun-main hover:text-white',
	'k-select--option__active': 'text-ikun-main',
	'k-select--option__fit': 'text-ellipsis overflow-hidden',

	// error
	'k-select__error': 'border-ikun-error k-input-shadow--error',

	// dark
	'k-select--inner__dark': 'dark:bg-ikun-dark-300 dark:text-ikun-white',
	'k-select--inner__disabled__dark': 'dark:bg-ikun-dark dark:text-ikun-white',
	'k-select--base__dark': 'dark:bg-ikun-dark-300 ',
	'k-select--base__disabled__dark': 'dark:bg-ikun-dark dark:text-ikun-white',
	'k-select--option__dark': 'dark:text-ikun-white'
};
