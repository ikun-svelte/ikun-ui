export interface RGB {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
  a: number;
}

export interface HSV {
  h: number;
  s: number;
  v: number;
  a: number;
}

export type OptionalA<T extends { a: number }> = Omit<T, 'a'> & { a?: number };

export type ColorInput =
  | string
  | OptionalA<RGB>
  | OptionalA<HSL>
  | OptionalA<HSV>;
type Constructor<T> = new (...args: any[]) => T;

type ParseNumber = (num: number, txt: string, index: number) => number;

const round = Math.round;

/**
 * Support format, alpha unit will check the % mark:
 * - rgba(102, 204, 255, .5)      -> [102, 204, 255, 0.5]
 * - rgb(102 204 255 / .5)        -> [102, 204, 255, 0.5]
 * - rgb(100%, 50%, 0% / 50%)     -> [255, 128, 0, 0.5]
 * - hsl(270, 60, 40, .5)         -> [270, 60, 40, 0.5]
 * - hsl(270deg 60% 40% / 50%)   -> [270, 60, 40, 0.5]
 *
 * When `base` is provided, the percentage value will be divided by `base`.
 */
function splitColorStr(str: string, parseNum: ParseNumber): number[] {
  const match: string[] =
    str
      // Remove str before `(`
      .replace(/^[^(]*\((.*)/, '$1')
      // Remove str after `)`
      .replace(/\).*/, '')
      .match(/\d*\.?\d+%?/g) || [];
  const numList = match.map((item) => parseFloat(item));

  for (let i = 0; i < 3; i += 1) {
    numList[i] = parseNum(numList[i] || 0, match[i] || '', i);
  }

  // For alpha. 50% should be 0.5
  if (match[3]) {
    numList[3] = match[3].includes('%') ? numList[3] / 100 : numList[3];
  } else {
    // By default, alpha is 1
    numList[3] = 1;
  }

  return numList;
}

const parseHSVorHSL: ParseNumber = (num, _, index) =>
  index === 0 ? num : num / 100;

/** round and limit number to integer between 0-255 */
function limitRange(value: number, max?: number) {
  const mergedMax = max || 255;

  if (value > mergedMax) {
    return mergedMax;
  }
  if (value < 0) {
    return 0;
  }
  return value;
}

export class FastColor {
  /**
   * All FastColor objects are valid. So isValid is always true. This property is kept to be compatible with TinyColor.
   */
  isValid: boolean = true;

  /**
   * Red, R in RGB
   */
  r: number = 0;

  /**
   * Green, G in RGB
   */
  g: number = 0;

  /**
   * Blue, B in RGB
   */
  b: number = 0;

  /**
   * Alpha/Opacity, A in RGBA/HSLA
   */
  a: number = 1;

  // HSV privates
  private _h?: number;
  private _s?: number;
  private _l?: number;
  private _v?: number;

  // intermediate variables to calculate HSL/HSV
  private _max?: number;
  private _min?: number;

  private _brightness?: number;

  constructor(input: ColorInput) {
    /**
     * Always check 3 char in the object to determine the format.
     * We not use function in check to save bundle size.
     * e.g. 'rgb' -> { r: 0, g: 0, b: 0 }.
     */
    function matchFormat(str: string) {
      return (
        str[0] in (input as object) &&
        str[1] in (input as object) &&
        str[2] in (input as object)
      );
    }

    if (!input) {
      // Do nothing since already initialized
    } else if (typeof input === 'string') {
      const trimStr = input.trim();

      function matchPrefix(prefix: string) {
        return trimStr.startsWith(prefix);
      }

      if (/^#?[A-F\d]{3,8}$/i.test(trimStr)) {
        this.fromHexString(trimStr);
      } else if (matchPrefix('rgb')) {
        this.fromRgbString(trimStr);
      } else if (matchPrefix('hsl')) {
        this.fromHslString(trimStr);
      } else if (matchPrefix('hsv') || matchPrefix('hsb')) {
        this.fromHsvString(trimStr);
      }
    } else if (input instanceof FastColor) {
      this.r = input.r;
      this.g = input.g;
      this.b = input.b;
      this.a = input.a;
      this._h = input._h;
      this._s = input._s;
      this._l = input._l;
      this._v = input._v;
    } else if (matchFormat('rgb')) {
      this.r = limitRange((input as RGB).r);
      this.g = limitRange((input as RGB).g);
      this.b = limitRange((input as RGB).b);
      this.a =
        typeof input.a === 'number' ? limitRange((input as RGB).a, 1) : 1;
    } else if (matchFormat('hsl')) {
      this.fromHsl(input as HSL);
    } else if (matchFormat('hsv')) {
      this.fromHsv(input as HSV);
    } else {
      throw new Error(
        '@ant-design/fast-color: unsupported input ' + JSON.stringify(input),
      );
    }
  }

  // ======================= Setter =======================

  setR(value: number) {
    return this._sc('r', value);
  }

  setG(value: number) {
    return this._sc('g', value);
  }

  setB(value: number) {
    return this._sc('b', value);
  }

  setA(value: number) {
    return this._sc('a', value, 1);
  }

  setHue(value: number) {
    const hsv = this.toHsv();
    hsv.h = value;
    return this._c(hsv);
  }

  // ======================= Getter =======================
  /**
   * Returns the perceived luminance of a color, from 0-1.
   * @see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
   */
  getLuminance(): number {
    function adjustGamma(raw: number) {
      const val = raw / 255;

      return val <= 0.03928
        ? val / 12.92
        : Math.pow((val + 0.055) / 1.055, 2.4);
    }

    const R = adjustGamma(this.r);
    const G = adjustGamma(this.g);
    const B = adjustGamma(this.b);

    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  }

  getHue(): number {
    if (typeof this._h === 'undefined') {
      const delta = this.getMax() - this.getMin();
      if (delta === 0) {
        this._h = 0;
      } else {
        this._h = round(
          60 *
          (this.r === this.getMax()
            ? (this.g - this.b) / delta + (this.g < this.b ? 6 : 0)
            : this.g === this.getMax()
              ? (this.b - this.r) / delta + 2
              : (this.r - this.g) / delta + 4),
        );
      }
    }
    return this._h;
  }

  getSaturation(): number {
    if (typeof this._s === 'undefined') {
      const delta = this.getMax() - this.getMin();
      if (delta === 0) {
        this._s = 0;
      } else {
        this._s = delta / this.getMax();
      }
    }
    return this._s;
  }

  getLightness(): number {
    if (typeof this._l === 'undefined') {
      this._l = (this.getMax() + this.getMin()) / 510;
    }
    return this._l;
  }

  getValue(): number {
    if (typeof this._v === 'undefined') {
      this._v = this.getMax() / 255;
    }
    return this._v;
  }

  /**
   * Returns the perceived brightness of the color, from 0-255.
   * Note: this is not the b of HSB
   * @see http://www.w3.org/TR/AERT#color-contrast
   */
  getBrightness(): number {
    if (typeof this._brightness === 'undefined') {
      this._brightness = (this.r * 299 + this.g * 587 + this.b * 114) / 1000;
    }
    return this._brightness;
  }

  // ======================== Func ========================

  darken(amount = 10) {
    const h = this.getHue();
    const s = this.getSaturation();
    let l = this.getLightness() - amount / 100;
    if (l < 0) {
      l = 0;
    }
    return this._c({ h, s, l, a: this.a });
  }

  lighten(amount = 10) {
    const h = this.getHue();
    const s = this.getSaturation();
    let l = this.getLightness() + amount / 100;
    if (l > 1) {
      l = 1;
    }
    return this._c({ h, s, l, a: this.a });
  }

  /**
   * Mix the current color a given amount with another color, from 0 to 100.
   * 0 means no mixing (return current color).
   */
  mix(input: ColorInput, amount = 50) {
    const color = this._c(input);

    const p = amount / 100;
    const calc = (key: string) => (color[key] - this[key]) * p + this[key];

    const rgba = {
      r: round(calc('r')),
      g: round(calc('g')),
      b: round(calc('b')),
      a: round(calc('a') * 100) / 100,
    };

    return this._c(rgba);
  }

  /**
   * Mix the color with pure white, from 0 to 100.
   * Providing 0 will do nothing, providing 100 will always return white.
   */
  tint(amount = 10) {
    return this.mix({ r: 255, g: 255, b: 255, a: 1 }, amount);
  }

  /**
   * Mix the color with pure black, from 0 to 100.
   * Providing 0 will do nothing, providing 100 will always return black.
   */
  shade(amount = 10) {
    return this.mix({ r: 0, g: 0, b: 0, a: 1 }, amount);
  }

  onBackground(background: ColorInput) {
    const bg = this._c(background);
    const alpha = this.a + bg.a * (1 - this.a);

    const calc = (key: string) => {
      return round(
        (this[key] * this.a + bg[key] * bg.a * (1 - this.a)) / alpha,
      );
    };

    return this._c({
      r: calc('r'),
      g: calc('g'),
      b: calc('b'),
      a: alpha,
    });
  }

  // ======================= Status =======================
  isDark(): boolean {
    return this.getBrightness() < 128;
  }

  isLight(): boolean {
    return this.getBrightness() >= 128;
  }

  // ======================== MISC ========================
  equals(other: FastColor): boolean {
    return (
      this.r === other.r &&
      this.g === other.g &&
      this.b === other.b &&
      this.a === other.a
    );
  }

  clone(): this {
    return this._c(this);
  }

  // ======================= Format =======================
  toHexString(): string {
    let hex = '#';
    const rHex = (this.r || 0).toString(16);
    hex += rHex.length === 2 ? rHex : '0' + rHex;
    const gHex = (this.g || 0).toString(16);
    hex += gHex.length === 2 ? gHex : '0' + gHex;
    const bHex = (this.b || 0).toString(16);
    hex += bHex.length === 2 ? bHex : '0' + bHex;
    if (typeof this.a === 'number' && this.a >= 0 && this.a < 1) {
      const aHex = round(this.a * 255).toString(16);
      hex += aHex.length === 2 ? aHex : '0' + aHex;
    }
    return hex;
  }

  /** CSS support color pattern */
  toHsl(): HSL {
    return {
      h: this.getHue(),
      s: this.getSaturation(),
      l: this.getLightness(),
      a: this.a,
    };
  }

  /** CSS support color pattern */
  toHslString(): string {
    const h = this.getHue();
    const s = round(this.getSaturation() * 100);
    const l = round(this.getLightness() * 100);

    return this.a !== 1
      ? `hsla(${h},${s}%,${l}%,${this.a})`
      : `hsl(${h},${s}%,${l}%)`;
  }

  /** Same as toHsb */
  toHsv(): HSV {
    return {
      h: this.getHue(),
      s: this.getSaturation(),
      v: this.getValue(),
      a: this.a,
    };
  }

  toRgb(): RGB {
    return {
      r: this.r,
      g: this.g,
      b: this.b,
      a: this.a,
    };
  }

  toRgbString(): string {
    return this.a !== 1
      ? `rgba(${this.r},${this.g},${this.b},${this.a})`
      : `rgb(${this.r},${this.g},${this.b})`;
  }

  toString(): string {
    return this.toRgbString();
  }

  // ====================== Privates ======================
  /** Return a new FastColor object with one channel changed */
  private _sc(rgb: string, value: number, max?: number) {
    const clone = this.clone();
    clone[rgb] = limitRange(value, max);
    return clone;
  }

  private _c(input: ColorInput): this {
    return new (this.constructor as Constructor<this>)(input);
  }

  private getMax() {
    if (typeof this._max === 'undefined') {
      this._max = Math.max(this.r, this.g, this.b);
    }
    return this._max;
  }

  private getMin() {
    if (typeof this._min === 'undefined') {
      this._min = Math.min(this.r, this.g, this.b);
    }
    return this._min;
  }

  private fromHexString(trimStr: string) {
    const withoutPrefix = trimStr.replace('#', '');

    function connectNum(index1: number, index2?: number) {
      return parseInt(
        withoutPrefix[index1] + withoutPrefix[index2 || index1],
        16,
      );
    }

    if (withoutPrefix.length < 6) {
      // #rgb or #rgba
      this.r = connectNum(0);
      this.g = connectNum(1);
      this.b = connectNum(2);
      this.a = withoutPrefix[3] ? connectNum(3) / 255 : 1;
    } else {
      // #rrggbb or #rrggbbaa
      this.r = connectNum(0, 1);
      this.g = connectNum(2, 3);
      this.b = connectNum(4, 5);
      this.a = withoutPrefix[6] ? connectNum(6, 7) / 255 : 1;
    }
  }

  private fromHsl({ h, s, l, a }: OptionalA<HSL>): void {
    this._h = h % 360;
    this._s = s;
    this._l = l;
    this.a = typeof a === 'number' ? a : 1;

    if (s <= 0) {
      const rgb = round(l * 255);
      this.r = rgb;
      this.g = rgb;
      this.b = rgb;
    }

    let r = 0,
      g = 0,
      b = 0;

    const huePrime = h / 60;
    const chroma = (1 - Math.abs(2 * l - 1)) * s;
    const secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1));

    if (huePrime >= 0 && huePrime < 1) {
      r = chroma;
      g = secondComponent;
    } else if (huePrime >= 1 && huePrime < 2) {
      r = secondComponent;
      g = chroma;
    } else if (huePrime >= 2 && huePrime < 3) {
      g = chroma;
      b = secondComponent;
    } else if (huePrime >= 3 && huePrime < 4) {
      g = secondComponent;
      b = chroma;
    } else if (huePrime >= 4 && huePrime < 5) {
      r = secondComponent;
      b = chroma;
    } else if (huePrime >= 5 && huePrime < 6) {
      r = chroma;
      b = secondComponent;
    }

    const lightnessModification = l - chroma / 2;
    this.r = round((r + lightnessModification) * 255);
    this.g = round((g + lightnessModification) * 255);
    this.b = round((b + lightnessModification) * 255);
  }

  private fromHsv({ h, s, v, a }: OptionalA<HSV>): void {
    this._h = h % 360;
    this._s = s;
    this._v = v;
    this.a = typeof a === 'number' ? a : 1;

    const vv = round(v * 255);
    this.r = vv;
    this.g = vv;
    this.b = vv;

    if (s <= 0) {
      return;
    }

    const hh = h / 60;
    const i = Math.floor(hh);
    const ff = hh - i;
    const p = round(v * (1.0 - s) * 255);
    const q = round(v * (1.0 - s * ff) * 255);
    const t = round(v * (1.0 - s * (1.0 - ff)) * 255);

    switch (i) {
      case 0:
        this.g = t;
        this.b = p;
        break;
      case 1:
        this.r = q;
        this.b = p;
        break;
      case 2:
        this.r = p;
        this.b = t;
        break;
      case 3:
        this.r = p;
        this.g = q;
        break;
      case 4:
        this.r = t;
        this.g = p;
        break;
      case 5:
      default:
        this.g = p;
        this.b = q;
        break;
    }
  }

  private fromHsvString(trimStr: string) {
    const cells = splitColorStr(trimStr, parseHSVorHSL);

    this.fromHsv({
      h: cells[0],
      s: cells[1],
      v: cells[2],
      a: cells[3],
    });
  }

  private fromHslString(trimStr: string) {
    const cells = splitColorStr(trimStr, parseHSVorHSL);

    this.fromHsl({
      h: cells[0],
      s: cells[1],
      l: cells[2],
      a: cells[3],
    });
  }

  private fromRgbString(trimStr: string) {
    const cells = splitColorStr(trimStr, (num, txt) =>
      // Convert percentage to number. e.g. 50% -> 128
      txt.includes('%') ? round((num / 100) * 255) : num,
    );

    this.r = cells[0];
    this.g = cells[1];
    this.b = cells[2];
    this.a = cells[3];
  }
}
