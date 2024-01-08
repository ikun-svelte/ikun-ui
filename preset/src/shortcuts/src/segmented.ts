export const segmentedShortcuts: Record<string, string> = {
	'k-segmented':
		'cursor-pointer p-2px box-border m-0 inline-block rounded text-14px text-ikun-tx-base bg-ikun-bg-grs3', // hover:bg-ikun-bg-grs2
	'k-segmented-group': 'pr fssc w-full',
	'k-segmented-block': 'flex',

	'k-segmented-item': 'fcc text-center pr rounded hover:bg-ikun-bg-grs2 active:bg-ikun-bg-grs1',
	'k-segmented-item--disabled': 'fcc text-center pr rounded k-cur-disabled opacity-50',
	'k-segmented-item--active':
		'rounded bg-white shadow hover:bg-white active:bg-white h-full w-full pa',
	'k-segmented-item--label': 'px-11px pr z-1 truncate w-full',
	'k-segmented-item--icon': '!inline-flex',
	'k-segmented-item--block': 'flex-1 min-w-0',

	'k-segmented-item--sm': 'h-24px',
	'k-segmented-item--md': 'h-32px',
	'k-segmented-item--lg': 'h-40px'
};
