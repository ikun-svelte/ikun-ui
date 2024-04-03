export const buttonShortcuts: Record<string, string> = {
	// button
	'k-button--disabled': 'opacity-50',
	'k-button--base': 'h-32px rounded k-border cursor-pointer f-c px-2 py-1 w-fit line-height-none',
	// button-size
	'k-button--sm': 'px-1.5 py-0.8 h-24px',
	'k-button--lg': 'px-3 py-2 h-40px',
	'k-button--circle': '!rounded-full p-2 h-32px w-32px',
	'k-button--circle--sm': '!rounded-full !p-0 h-24px w-24px',
	'k-button--circle--lg': '!rounded-full !p-0 h-40px w-40px',

	'k-button--primary': 'bg-ikun-primary-100 text-ikun-primary border-ikun-primary-100',
	'k-button--primary__ghost': 'text-ikun-primary  bg-white',
	'k-button--primary__fill': 'bg-ikun-primary text-ikun-primary-100 border-ikun-primary',
	'k-button--primary__active': 'active:border-ikun-primary active:k-btn-shadow--primary',
	'k-button--primary__focus':
		'focus-visible:border-ikun-primary focus-visible:k-btn-shadow--primary',
	'k-button--primary__hover': 'hover:border-ikun-primary',
	'k-button--primary__hover__fill': 'hover:bg-ikun-primary-500 hover:border-ikun-primary-500',
	'k-button--primary__icon': 'text-ikun-primary',
	'k-button--primary__icon__fill': 'text-ikun-primary-100',
	'k-button--primary__border': 'border-ikun-primary',
	'k-button--primary__animate': 'animate-ikun-clicking--primary',

	'k-button--success': 'bg-ikun-success-100 text-ikun-success border-ikun-success-100',
	'k-button--success__ghost': 'text-ikun-success  bg-white',
	'k-button--success__fill': 'bg-ikun-success text-ikun-success-100 border-ikun-success',
	'k-button--success__active': 'active:border-ikun-success active:k-btn-shadow--success',
	'k-button--success__focus':
		'focus-visible:border-ikun-success focus-visible:k-btn-shadow--success',
	'k-button--success__hover': 'hover:border-ikun-success',
	'k-button--success__hover__fill': 'hover:bg-ikun-success-500 hover:border-ikun-success-500',
	'k-button--success__icon': 'text-ikun-success',
	'k-button--success__icon__fill': 'text-ikun-success-100',
	'k-button--success__border': 'border-ikun-success',
	'k-button--success__animate': 'animate-ikun-clicking--success',

	'k-button--error': 'bg-ikun-error-100 text-ikun-error border-ikun-error-100',
	'k-button--error__ghost': 'text-ikun-error  bg-white',
	'k-button--error__fill': 'bg-ikun-error text-ikun-error-100 border-ikun-error',
	'k-button--error__active': 'active:border-ikun-error active:k-btn-shadow--error',
	'k-button--error__focus': 'focus-visible:border-ikun-error focus-visible:k-btn-shadow--error',
	'k-button--error__hover': 'hover:border-ikun-error',
	'k-button--error__hover__fill': 'hover:bg-ikun-error-500 hover:border-ikun-error-500',
	'k-button--error__icon': 'text-ikun-error',
	'k-button--error__icon__fill': 'text-ikun-error-100',
	'k-button--error__border': 'border-ikun-error',
	'k-button--error__animate': 'animate-ikun-clicking--error',

	'k-button--warning': 'bg-ikun-warning-100 text-ikun-warning border-ikun-warning-100',
	'k-button--warning__ghost': 'text-ikun-warning  bg-white',
	'k-button--warning__fill': 'bg-ikun-warning text-ikun-warning-100 border-ikun-warning',
	'k-button--warning__active': 'active:border-ikun-warning active:k-btn-shadow--warning',
	'k-button--warning__focus':
		'focus-visible:border-ikun-warning focus-visible:k-btn-shadow--warning',
	'k-button--warning__hover': 'hover:border-ikun-warning',
	'k-button--warning__hover__fill': 'hover:bg-ikun-warning-500 hover:border-ikun-warning-500',
	'k-button--warning__icon': 'text-ikun-warning',
	'k-button--warning__icon__fill': 'text-ikun-warning-100',
	'k-button--warning__border': 'border-ikun-warning',
	'k-button--warning__animate': 'animate-ikun-clicking--warning',

	'k-button--info': 'bg-ikun-info-100 text-ikun-info border-ikun-info-100',
	'k-button--info__ghost': 'text-ikun-tx-base  bg-white border-ikun-bd-base',
	'k-button--info__ghost--dark': 'dark:(border-ikun-bd-base  bg-transparent text-ikun-bd-base)',
	'k-button--info__fill': 'bg-ikun-info text-ikun-info-100 border-ikun-info',
	'k-button--info__active': 'active:border-ikun-info active:k-btn-shadow--info',
	'k-button--info__focus': 'focus-visible:border-ikun-info focus-visible:k-btn-shadow--info',
	'k-button--info__hover': 'hover:border-ikun-info',
	'k-button--info__hover__fill': 'hover:bg-ikun-info-500 hover:border-ikun-info-500',
	'k-button--info__icon': 'text-ikun-info',
	'k-button--info__icon__fill': 'text-ikun-info-100',
	'k-button--info__border': 'border-ikun-info',
	'k-button--info__animate': 'animate-ikun-clicking--info',

	/**
	 * @internal
	 */
	'k-button--main': 'ikun:40:bg-ikun-main text-ikun-main ikun:40:border-ikun-main',

	'k-button--main__ghost': 'text-ikun-main bg-white',
	'k-button--main__ghost--dark': 'dark:(bg-transparent)',

	'k-button--main__active': 'active:border-ikun-main active:k-btn-shadow--main',
	'k-button--main__focus': 'focus-visible:border-ikun-main focus-visible:k-btn-shadow--main',
	'k-button--main__hover': 'hover:border-ikun-main',

	'k-button--main__hover__fill': 'hover:bg-ikun-main hover:bg-ikun-main',
	'k-button--main__icon__fill': 'text-white',
	'k-button--main__fill': 'ikun:90:bg-ikun-main text-white ikun:90:border-ikun-main',

	'k-button--main__icon': 'text-ikun-main',
	'k-button--main__border': 'border-ikun-main',

	'k-button--main__animate': 'animate-ikun-checking-main'
};
