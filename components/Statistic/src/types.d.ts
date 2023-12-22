/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
export type KStatisticProps = {
  /**
   * @description Setting the decimal point
   */
  decimalSeparator: string
  /**
   * @description Sets the thousandth identifier
   */
  groupSeparator: string
  /**
   * @description numerical precision
   */
  precision: number
  /**
   * @description Custom numerical presentation
   */
  formatter: ((value: number) => string | number) | undefined,
  /**
   * @description TODO: ❓ Numerical content
   */
  value: number
  /**
   * @description Sets the prefix of a number
   */
  prefix: string | undefined,

  /**
   * @description  Sets the suffix of a number
   */
  suffix: string | undefined,
  /**
   * @description Numeric titles
   */
  title: string | undefined,
  /**
   * @description Styles numeric values
   */
  valueStyle: string | undefined,
  cls: ClassValue,
  attrs: Record<string, string>
}
