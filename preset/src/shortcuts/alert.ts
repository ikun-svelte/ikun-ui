export const alertShortcuts = {
	'k-alert': 'w-full box-border fi relative m-0 px-16px py-8px b-rd-4px overflow-hidden',
	'k-alert--icon': 'mr-8px',

	// success
	'k-alert--success': 'bg-ikun-success-100 text-ikun-success',
	'k-alert--success__animate': 'animate-ikun-clicking--success',
	'k-alert--success__icon': 'i-carbon-checkmark-filled',
	'k-alert--success__icon-color': 'text-ikun-success',
	'k-alert--success__close-icon':
		'hover:(bg-ikun-success [&>div.k-icon--base]:text-ikun-white b-rd-50%) active:(b-ikun-success k-btn-shadow--success)',

	// error
	'k-alert--error': 'bg-ikun-error-100 text-ikun-error',
	'k-alert--error__animate': 'animate-ikun-clicking--error',
	'k-alert--error__icon': 'i-carbon-error-filled',
	'k-alert--error__icon-color': 'text-ikun-error',
	'k-alert--error__close-icon':
		'hover:(bg-ikun-error [&>div.k-icon--base]:text-ikun-white b-rd-50%) active:(b-ikun-error k-btn-shadow--error)',

	// warning
	'k-alert--warning': 'bg-ikun-warning-100 text-ikun-warning',
	'k-alert--warning__animate': 'animate-ikun-clicking--warning',
	'k-alert--warning__icon': 'i-carbon-warning-filled',
	'k-alert--warning__icon-color': 'text-ikun-warning',
	'k-alert--warning__close-icon':
		'hover:(bg-ikun-warning [&>div.k-icon--base]:text-ikun-white b-rd-50%) active:(b-ikun-warning k-btn-shadow--warning)',

	// info
	'k-alert--info': 'bg-ikun-info-100 text-ikun-info',
	'k-alert--info__animate': 'animate-ikun-clicking--info',
	'k-alert--info__icon': 'i-carbon-information-filled',
	'k-alert--info__icon-color': 'text-ikun-info',
	'k-alert--info__close-icon':
		'hover:(bg-ikun-info-500 [&>div.k-icon--base]:text-ikun-white b-rd-50%) active:(b-ikun-info-500 k-btn-shadow--info)',

	'k-alert--content': 'text-14px flex-1',
	'k-alert--title': 'font-600',
	'k-alert--description': 'text-12px text-justify m-0 mt-4px',
	'k-alert--description__no-title': 'mt-0',

	'k-alert--close': 'text-12px inline-flex cursor-pointer ml-8px',
	'k-alert--close__icon-color': '[&,&>div.k-icon--base]:color-ikun-stone-400',
	'k-alert--close__has-description': 'absolute top-10px right-16px'
};
