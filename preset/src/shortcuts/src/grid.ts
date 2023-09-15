export const gridShortcuts: Record<string, string> = {
	// row
	'k-row--base': 'flex flex-wrap pr box-border',
	'k-row__justify__start': 'justify-start',
	'k-row__justify__center': 'justify-center',
	'k-row__justify__end': 'justify-end',
	'k-row__justify__around': 'justify-around',
	'k-row__justify__between': 'justify-between',
	'k-row__justify__evenly': 'justify-evenly',

	'k-row__align__top': 'items-start',
	'k-row__align__middle': 'items-center',
	'k-row__align__bottom': 'items-end',
	// The specific implementation is in the rules
	'k-col--base': 'box-border',
	'k-col__guttered': 'block min-h-1px',
	'k-col__guttered__none': 'hidden'
};
