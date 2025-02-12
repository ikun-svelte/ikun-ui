import { AliasToken, ThemeConfig } from "../type";
import { genSeedToken, seedToken as defaultSeedToken } from "./seed-token";
import { genMapToken } from "./map-token";
export const getDesignToken = (config?: ThemeConfig): AliasToken => {
 const { token: userToken = {} } = config || {};
  // TODO: 1. generate seed token
  let resolveToken = genSeedToken(
    userToken,
    defaultSeedToken
  );
  // TODO: 2. generate map token
  resolveToken = genMapToken(resolveToken)
  // TODO: 3. generate alias token

  // TODO: 4. generate component token

  return resolveToken
};
