import { SeedToken } from './seed-token-types'
import { ColorMapToken} from './map-colors-token-types'
import { StyleMapToken } from './map-style-token-types'
import { SizeMapToken, HeightMapToken } from './map-size-token-types'
import { FontMapToken } from './map-font-token-types'
export interface CommonMapToken extends StyleMapToken {
  // Motion
  /**
   * @desc 动效播放速度，快速。用于小型元素动画交互
   * @descEN Motion speed, fast speed. Used for small element animation interaction.
   */
  motionDurationFast: string;
  /**
   * @desc 动效播放速度，中速。用于中型元素动画交互
   * @descEN Motion speed, medium speed. Used for medium element animation interaction.
   */
  motionDurationMid: string;
  /**
   * @desc 动效播放速度，慢速。用于大型元素如面板动画交互
   * @descEN Motion speed, slow speed. Used for large element animation interaction.
   */
  motionDurationSlow: string;
}

export interface MapToken
  extends SeedToken,
    ColorMapToken,
    SizeMapToken,
    HeightMapToken,
    StyleMapToken,
    FontMapToken,
    CommonMapToken {}
