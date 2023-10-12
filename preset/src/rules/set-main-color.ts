export function setMainColor(rules: Record<string, any>, themeColorRGB: string) {
	// set main color to input shadow
	rules['k-input-shadow'] = { 'box-shadow': `0 0 0 2px rgb(${themeColorRGB}, 0.5)` };
	// set main color to popover shadow (dark mode)
	rules['k-popover-shadow__left__dark'] =
		rules['k-popover-shadow__right__dark'] =
		rules['k-popover-shadow__top__dark'] =
		rules['k-popover-shadow__bottom__dark'] =
			{
				'box-shadow': `0 0 10px rgb(${themeColorRGB}, 0.8)`
			};
	// set main color to popover arrow shadow (dark mode)
	rules['k-popover-arrow-shadow__right__dark'] = {
		'box-shadow': `-4px 4px 8px rgb(${themeColorRGB}, 0.8)`
	};
	rules['k-popover-arrow-shadow__left__dark'] = {
		'box-shadow': `4px -4px 8px rgb(${themeColorRGB}, 0.8)`
	};
	rules['k-popover-arrow-shadow__top__dark'] = {
		'box-shadow': `4px 4px 8px rgb(${themeColorRGB}, 0.8)`
	};
	rules['k-popover-arrow-shadow__bottom__dark'] = {
		'box-shadow': `-4px -4px 8px rgb(${themeColorRGB}, 0.8)`
	};

	rules['k-btn-shadow--main'] = {
		'box-shadow': `0 0 0 2px rgba(${themeColorRGB},0.5)`
	};

	// card shadow dark mode
	rules['k-card-shadow__dark'] = { 'box-shadow': `0 0 12px rgb(${themeColorRGB}, 0.5)` };

	return rules;
}
