export const stepsShortcuts: Record<string, string> = {
	'k-steps': 'm-0 p-0 box-border flex w-full',
	'k-steps-container':
		'ps-16px align-top inline-block flex-1 pr overflow-hidden box-border last:flex-none first:ps-0',
	'k-step': 'whitespace-nowrap',
	'k-step--click': 'cursor-pointer',
	'k-step-icon':
		'bd-1 border-solid border-transparent rounded-full h-32px w-32px inline-block k-icon-transition',
	'k-step-icon--click': 'border-ikun-main text-ikun-main',
	'k-step-icon--inner': 'h-full w-full fcc',
	'k-step-icon--finish': 'ikun:20:bg-ikun-main text-ikun-main',
	'k-step-icon--process': 'bg-ikun-main text-white',
	'k-step-icon--wait': 'text-ikun-tx-gr',
	'k-step-icon--wait-bg': 'bg-ikun-bg-grs2',
	'k-step-icon--error': 'bg-ikun-error text-white',

	'k-step-content': 'align-top inline-block box-border whitespace-nowrap',

	'k-step-title':
		'pr inline-block  text-16px leading-32px pe-16px after:(content-[""] pa top-16px block w-9999px h-1px start-full bg-ikun-bg-grs2 k-icon-transition)',
	'k-step-title--click': 'text-ikun-main',
	'k-step-tail--none': 'after:(bg-transparent)',
	'k-step-tail--finish': 'after:(bg-ikun-main)',
	'k-step-title--error': 'text-ikun-error',
	'k-step-title--wait': 'text-ikun-tx-gr',

	'k-step-sub-title': 'inline ms-8px font-400 text-14px text-ikun-tx-gr',

	'k-step-description': 'text-14px whitespace-normal',
	'k-step-description--no-process': 'text-ikun-tx-gr',
	'k-step-description--error': 'text-ikun-error',
	'k-step-description--click': 'text-ikun-main'
};
