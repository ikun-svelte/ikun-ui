function createSpanCls(colNum: number, index: number) {
	return {
		'max-width': `${(1 / colNum) * index * 100}%`,
		flex: `0 0 ${(1 / colNum) * index * 100}%`
	};
}

function createColOffsetCls(colNum: number, index: number) {
	return {
		'margin-left': `${(1 / colNum) * index * 100}%`
	};
}

function createColPullCls(colNum: number, index: number) {
	return {
		right: `${(1 / colNum) * index * 100}%`,
		position: 'relative'
	};
}

function createColPushCls(colNum: number, index: number) {
	return {
		left: `${(1 / colNum) * index * 100}%`,
		position: 'relative'
	};
}

function createColCls(colNum: number) {
	const cls: Record<string, Record<string, string>> = {};
	for (let i = 0; i < colNum; i++) {
		// push
		cls[`k-col-push-${i}`] = createColPushCls(colNum, i);
		// pull
		cls[`k-col-pull-${i}`] = createColPullCls(colNum, i);
		// offset
		cls[`k-col-offset-${i}`] = createColOffsetCls(colNum, i);
		// span
		cls[`k-col-${i}`] = createSpanCls(colNum, i);
	}
	return cls;
}

export function createGridColCls(colNum = 24) {
	const baseCls = {
		['[class*=k-col-]']: {
			'box-sizing': 'border-box'
		},
		['[class*=k-col-].is-guttered']: {
			display: 'block',
			'min-height': '1px'
		},
		['k-col-0']: {
			display: 'none'
		},
		['k-col-0.is-guttered']: {
			display: 'none'
		}
	};
	return {
		...baseCls,
		...createColCls(colNum)
	};
}
