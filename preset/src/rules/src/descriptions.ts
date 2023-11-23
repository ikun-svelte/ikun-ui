export function getDescriptionsGridColCls(colNum: number = 24) {
	const cls: Record<string, Record<string, string>> = {};
	for (let i = 1; i < colNum + 1; i++) {
		cls[`k-descriptions--cols-${i}`] = {
			'grid-template-columns': `repeat(${i}, minmax(0, 1fr))`
		};
	}
	return cls;
}
