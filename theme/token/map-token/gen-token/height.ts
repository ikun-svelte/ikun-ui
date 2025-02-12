import { SeedToken, HeightMapToken } from "../../../type";

export function genControlHeight(token: Partial<SeedToken>): HeightMapToken {
  const { controlHeight } = token;

  return {
    controlHeightSM: controlHeight! * 0.75,
    controlHeightXS: controlHeight! * 0.5,
    controlHeightLG: controlHeight! * 1.25,
  };
};
