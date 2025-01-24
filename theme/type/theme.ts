import { SeedToken } from './token/seed-token-types'
import { MapToken } from './token/map-token-types'
import { AliasToken } from './token/alias-token-types'

export type TokenType = object
export type DerivativeFunc<DesignToken extends TokenType, DerivativeToken extends TokenType> = (designToken: DesignToken, derivativeToken?: DerivativeToken) => DerivativeToken;

export type MappingAlgorithm = DerivativeFunc<SeedToken, MapToken>;

export interface ThemeConfig {
  /**
   * @descCN 用于修改 Design Token。
   * @descEN Modify Design Token.
   */
  token?: Partial<AliasToken>;
  /**
   * @descCN 用于修改各个组件的 Component Token 以及覆盖该组件消费的 Alias Token。
   * @descEN Modify Component Token and Alias Token applied to components.
   * TODO: ComponentsConfig
   */
  components?: any;
  /**
   * @descCN 用于修改 Seed Token 到 Map Token 的算法。
   * @descEN Modify the algorithms of theme.
   * @default defaultAlgorithm
   */
  algorithm?: MappingAlgorithm | MappingAlgorithm[];
}
