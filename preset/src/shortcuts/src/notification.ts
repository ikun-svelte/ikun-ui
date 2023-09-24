export const notificationShortcuts: Record<string, string> = {
	// notification
	'k-notification--base':
		'k-notify-transition fixed z-1001 rounded shadow bg-ikun-white p2 min-w-240px',
	'k-notification--body': 'fbc w-full',
	'k-notification--title': 'fcc text-lg text-ikun-tx-base my-0',
	'k-notification--type--icon': 'mr-2',
	'k-notification--close--icon': 'hover:text-ikun-main',
	'k-notification--content': 'p2 mt-2',
	'k-notification--info': 'text-ikun-info',
	'k-notification--warning': 'text-ikun-warning',
	'k-notification--error': 'text-ikun-error',
	'k-notification--success': 'text-ikun-success',
	'k-notification--icon--info': 'i-carbon-information-filled',
	'k-notification--icon--warning': 'i-carbon-warning-filled',
	'k-notification--icon--error': 'i-carbon-error-filled',
	'k-notification--icon--success': 'i-carbon-checkmark-filled',
	// dark
	'k-notification--base__dark': 'dark:bg-ikun-dark-300 dark:shadow-ikun-main',
	'k-notification--title__dark': 'dark:text-ikun-white'
};
