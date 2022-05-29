/**
 * Returns a string representing a number in fixed-point notation.
 * @param {number} value
 * @param {number} [fractionDigits=2] Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.
 * @param {boolean} [keepZero=false] Whether keep redundant zero end of string
 * @returns {string}
 * @example
 *  toFixed(1, 2, false)  // output 1
 *  toFixed(1, 2, true)   // output 1.00
 *  toFixed(1.123, 2, false) // output 1.12
 *  toFixed(1.123, 4, false) // output 1.123
 *  toFixed(1.123, 4, true)  // output 1.1230
 */
export function toFixed(
  value: number,
  fractionDigits = 2,
  keepZero = false
): string {
  const v = value.toFixed(fractionDigits)
  return keepZero
    ? v
    : v.replace(/(\.[1-9]*)(0+)$/, (_, $1) => $1.replace(/\.$/, () => ''))
}
