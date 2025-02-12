import { FastColor } from '../color/fast-color'
export const getAlphaColor = (
  baseColor: string, alpha: number) => {
  return new FastColor(baseColor).setA(alpha).toRgbString();
}

export const getSolidColor = (baseColor: string, brightness: number) => {
  const instance = new FastColor(baseColor);
  return instance.darken(brightness).toHexString();
};
