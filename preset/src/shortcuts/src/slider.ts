export const sliderShortcuts: Record<string, string> = {
	// slider
	'k-slider--base': 'w-full fi',
	'k-slider--base__vertical': 'h-full fc',

	// disabled
	'k-slider--disabled': 'k-bg-disabled',

	// size
	'k-slider--sm': 'h-24px',
	'k-slider--md': 'h-32px',
	'k-slider--lg': 'h-40px',
	'k-slider--sm__vertical': 'w-24px',
	'k-slider--md__vertical': 'w-32px',
	'k-slider--lg__vertical': 'w-40px',

	// runway
	'k-slider--runway': 'flex-1 rd-0.75 bg-ikun-light-900 cursor-pointer pr',
	'k-slider--runway__vertical': 'rd-0.75 bg-ikun-light-900 cursor-pointer pr fe flex-col',

	// runway size [2px border]
	'k-slider--runway--sm': 'mx-8px h-3px',
	'k-slider--runway--md': 'mx-10px h-4px',
	'k-slider--runway--lg': 'mx-12px h-5px',
	'k-slider--runway--sm__vertical': 'my-8px w-3px',
	'k-slider--runway--md__vertical': 'my-10px w-4px',
	'k-slider--runway--lg__vertical': 'my-12px w-5px',

	'k-slider--bar': 'h-full border-rd-0.75 bg-ikun-main',
	'k-slider--bar__vertical': 'w-full border-rd-0.75 bg-ikun-main',

	// runway disabled
	'k-slider--runway__disabled': 'k-cur-disabled',

	// button
	'k-slider--button-wrapper':
		'fcc pa top-0 bottom-0 my-a translate-x--50% cursor-pointer select-none',
	'k-slider--button-wrapper__vertical':
		'fcc pa left-50% mx-a -translate-x-1/2 translate-y-1/2 cursor-pointer select-none',

	// button wrapper size
	'k-slider--button--sm': 'w-12px h-12px',
	'k-slider--button--md': 'w-16px h-16px',
	'k-slider--button--lg': 'w-20px h-20px',

	'k-slider--button': 'fcc b-2px b-solid b-ikun-main rd-50% bg-ikun-white line-height-none',

	// discrete stop
	'k-slider--stop': 'inline-block bg-ikun-main absolute top-50% translate-y--50% rd-50%',
	'k-slider--stop__vertical': 'rd-50% bg-ikun-main absolute left-50% translate-x--50%',
	'k-slider--stop--sm': 'w-3px h-3px',
	'k-slider--stop--md': 'w-4px h-4px',
	'k-slider--stop--lg': 'w-5px h-5px'
};
