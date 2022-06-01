// https://developer.mozilla.org/zh-CN/docs/Web/API/Blob

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

export function makeArrayBuffer(
  param: string | number | boolean | { [props: string]: any }
) {
  const data = typeof param === 'string' ? param : JSON.stringify(param)
  const blob = new Blob([data], {
    type: 'application/json',
  })
  return makeBlobToArrayBuffer(blob)
}

export async function makeBlobToArrayBuffer(
  blob: Blob,
  contentType?: string
): Promise<Uint8Array> {
  return new Promise((resolve) => {
    const blobChanged = blob.slice(0, blob.size, contentType || '')
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result as Uint8Array)
    }
    reader.readAsArrayBuffer(blobChanged)
  })
}

export async function readAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((r, j) => {
    const reader = new FileReader()
    reader.onload = function () {
      r(reader.result as ArrayBuffer)
    }
    reader.onerror = (ex) => j('ReadFileBuffer error: ' + ex)
    reader.readAsArrayBuffer(file)
  })
}

export async function readAsDataURL(file: File): Promise<string> {
  return new Promise((r, j) => {
    const reader = new FileReader()
    reader.onload = function () {
      r(reader.result as string)
    }
    reader.onerror = (ex) => j('ReadAsDataURL error: ' + ex)
    reader.readAsDataURL(file)
  })
}

export function readArrayBufferAsBlob(
  buffer: ArrayBuffer,
  option?: BlobPropertyBag
) {
  return new Blob([buffer], option)
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
