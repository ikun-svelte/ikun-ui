import { parseCssColor } from '@unocss/preset-mini/utils';
import { RuleContext } from 'unocss';
import { Theme } from '@unocss/preset-uno';

function parseColor<T>(content: string, op: string, color: T) {
	if (!content) return;
	const matchRes = content.match(/^var\(--ikun-(.+)\)$/);
	if (!matchRes) {
		const cssColor = parseCssColor(content);
		if (cssColor) return `rgba(${cssColor.components.join(',')},${Number(op) / 100})`;
	} else {
		const cssColor = parseCssColor(color[matchRes[1]]);
		if (cssColor) return `rgba(${cssColor.components.join(',')},${Number(op) / 100})`;
	}
}

export const getIkunColorRules = <T>(colors: T) => {
	return () => [
		/^ikun:/,
		(inputData, { theme }: RuleContext<Theme>) => {
			const { input } = inputData;
			if (!input) return;
			const [, op, inputCls] = input.split(':');
			const variable = inputCls.match(/^(?:text|bg)-(.+)/)[1];
			if (!variable) return;
			const color = parseColor<typeof colors>(
				(theme.colors as Record<string, string>)[variable],
				op,
				colors
			);

			let attr = inputCls.startsWith('bg-') ? 'background-color' : '';
			attr = inputCls.startsWith('text-') ? 'color' : attr;

			if (!attr) return;
			return {
				'--ikun-context': color,
				[attr]: 'var(--ikun-context)'
			};
		}
	];
};
