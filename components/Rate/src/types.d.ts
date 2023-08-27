/// <reference types="svelte" />
export type KRateProps = {
	max: number;
	value: number;
	allowHalf: boolean;
	showScore: boolean;
	scoreTemplate: string;
	showText: boolean;
	texts: string | Record<number, string>;
	textColor: string;
	icons: string | Record<number, string>;
	colors: string | Record<number, string>;
	voidIcon: string;
	voidColor: string;
	disabled: boolean;
	disableVoidIcon: string;
	disableVoidColor: string;
	clearable: boolean;
	cls: string;
	attrs: Record<string, string>;
};
