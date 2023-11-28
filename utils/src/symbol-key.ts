export const KSymbolKey = (key: string) => {
	key = key
		.replace(/[-|_]+/g, '_')
		.replace(/[A-Z]/g, (key) => `_${key}`)
		.replace(/_+([a-z])/g, (_, key) => `_${key}`)
		.replace(/^_+|_+$/g, '');
	return Symbol(`K_${key.toUpperCase()}_KEY`);
};

export const breadcrumbKey = KSymbolKey('breadcrumb');
export const buttonGroupKey = KSymbolKey('buttonGroup');
export const collapseWrapperKey = KSymbolKey('collapseWrapper');
export const checkboxGroupKey = KSymbolKey('checkboxGroup');
export const radioGroupKey = KSymbolKey('radioGroup');
export const rowKey = KSymbolKey('row');
export const contextmenuKey = KSymbolKey('contextmenu');
export const formKey = KSymbolKey('form');
export const formItemKey = KSymbolKey('formItem');
export const descriptionsKey = KSymbolKey('descriptions');
