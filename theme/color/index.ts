import { mc } from 'magic-color'
import { GenerateColorMap, GenerateNeutralColorMap } from '../type'
import { getAlphaColor, getSolidColor } from '../utils'
export const generateColorPalettes: GenerateColorMap = (baseColor: string) => {
  const colors = mc.theme(baseColor);
  return {
    1: colors['50'],
    2: colors['100'],
    3: colors['200'],
    4: colors['300'],
    5: colors['400'],
    6: colors['500'],
    7: colors['600'],
    8: colors['400'],
    9: colors['500'],
    10: colors['600'],
  };
};

export const generateNeutralColorPalettes: GenerateNeutralColorMap = (
  bgBaseColor: string,
  textBaseColor: string,
) => {
  const colorBgBase = bgBaseColor || '#fff';
  const colorTextBase = textBaseColor || '#000';

  return {
    colorBgBase,
    colorTextBase,

    colorText: getAlphaColor(colorTextBase, 0.88),
    colorTextSecondary: getAlphaColor(colorTextBase, 0.65),
    colorTextTertiary: getAlphaColor(colorTextBase, 0.45),
    colorTextQuaternary: getAlphaColor(colorTextBase, 0.25),

    colorFill: getAlphaColor(colorTextBase, 0.15),
    colorFillSecondary: getAlphaColor(colorTextBase, 0.06),
    colorFillTertiary: getAlphaColor(colorTextBase, 0.04),
    colorFillQuaternary: getAlphaColor(colorTextBase, 0.02),

    colorBgSolid: getAlphaColor(colorTextBase, 1),
    colorBgSolidHover: getAlphaColor(colorTextBase, 0.75),
    colorBgSolidActive: getAlphaColor(colorTextBase, 0.95),

    colorBgLayout: getSolidColor(colorBgBase, 4),
    colorBgContainer: getSolidColor(colorBgBase, 0),
    colorBgElevated: getSolidColor(colorBgBase, 0),
    colorBgSpotlight: getAlphaColor(colorTextBase, 0.85),
    colorBgBlur: 'transparent',

    colorBorder: getSolidColor(colorBgBase, 15),
    colorBorderSecondary: getSolidColor(colorBgBase, 6),
  };
};
