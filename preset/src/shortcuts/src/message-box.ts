export const msgBoxShortcuts: Record<string, string> = {
	// message box
	'k-msg-box--base':
		'bg-ikun-white p-2 origin-center transform -translate-x-1/2 -translate-y-1/2 rounded shadow fixed min-w-1/3 left-1/2 top-1/2',
	'k-msg-box--header--title': 'fi h-8 w-full text-ikun-tx-base font-bold text-lg my-0',
	'k-msg-box--input__prompt': 'mt-4',
	'k-msg-box--body': 'p2',
	'k-msg-box--footer': 'flex p2 fi',
	'k-msg-box--footer--btn': 'mx-2',
	'k-msg-box--info': 'text-ikun-info',
	'k-msg-box--warning': 'text-ikun-warning',
	'k-msg-box--error': 'text-ikun-error',
	'k-msg-box--success': 'text-ikun-success',
	'k-msg-box--icon': 'mr-2',
	'k-msg-box--icon--info': 'i-carbon-information-filled',
	'k-msg-box--icon--warning': 'i-carbon-warning-filled',
	'k-msg-box--icon--error': 'i-carbon-error-filled',
	'k-msg-box--icon--success': 'i-carbon-checkmark-filled',
	// dark
	'k-msg-box--base__dark': 'dark:bg-ikun-dark-300 dark:shadow dark:shadow-ikun-main',
	'k-msg-box--header--title__dark': 'dark:text-ikun-white'
};
