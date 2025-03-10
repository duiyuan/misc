import { decode, encode } from 'base64-arraybuffer'
/**
 * Join multiple Uint8Array to one
 * @param {ArrayBuffer[]} args
 * @return {*}  {Uint8Array}
 */
export function concat(...args: ArrayBuffer[]): Uint8Array {
  let length = 0
  const units = args.map((arg) => {
    return new Uint8Array(arg)
  })

  // Get the total length of all arrays.
  units.forEach((item) => {
    length += item.length
  })

  // Create a new array with total length and merge all source arrays.
  const mergedArray = new Uint8Array(length)
  let offset = 0
  units.forEach((item) => {
    mergedArray.set(item, offset)
    offset += item.length
  })
  // Should print an array with length 90788 (5x 16384 + 8868 your source arrays)
  return mergedArray
}

/**
 * Turn string to uint8array
 * @param {string} message
 * @return {*}  {Uint8Array}
 */
export function stringToU8(message: string): Uint8Array {
  return new TextEncoder().encode(message)
}

/**
 * Turn Uint8array to string
 * @param {string} message
 * @return {*}  {Uint8Array}
 */
export function u8ToString(content: Uint8Array) {
  return new TextDecoder('utf-8').decode(content)
}

/**
 * Turn uint8array to hex-string
 * @param {string} message
 * @return {*}  {Uint8Array}
 */
export function u8ToHex(content: Uint8Array): string {
  return content.reduce(
    (str, byte) => str + byte.toString(16).padStart(2, '0'),
    ''
  )
}

/**
 * Transform hex-string to Uint8Array
 * @param {string} hex
 * @return {*}  {Uint8Array}
 */
export function hexToU8(hex: string): Uint8Array {
  hex = hex.replace(/^0x/, '')

  if (hex.length % 2 != 0) {
    throw new Error('expecting an even number of characters in the hex-string')
  }

  const bad = hex.match(/[G-Z\s]/i)
  if (bad) {
    throw new Error('found non-hex characters' + bad)
  }

  const pairs = hex.match(/[\dA-F]{2}/gi)
  const integers = pairs?.map(function (s) {
    return parseInt(s, 16)
  })

  if (!integers) {
    throw new Error('error input')
  }

  return new Uint8Array(integers)
}

/**
 * Transfer base64 string to uint8 array
 * @param {string} base64
 * @return {*}
 */
export function base64ToU8(base64: string): Uint8Array {
  return new Uint8Array(decode(base64))
}

/**
 * Transfer uint8array to base64 string
 * @param {string} base64
 * @return {*}
 */

export function u8ToBase64(u: Uint8Array): string {
  return encode(u)
}

export function hexToBase64(msg: string) {
  const u8 = hexToU8(msg)
  return u8ToBase64(u8)
}

export function base64ToHex(msg: string) {
  const buff = decode(msg)
  const u8 = new Uint8Array(buff)
  return u8ToHex(u8)
}

/**
 * change base64-string to arraybuffer
 * @param {string} content base64-string
 * @return {*} arraybuffer
 */
export function base64ToArraybuffer(content: string): ArrayBuffer {
  return decode(content)
}

/**
 *
 * transform Uint8Array value to number
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView
 * @param {Uint8Array} value
 * @param {number} [offset=0]
 * @param {boolean} [littleEndian=true]
 * @return {*}  {number}
 */
export function u8ToInt(
  value: Uint8Array,
  offset = 0,
  littleEndian = true
): number {
  const u8 = value instanceof Uint8Array
  if (!u8) {
    throw new Error('u8ToInt: Value is not Uint8Array')
  }
  const view = new DataView(value.buffer, 0)
  return view.getInt32(offset, littleEndian)
}

/**
 * transform number to Unit8Array
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView
 * @param {number} value
 * @param {boolean} [littleEndian=true]
 * @return {*}  {Uint8Array}
 */
export function intToU8(value: number, littleEndian = true): Uint8Array {
  if (typeof value !== 'number') {
    throw new Error('intToU8: value is not number')
  }
  // const u32 = new Uint32Array([value])
  const buffer = new ArrayBuffer(16)
  const view = new DataView(buffer, 0)
  view.setInt32(0, value, littleEndian)
  return new Uint8Array(view.buffer)
}
