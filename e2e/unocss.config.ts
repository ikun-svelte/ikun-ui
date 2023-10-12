import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetTypography,
	presetWind,
	transformerDirectives,
	transformerVariantGroup
} from 'unocss';
import {
	presetIkun,
	getCSSPreflights,
	getSafeList
	// ikunColors,
	// ikunRules,
	// buttonShortcuts,
	// ikunShortcuts,
	// ikunTheme
} from '@ikun-ui/preset';

// const customColors = JSON.parse(JSON.stringify(ikunColors));
// customColors['custom-primary'] = '#5fbe5f';
//
// const customTheme = JSON.parse(JSON.stringify(ikunTheme));
// customTheme.colors['custom-color'] = 'var(--ikun-custom-primary)';
//
// const customBtnShortcuts = JSON.parse(JSON.stringify(buttonShortcuts));
// customBtnShortcuts['k-button--primary'] = 'bg-custom-color text-white';
// const finalShortcuts = ikunShortcuts;
// finalShortcuts.push(customBtnShortcuts);

// const customRules = JSON.parse(JSON.stringify(ikunRules));
// customRules['k-btn-shadow--primary'] = { 'box-shadow': '0 0 0 2px red' };

// console.log(ikunRules);
export default defineConfig({
	presets: [
		presetWind(),
		presetAttributify(),
		presetIcons({
			scale: 1.2,
			warn: true,
			extraProperties: {
				display: 'inline-block',
				'vertical-align': 'middle'
			}
		}),
		presetTypography(),
		presetIkun()
		// '@ikun-ui/preset',
		// undefined,
		// customTheme,
		// customColors,
		// finalShortcuts,
		// customRules
	],
	transformers: [transformerDirectives(), transformerVariantGroup()],
	safelist: [
		// kun
		...getSafeList()
	],
	preflights: [
		// kun
		{
			layer: 'base',
			getCSS: () => `
    :root {
      ${getCSSPreflights()}
    }
    :root.dark {
      ${getCSSPreflights()}
    }
    button,select,input,option {
      outline: none;
      -webkit-appearance: none
    }
    `
		}
	]
});
