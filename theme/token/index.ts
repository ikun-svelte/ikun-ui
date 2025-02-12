import { AliasToken, ThemeConfig } from "../type";
import { genSeedToken, seedToken as defaultSeedToken } from "./seed-token";
export const getDesignToken = (config?: ThemeConfig): AliasToken => {
 const { token: userToken = {} } = config || {};
  // TODO: 1. generate seed token
  const seedToken = genSeedToken(
    userToken,
    defaultSeedToken
  );
  // TODO: 2. generate map token

  // TODO: 3. generate alias token

  // TODO: 4. generate component token
  return {

  }
};
