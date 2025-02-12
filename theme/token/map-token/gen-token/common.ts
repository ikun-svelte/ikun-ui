import type { CommonMapToken, SeedToken } from '../../../type';
import {  genRadius } from './radius';

export function genCommonMapToken(token: Partial<SeedToken>): CommonMapToken {
  const { motionUnit, motionBase, borderRadius, lineWidth } = token;

  return {
    // motion
    motionDurationFast: `${(motionBase! + motionUnit!).toFixed(1)}s`,
    motionDurationMid: `${(motionBase! + motionUnit! * 2).toFixed(1)}s`,
    motionDurationSlow: `${(motionBase! + motionUnit! * 3).toFixed(1)}s`,

    // line
    lineWidthBold: lineWidth! + 1,

    // radius
    ...genRadius(borderRadius!),
  };
}
