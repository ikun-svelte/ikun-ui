export const inputShortcuts: Record<string, string> = {
	// input
	'k-input': 'relative fi rounded k-border border-ikun-bd-base',
	'k-input--inner': 'w-full flex-auto border-none text-size-inherit',
	'k-input--icon': 'op50',
	'k-input--prefix-icon': 'mr-1.5',
	'k-input--suffix-icon': 'ml-1.5',

	// size
	'k-input--sm': 'h-22px px-1.5 text-12px',
	'k-input--md': 'h-30px px-2.5 text-14px',
	'k-input--lg': 'h-38px px-3.5 text-16px',

	'k-input--icon--sm': '!w-12px !h-12px',
	'k-input--icon--md': '!w-20px !h-20px',
	'k-input--icon--lg': '!w-24px !h-24px',

	'k-input__disabled': 'k-bg-disabled k-cur-disabled',
	'k-input__hover': 'hover:border-ikun-main',
	'k-input__focus': 'focus-within:border-ikun-main focus-within:k-input-shadow',

	// error
	'k-input__error': 'border-ikun-error k-input-shadow--error',
	'k-input__msg__error':
		'absolute left-0 top-full pt-2px text-ikun-error text-12px line-height-none',

	// dark
	'k-input__dark': 'dark:bg-ikun-dark-300',
	'k-input--inner__dark': 'dark:bg-ikun-dark-300',
	'k-input__disabled__dark': 'dark:bg-ikun-dark'
};
