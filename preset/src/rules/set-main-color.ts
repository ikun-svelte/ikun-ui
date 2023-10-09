export function setMainColor(rules: Record<string, any>, themeColorRGB: string) {
	// set main color to input shadow
	rules['k-input-shadow'] = { 'box-shadow': `0 0 0 2px rgb(${themeColorRGB}, 0.5)` };
	// set main color to popover shadow (dark mode)
	rules['k-popover-shadow__left__dark'] = {
		'box-shadow': `4px 0px 12px rgb(${themeColorRGB}, 0.8)`
	};
	rules['k-popover-shadow__top__dark'] = { 'box-shadow': `0 6px 16px rgb(${themeColorRGB}, 0.8)` };
	rules['k-popover-shadow__bottom__dark'] = {
		'box-shadow': `0 -6px 16px rgb(${themeColorRGB}, 0.8)`
	};
	rules['k-popover-shadow__right__dark'] = {
		'box-shadow': `-4px 0px 12px rgb(${themeColorRGB}, 0.8)`
	};

	rules['k-btn-shadow--main'] = {
		'box-shadow': `0 0 0 2px rgba(${themeColorRGB},0.5)`
	};

	// card shadow dark mode
	rules['k-card-shadow__dark'] = { 'box-shadow': `0 0 12px rgb(${themeColorRGB}, 0.5)` };

	return rules;
}
