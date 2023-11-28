export function getDescriptionsItemGridColStartCls(colNum: number = 24) {
	const cls: Record<string, Record<string, string>> = {};
	for (let i = 1; i < colNum + 1; i++) {
		cls[`k-descriptions-item--col-${i}`] = {
			'grid-column-start': `${i}`,
			'grid-column-end': '-1'
		};
		cls[`ikun-last:k-descriptions-item--col-${i}`] = {
			'--at-apply': `last:k-descriptions-item--col-${i}`
		};
	}
	return cls;
}
