function createSpanCls(colNum: number, index: number, isSize = false) {
	const res = {
		'max-width': `${(1 / colNum) * index * 100}%`,
		flex: `0 0 ${((1 / colNum) * index * 100).toFixed(4)}%`
	};
	if (isSize && index !== 0) {
		res['display'] = 'block';
	}
	return res;
}

function createColOffsetCls(colNum: number, index: number) {
	return {
		'margin-left': `${((1 / colNum) * index * 100).toFixed(4)}%`
	};
}

function createColPullCls(colNum: number, index: number) {
	return {
		right: `${((1 / colNum) * index * 100).toFixed(4)}%`,
		position: 'relative'
	};
}

function createColPushCls(colNum: number, index: number) {
	return {
		left: `${((1 / colNum) * index * 100).toFixed(4)}%`,
		position: 'relative'
	};
}

function createColClsByNum(colNum: number) {
	const cls: Record<string, Record<string, string>> = {};
	for (let i = 1; i < colNum + 1; i++) {
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

export function createColSizeClsByNum(colNum: number = 24) {
	const sizeMap = ['xs', 'sm', 'md', 'lg', 'xl'];
	const cls: Record<string, Record<string, string>> = {};
	sizeMap.forEach((size) => {
		cls[`ikun-${size}:k-col-${size}-0`] = {
			display: 'none'
		};

		cls[`ikun-${size}:k-col-${size}-0.is-guttered`] = {
			display: 'none'
		};

		for (let i = 0; i < colNum + 1; i++) {
			// push
			cls[`ikun-${size}:k-col-${size}-push-${i}`] = createColPushCls(colNum, i);
			// pull
			cls[`ikun-${size}:k-col-${size}-pull-${i}`] = createColPullCls(colNum, i);
			// offset
			cls[`ikun-${size}:k-col-${size}-offset-${i}`] = createColOffsetCls(colNum, i);
			// span
			cls[`ikun-${size}:k-col-${size}-${i}`] = createSpanCls(colNum, i, true);
		}
	});

	return cls;
}

export function createGridColCls(colNum = 24) {
	const baseCls = {
		['k-col-0']: {
			display: 'none'
		}
	};

	return {
		...baseCls,
		...createColClsByNum(colNum)
	};
}

export function createBreakPointCls(size: string, clsName: string, colNum = 24) {
	const breakPoint = {
		xs: '768px',
		sm: '768px',
		md: '992px',
		lg: '1200px',
		xl: '1920px'
	};
	const colSizeCls = createColSizeClsByNum(colNum);
	if (size && clsName) {
		const sizeValue = breakPoint[size];
		let clsValue = '';
		Object.keys(colSizeCls[clsName]).forEach((v) => {
			clsValue = clsValue + `${v}: ${colSizeCls[clsName][v]};\n`;
		});
		clsValue = `${clsName.replace(`ikun-${size}:`, `.ikun-${size}\\:`)}{ ${clsValue} }\n`;
		if (size === 'xs') {
			clsValue = `@media only screen and (max-width: ${sizeValue}) { ${clsValue} }`;
		} else {
			clsValue = `@media only screen and (min-width: ${sizeValue}) { ${clsValue} }`;
		}
		return clsValue;
	}
}
