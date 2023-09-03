/// <reference types="svelte" />
export type KBreadcrumbItemProps = {
	href: string;
	cls: string;
	attrs: Record<string, string>;
};
export type KBreadcrumbItemPropsPropsInner = Partial<{
	separator: string;
	separatorIcon: string;
}>;
