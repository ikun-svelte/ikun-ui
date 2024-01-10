export const stepsShortcuts: Record<string, string> = {
	'k-steps': 'm-0 p-0 box-border w-full',
	'k-steps-horizontal': 'flex',
	'k-steps-container-horizontal': 'inline-block flex-1 ps-16px last:flex-none first:ps-0',
	'k-steps-container-vertical': 'block',
	'k-steps-container': 'align-top pr overflow-hidden box-border',
	'k-steps-label-container-vertical': 'ps-0',

	'k-step': 'whitespace-nowrap',
	'k-step-vertical': 'pr my-4px',
	'k-step-label-vertical': 'fcc flex-col text-center w-120px',
	'k-step--click': 'cursor-pointer',
	'k-step-icon':
		'bd-1 border-solid border-transparent rounded-full h-32px w-32px k-icon-transition',
	'k-step-icon--click': 'border-ikun-main text-ikun-main',
	'k-step-icon--inner': 'h-full w-full fcc',
	'k-step-icon--finish': 'ikun:20:bg-ikun-main text-ikun-main',
	'k-step-icon--process': 'bg-ikun-main text-white',
	'k-step-icon--wait': 'text-ikun-tx-gr',
	'k-step-icon--wait-bg': 'bg-ikun-bg-grs2',
	'k-step-icon--error': 'bg-ikun-error text-white',
	'k-step-icon-vertical': 'block',
	'k-step-icon-horizontal': 'inline-block',

	'k-step-content': 'align-top inline-block box-border whitespace-nowrap',
	'k-step-content-vertical': 'block',

	'k-step-title': 'pr inline-block  text-16px leading-32px pe-16px',
	'k-step-title-vertical': 'block pe-0 mt-6px',
	'k-step-title--click': 'text-ikun-main',
	'k-step-title--error': 'text-ikun-error',
	'k-step-title--wait': 'text-ikun-tx-gr',

	'k-step-tail': 'h-full w-1px pa start-16px top-0 pt-38px pb-6px px-0',
	'k-step-label-tail-vertical':
		'h-1px w-full pa start-120px top-0 after:(content-[""] inline-block w-full h-1px bg-ikun-bg-grs2 k-icon-transition)',
	'k-step-tail-vertical':
		'after:(content-[""] inline-block w-1px h-full bg-ikun-bg-grs2 k-icon-transition)',
	'k-step-tail-horizontal':
		'after:(content-[""] pa top-16px block w-9999px h-1px start-full bg-ikun-bg-grs2 k-icon-transition)',
	'k-step-tail--none': 'after:(bg-transparent)',
	'k-step-tail--finish': 'after:(bg-ikun-main)',

	'k-step-sub-title': 'inline ms-8px font-400 text-14px text-ikun-tx-gr',
	'k-step-sub-title-vertical': 'block ms-0 leading-22px mb-4px',

	'k-step-description': 'text-14px whitespace-normal',
	'k-step-description--no-process': 'text-ikun-tx-gr',
	'k-step-description--error': 'text-ikun-error',
	'k-step-description--click': 'text-ikun-main'
};
