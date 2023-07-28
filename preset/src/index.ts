import type { Preset } from 'unocss';
import shortcuts from './shortcuts/index';
import theme from './theme';
import rules from './rules';
import variants from './variants';

export function presetIkun(): Preset {
	return {
		name: '@ikun-ui/preset',
		theme, // 主題（主題顔色 + 靜態主題規則）
		rules, // 自定義的一些規則，主要用於實現 unocss 不支持的規則央視
		variants, // 變體
		shortcuts // 從組件維度進行簡寫,避免組件使用的class太長，其内容基於主題（主題顔色 + 靜態主題規則）
	};
}
// 所以整個預設架構是 rules + variants + shortcuts
export * from './colors';
export { getSafeList } from './shortcuts/index';
