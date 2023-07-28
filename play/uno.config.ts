import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetTypography,
	presetWind,
	transformerDirectives,
	transformerVariantGroup
} from 'unocss';
import { presetIkun, getCSSPreflights, getSafeList } from '@ikun-ui/preset';
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
	],
	transformers: [transformerDirectives(), transformerVariantGroup()],
	safelist: [
		'i-carbon-information',
		'i-carbon-tree-view-alt',
		'i-carbon-assembly-cluster',
		'i-carbon-image-copy',
		'i-carbon-select-window',
		'i-carbon-document-preliminary',
		'i-carbon-network-4',
		'i-carbon-ibm-watson-discovery',
		'i-carbon-document',
		'i-carbon-z-lpar',
		'i-carbon-cube',
		'i-carbon-center-circle',
		'i-carbon-ibm-process-mining',
		'i-carbon-logo-npm',
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
	/*theme: {
    animation: {
      keyframes: {
        LianYi: `{
          0% { box-shadow: 0 0 0 2px rgb(255 30 30 / 40%) }
          10% { box-shadow: 0 0 0 4px rgb(255 30 30 / 30%) }
          20% { box-shadow: 0 0 0 6px rgb(255 30 30 / 20%) }
          30% { box-shadow: 0 0 0 8px rgb(255 30 30 / 10%) }
          50% { box-shadow: 0 0 0 10px rgb(255 30 30 / 0%) }
          }`,
      },
      durations: {
        LianYi: '2s',
      },
      timingFns: {
        LianYi: 'linear',
      },
      counts: {
        LianYi: 'infinite',
      },
      // wiggle: 'wiggle 1s ease-in-out infinite',
    },
    fontFamily: {
      sans: ['Open Sans', 'ui-sans-serif', 'system-ui'],
      serif: ['Montserrat', 'ui-serif', 'Georgia'],
      mono: ['Fira Sans', 'ui-monospace', 'SFMono-Regular'],
    },
    colors: {
      success: '#67C23A',
      muted: '#888888',
      warning: '#f8ac59',
      danger: '#ed5565',
      info: '#1c84c6',
      main: '#ff3e00',
      tx: '#333333',
    },
  },
  rules: [
    ['w-sidebar-base', { width: '200px !important' }],
    ['w-30p', { width: '30%' }],
    ['border-c', { 'border-color': 'rgba(156,163,175,0.2)' }],
    ['x-divider', { 'height': '1px', 'width': '100%', 'background-color': 'rgba(156,163,175,0.15)' }],
    ['ui-input-shadow', { 'box-shadow': '0 0 0 2px #ff787542' }],
    ['ui-disabled', { 'background-color': 'rgba(248,249,250,1)', cursor: 'not-allowed !important' }],
    ['ui-button-shadow--success', { 'box-shadow': '0 0 0 2px rgba(74,222,128,0.5)' }],
    ['ui-button-shadow--error', { 'box-shadow': '0 0 0 2px rgba(251,113,133,0.5)' }],
    ['ui-button-shadow--warning', { 'box-shadow': '0 0 0 2px rgba(251,191,36,0.5)' }],
    ['ui-button-shadow--info', { 'box-shadow': '0 0 0 2px rgba(148,163,184,0.5)' }],
    ['ui-button-shadow--primary', { 'box-shadow': '0 0 0 2px rgba(45,212,191,0.5)' }],
    ['ui-disabled-cursor', { cursor: 'not-allowed' }],
    ['ui-switch-trans', { transition: 'right .1s linear' }],
    ['cols-2', { 'grid-template-columns': 'repeat(2,minmax(0,1fr))' }]
  ],
  shortcuts: [
    { 'flex-c': 'flex items-center justify-center' },
    { 'border-success-c': 'border-green-400' },
    { 'border-error-c': 'border-rose-400' },
    { 'border-warning-c': 'border-amber-400' },
    { 'border-info-c': 'border-slate-400' },
    { 'border-primary-c': 'border-teal-400' },
  ],*/
});
