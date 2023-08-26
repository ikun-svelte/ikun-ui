export const alertShortcuts: Record<string, string> = (() => {
	const prefix = 'k-alert';

	// base
	const radius = '4px';
	const basePx = '16px';
	const basePy = '8px';

	// icon
	const iconMr = '8px';

	// type
	const typeCls = {};
	const types = {
		success: 'i-carbon-checkmark-filled',
		error: 'i-carbon-error-filled',
		warning: 'i-carbon-warning-filled',
		info: 'i-carbon-information-filled'
	};
	Object.keys(types).forEach((type) => {
		// type
		typeCls[`${prefix}--${type}`] = `bg-ikun-${type}-100 text-ikun-${type}`;
		// animate
		typeCls[`${prefix}--${type}__animate`] = `animate-ikun-clicking--${type}`;
		// icon
		typeCls[`${prefix}--${type}__icon`] = types[type];
		typeCls[`${prefix}--${type}__icon-color`] = `text-ikun-${type}`;
		// close icon
		typeCls[
			`${prefix}--${type}__close-icon`
		] = `hover:(bg-ikun-${type} [&>div.k-icon--base]:text-ikun-white b-rd-50%) active:(b-ikun-${type} k-btn-shadow--${type})`;
	});

	// title
	const titleFontSize = '14px';

	// description
	const descriptionFontSize = '12px';
	const descriptionMt = '8px';

	// close
	const closeTop = '10px';
	const closeTopNoTitle = '8px';
	const closeFontSize = '12px';

	return {
		// alert
		[prefix]: `w-full box-border fi relative m-0 px-${basePx} py-${basePy} b-rd-${radius} overflow-hidden`,
		[`${prefix}--icon`]: `mr-${iconMr}`,
		// alert types
		...typeCls,
		// content
		[`${prefix}--content`]: `table-cell`,
		// title
		[`${prefix}--title`]: `text-${titleFontSize} font-600`,
		// description
		[`${prefix}--description`]: `text-${descriptionFontSize} text-justify m-0 mt-${descriptionMt}`,
		[`${prefix}--description__no-title`]: 'mt-0',
		// close
		[`${prefix}--close`]: `text-${closeFontSize} inline-flex cursor-pointer absolute top-${closeTop} right-${basePx}`,
		[`${prefix}--close__icon-color`]: '[&,&>div.k-icon--base]:color-ikun-stone-400',
		[`${prefix}--close__no-title`]: `top-${closeTopNoTitle}`
	};
})();
