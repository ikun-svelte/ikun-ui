import type { KScrollbarProps } from './types';

export const scrollDefaultProps: KScrollbarProps = {
	css: '',
	trackBackground: 'transparent',
	trackRadius: '20px',
	width: '6px',
	height: '6px',
	thumbBackground: 'var(--ikun-light-800)',
	thumbRadius: '20px',
	cls: undefined,
	attrs: {}
};

export const genCSSVariable = (props: KScrollbarProps) => {
	const cssVariable = {
		['--k-scrollbar--track']: props.trackBackground,
		['--k-scrollbar--track__radius']: props.trackRadius,
		['--k-scrollbar__w']: props.width,
		['--k-scrollbar__h']: props.height,
		['--k-scrollbar--thumb']: props.thumbBackground,
		['--k-scrollbar--thumb__radius']: props.thumbRadius
	};

	let style = props.css;
	Object.keys(cssVariable).forEach((k) => {
		const value = cssVariable[k as keyof typeof cssVariable];
		if (value) {
			style = `${k}: ${value};${style}`;
		}
	});

	return style;
};
