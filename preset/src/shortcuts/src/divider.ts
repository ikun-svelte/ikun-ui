export const dividerShortcuts = {
	'k-divider': 'text-0 before:(content-empty text-0) after:(content-empty text-0)',

	// direction
	'k-divider--horizontal':
		'fi my4 before:(block w-50% h-0 b-1px b-color-inherit scale-y-50%) after:(block w-50% h-0 b-1px b-color-inherit scale-y-50%)',
	'k-divider--vertical': 'infi w-0 h-1rem mx1 v-mid b-1px scale-x-50%',

	// horizontal border style
	'k-divider--horizontal__dotted':
		'before:k-divider--vertical__dotted after:k-divider--vertical__dotted',
	'k-divider--horizontal__dashed':
		'before:k-divider--vertical__dashed after:k-divider--vertical__dashed',
	'k-divider--horizontal__solid':
		'before:k-divider--vertical__solid after:k-divider--vertical__solid',
	'k-divider--horizontal__double':
		'before:k-divider--vertical__double after:k-divider--vertical__double',
	'k-divider--horizontal__groove':
		'before:k-divider--vertical__groove after:k-divider--vertical__groove',
	'k-divider--horizontal__ridge':
		'before:k-divider--vertical__ridge after:k-divider--vertical__ridge',
	'k-divider--horizontal__inset':
		'before:k-divider--vertical__inset after:k-divider--vertical__inset',
	'k-divider--horizontal__outset':
		'before:k-divider--vertical__outset after:k-divider--vertical__outset',

	// vertical border style
	'k-divider--vertical__dotted': 'b-dotted',
	'k-divider--vertical__dashed': 'b-dashed',
	'k-divider--vertical__solid': 'b-solid',
	'k-divider--vertical__double': 'b-double',
	'k-divider--vertical__groove': 'b-groove',
	'k-divider--vertical__ridge': 'b-ridge',
	'k-divider--vertical__inset': 'b-inset',
	'k-divider--vertical__outset': 'b-outset',

	// content
	'k-divider--content': 'px4 text-14px font-500 text-nowrap',
	'k-divider--content-left': 'before:w-20px after:w-100%',
	'k-divider--content-center': 'before:w-50% after:w-50%',
	'k-divider--content-right': 'before:w-100% after:w-20px'
};
