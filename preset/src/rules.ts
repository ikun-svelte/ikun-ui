import type { Rule } from 'unocss';
import type { Theme } from '@unocss/preset-uno';

const SwitchSizeMap = {
	sm: ['2rem', '1.125rem', '0.85rem'],
	md: ['2.5rem', '1.375rem', '1.1rem'],
	lg: ['3rem', '1.625rem', '1.375rem']
};

// 自定義的原子樣式規則
export default [
	[
		/^k-switch-(.+)$/,
		([, s]: string[]) => {
			if (['sm', 'md', 'lg'].includes(s)) {
				return {
					'--k-switch-offset': SwitchSizeMap[s][2],
					width: SwitchSizeMap[s][0],
					height: SwitchSizeMap[s][1]
				};
			}
		}
	]
] as Rule<Theme>[];
