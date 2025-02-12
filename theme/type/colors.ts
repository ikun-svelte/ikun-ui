import type { ColorNeutralMapToken } from './token/map-colors-token-types';

export interface ColorMap {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
}

// 梯度颜色 map
export type GenerateColorMap = (baseColor: string) => ColorMap;
export type GenerateNeutralColorMap = (
  bgBaseColor: string,
  textBaseColor: string,
) => ColorNeutralMapToken;
