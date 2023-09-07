/// <reference types="svelte" />
export type KCollapseWrapperProps = {
	accordion: boolean;
	cls: string;
	attrs: Record<string, string>;
};
export type collapseMapType = Record<string, () => void>;
