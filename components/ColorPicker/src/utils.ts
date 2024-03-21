import tinycolor, { type ColorInput } from 'tinycolor2';

export function toHex(value: ColorInput) {
	return tinycolor(value).toHex();
}

export function toHexString(value: ColorInput) {
	return tinycolor(value).toHexString();
}

export function toHex8String(value: ColorInput) {
	return tinycolor(value).toHex8String();
}

export function toHsv(value: ColorInput) {
	return tinycolor(value).toHsv();
}

export function toHsvString(value: ColorInput) {
	return tinycolor(value).toHsvString();
}

export function toRgb(value: ColorInput) {
	return tinycolor(value).toRgb();
}

export function toRgbString(value: ColorInput) {
	return tinycolor(value).toRgbString();
}

export function isLightColor(value: ColorInput) {
	return tinycolor(value).isLight();
}
