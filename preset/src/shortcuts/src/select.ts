export const selectShortcuts: Record<string, string> = {
	// select
	'k-select--base': 'fi k-border border-ikun-bd-base rounded px-2 py-1 box-border cursor-pointer',
	'k-select--base__disabled': 'k-bg-disabled k-cur-disabled',
	'k-select__hover': 'hover:border-ikun-main',
	'k-select__focus': 'focus-within:border-ikun-main focus-within:k-input-shadow',
	'k-select--prefix': 'mr-0.4em text-1em op50',
	'k-select--suffix': 'ml-0.4em text-1em op50',
	'k-select--clear': 'op50',
	'k-select--clear__hover': 'hover:text-ikun-main hover:op100',
	'k-select--inner': 'w-full flex-auto !outline-none border-transparent text-size-inherit',
	'k-select--clear__animate': 'animate-ikun-checking-main',
	// option ikun:50:bg-ikun-main
	'k-select--option': 'rounded mx-2 pl-2 py-1 box-border cursor-pointer text-ikun-tx-base',
	'k-select--option__hover': 'hover:ikun:80:bg-ikun-main hover:text-white',
	'k-select--option__active': 'text-ikun-main font-600 ',
	// dark
	'k-select--inner__dark': 'dark:bg-ikun-dark-300',
	'k-select--base__disabled__dark': 'dark:bg-ikun-dark',
	'k-select--base__dark': 'dark:bg-ikun-dark-300'
};
