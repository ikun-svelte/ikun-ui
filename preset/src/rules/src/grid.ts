import { BREAK_POINT } from '../../utils/constant';

/******************************* Static style rules for KCol components *******************************************/
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

/**
 * Get the static rules of the KCol component
 * @param colNum
 */
export function getColCls(colNum = 24) {
	return {
		['k-col-0']: {
			display: 'none'
		},
		...createColClsByNum(colNum)
	};
}

/******************************* Media query breakpoint style rules for KCol components *******************************************/
/**
 * Generate reactive breakpoint code for the KCol component
 * @param colNum
 */
export function createColSizeClsByNum(colNum: number = 24) {
	const cls: Record<string, Record<string, string>> = {};
	Object.keys(BREAK_POINT).forEach((size) => {
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

/**
 * Generate media query code that meets breakpoints for the KCol component
 * @param size
 * @param clsName
 * @param colNum
 */
export function createBreakPointCls(size: string, clsName: string, colNum = 24) {
	const colSizeCls = createColSizeClsByNum(colNum);
	if (size && clsName) {
		const sizeValue = BREAK_POINT[size];
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

/**
 * get reactive breakpoint rules for the KCol component
 */
export function getColBreakPointRules() {
	return () => [
		/^(ikun-xs:|ikun-sm:|ikun-md:|ikun-lg:|ikun-xl:)/,
		(inputData) => {
			const sizeMatch = inputData[0].match(/ikun-(.*?):/);
			const clsName = inputData.input;
			if (sizeMatch && clsName) {
				return createBreakPointCls(sizeMatch[1], clsName);
			} else {
				return;
			}
		}
	];
}
