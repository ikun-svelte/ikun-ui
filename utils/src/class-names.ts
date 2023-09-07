export const getPrefixCls = (cls: string) => `k-${cls}`;

export const hasCls = (el: Element, cls: string): boolean => {
	if (!el || !cls) return false;
	if (cls.includes(' ')) throw new Error('className should not contain space.');
	return el.classList.contains(cls);
};
