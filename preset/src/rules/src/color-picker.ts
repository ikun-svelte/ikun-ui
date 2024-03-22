export const colorPickerRules = {
	'k-color-picker-shadow': { 'box-shadow': '0 0 0 2px #ff787542' },
	'k-color-picker-shadow--error': { 'box-shadow': '0 0 0 2px rgba(251,113,133,0.5)' },
	'palette-bg': {
		'background-image':
			'linear-gradient(0deg, rgb(0, 0, 0), transparent),\n' +
			'\t\t\tlinear-gradient(90deg, rgb(255, 255, 255), rgba(255, 255, 255, 0))'
	},
	'color-block-bg': {
		'background-size': '50% 50%;'
	},
	'color-alpha-bg': {
		'background-size': '8px 8px'
	},
	'color-track': {
		background:
			'linear-gradient(\n' +
			'\t\t\tto right,\n' +
			'\t\t\trgb(255, 0, 0),\n' +
			'\t\t\trgb(255, 255, 0),\n' +
			'\t\t\trgb(0, 255, 0),\n' +
			'\t\t\trgb(0, 255, 255),\n' +
			'\t\t\trgb(0, 0, 255),\n' +
			'\t\t\trgb(255, 0, 255),\n' +
			'\t\t\trgb(255, 0, 0)\n' +
			'\t\t);'
	}
};
