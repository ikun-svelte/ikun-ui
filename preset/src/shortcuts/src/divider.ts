export const dividerShortcuts = {
	'k-divider': 'text-0 before:(content-empty text-0) after:(content-empty text-0)',

	// direction
	'k-divider--horizontal':
		'fi my4 before:(block w-50% h-0 b-1px b-color-inherit scale-y-50%) after:(block w-50% h-0 b-1px b-color-inherit scale-y-50%)',
	'k-divider--vertical': 'infi w-0 h-1rem mx1 v-mid b-1px scale-x-50%',

	// horizontal border style
	'k-divider--horizontal-dotted':
		'before:k-divider--vertical-dotted after:k-divider--vertical-dotted',
	'k-divider--horizontal-dashed':
		'before:k-divider--vertical-dashed after:k-divider--vertical-dashed',
	'k-divider--horizontal-solid': 'before:k-divider--vertical-solid after:k-divider--vertical-solid',
	'k-divider--horizontal-double':
		'before:k-divider--vertical-double after:k-divider--vertical-double',
	'k-divider--horizontal-groove':
		'before:k-divider--vertical-groove after:k-divider--vertical-groove',
	'k-divider--horizontal-ridge': 'before:k-divider--vertical-ridge after:k-divider--vertical-ridge',
	'k-divider--horizontal-inset': 'before:k-divider--vertical-inset after:k-divider--vertical-inset',
	'k-divider--horizontal-outset':
		'before:k-divider--vertical-outset after:k-divider--vertical-outset',

	// vertical border style
	'k-divider--vertical-dotted': 'b-dotted',
	'k-divider--vertical-dashed': 'b-dashed',
	'k-divider--vertical-solid': 'b-solid',
	'k-divider--vertical-double': 'b-double',
	'k-divider--vertical-groove': 'b-groove',
	'k-divider--vertical-ridge': 'b-ridge',
	'k-divider--vertical-inset': 'b-inset',
	'k-divider--vertical-outset': 'b-outset',

	// content
	'k-divider--content': 'px4 text-14px font-500 text-nowrap',
	'k-divider--content-left': 'before:w-20px after:w-100%',
	'k-divider--content-center': 'before:w-50% after:w-50%',
	'k-divider--content-right': 'before:w-100% after:w-20px'
};
