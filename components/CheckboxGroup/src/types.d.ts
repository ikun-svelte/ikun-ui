/// <reference types="svelte" />
import { ClassValue } from "clsx";
export type KCheckboxGroupProps = {
	value: string[] | number[]
	disabled: boolean
	cls: ClassValue;
	attrs: Record<string, string>;
};

export type checkboxMapType<T> = Map<string, T>;
