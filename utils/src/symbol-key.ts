export const KSymbolKey = (key: string) => {
	key = key
		.replace(/[-|_]+/g, '_')
		.replace(/[A-Z]/g, (key) => `_${key}`)
		.replace(/_+([a-z])/g, (_, key) => `_${key}`)
		.replace(/^_+|_+$/g, '');
	return Symbol(`K_${key.toUpperCase()}_KEY`);
};

export const BreadcrumbKey = KSymbolKey('breadcrumb');
