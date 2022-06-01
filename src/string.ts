/**
 * cutZero
 * @param {string}
 * @return {string}
 */
export function cutZeros(v: string) {
  if (!/^[0-9.]+$/g.test(v)) return '0'
  while (v.includes('.') && (v.endsWith('.') || v.endsWith('0'))) {
    v = v.slice(0, -1)
  }
  return v
}

/**
 * Returns a string representing a number in fixed-point notation.
 * @param {number} value
 * @param {number} [fractionDigits=2] Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.
 * @param {boolean} [cutZero=true]
 * @returns {string}
 * @example
 *  toFixed(1, 2, true)  // output 1
 *  toFixed(1, 2, false)   // output 1.00
 *  toFixed(1.123, 2, true) // output 1.12
 *  toFixed(1.123, 4, true) // output 1.123
 *  toFixed(1.123, 4, false)  // output 1.1230
 */
export function toFixed(
  value: number,
  fractionDigits = 2,
  cutZero = true
): string {
  const v = value.toFixed(fractionDigits)
  return cutZero ? cutZeros(v) : v
}
