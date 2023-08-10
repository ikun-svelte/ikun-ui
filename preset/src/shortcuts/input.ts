export const inputShortcuts: Record<string, string> = {
	// input
	'k-input--base': 'fi rounded k-border border-ikun-bd-base py-1 pl-1 pr-2 pr',
	'k-input--base__disabled': 'k-bg-disabled k-cur-disabled',
	'k-input--base__hover': 'hover:border-ikun-main',
	'k-input--base__focus': 'focus-within:border-ikun-main focus-within:k-input-shadow',
	'k-input--inner': 'ml-0.4em w-full flex-auto !outline-none border-transparent text-base',
	'k-input--icon': 'ml-0.3em mr-0.1em text-1.1em op50',
	// error
	'k-input--base__error': 'border-ikun-error k-input-shadow--error',
	'k-input--base__msg__error': 'absolute left-0 -bottom-5 text-xs text-ikun-error',
	// dark
	'k-input--inner__dark': 'dark:bg-ikun-dark-300',
	'k-input--base__disabled__dark': 'dark:bg-ikun-dark',
	'k-input--base__dark': 'dark:bg-ikun-dark-300'
};
