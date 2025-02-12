import type { SeedToken } from "../../type";
import { genFontMapToken } from './gen-token/font'
import { genSizeMapToken } from './gen-token/size'
import { genControlHeight } from "./gen-token/height";
import { genCommonMapToken } from "./gen-token/common";
import { genColorMapToken } from "./gen-token/colors";
import {
  generateColorPalettes,
  generateNeutralColorPalettes,
} from '../../color'
export function genMapToken(token: Partial<SeedToken>){
  // 1. generate colors map token
  const colorsToken = genColorMapToken(
    token,
    {
      generateColorPalettes,
      generateNeutralColorPalettes,
    }
  )
  // 2. generate font map token
  const fontToken = genFontMapToken(token.fontSize!)
  // 3. generate size map token
  const sizeToken = genSizeMapToken(token)
  // 4. generate height map token
  const heightToken = genControlHeight(token)
  // 5. generate common map token
  const commonToken = genCommonMapToken(token)
  return {
    ...token,
    ...colorsToken,
    ...fontToken,
    ...sizeToken,
    ...heightToken,
    ...commonToken,
  }
}
