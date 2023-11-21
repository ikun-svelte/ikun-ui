/// <reference types="svelte" />
import { ClassValue } from 'clsx';
import { IKunSize } from "@ikun-ui/utils";

export type KSliderProps = {
  size: IKunSize;
  min: number
  max: number
  step: number
  value: number
  disabled: boolean;
  cls: ClassValue;
  attrs: Record<string, string>;
};
