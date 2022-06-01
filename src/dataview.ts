// Merge ArrayBuffers
export function concat(...args: ArrayBuffer[]) {
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

export function stringToU8Array(message: string): Uint8Array {
  return new TextEncoder().encode(message)
}

export function u8ArrayToString(content: Uint8Array) {
  return new TextDecoder('utf-8').decode(content)
}

export function u8ToHex(content: Uint8Array): string {
  return content.reduce(
    (str, byte) => str + byte.toString(16).padStart(2, '0'),
    ''
  )
}

export function hexToU8(hexString: string): Uint8Array {
  hexString = hexString.replace(/^0x/, '')

  if (hexString.length % 2 != 0) {
    console.log(
      'WARNING: expecting an even number of characters in the hexString'
    )
  }

  // check for some non-hex characters
  const bad = hexString.match(/[G-Z\s]/i)
  if (bad) {
    console.log('WARNING: found non-hex characters', bad)
  }

  const pairs = hexString.match(/[\dA-F]{2}/gi)
  const integers = pairs?.map(function (s) {
    return parseInt(s, 16)
  })

  if (!integers) {
    throw new Error('error input')
  }

  return new Uint8Array(integers)
}

/**
 *
 * Transfer base64 string to uint8 array
 * @param {string} base64
 * @return {*}
 */
export function base64ToUint8Array(base64: string) {
  const binary_string = atob(base64)
  const len = binary_string.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i += 1) {
    bytes[i] = binary_string.charCodeAt(i)
  }
  return bytes
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
