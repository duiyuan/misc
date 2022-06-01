import crc32c from 'crc-32/crc32c'
import base32Encode from 'base32-encode'
import base32Decode from 'base32-decode'

import { concat } from './dataview'

/**
 * whether the address is generate by dioxide or not
 * @param {string} address
 * @param {string} algorithm
 * @return {*}  {boolean}
 */
export function isDioxideAddress(address: string, alg: 'ed25519'): boolean {
  try {
    if (alg !== 'ed25519' || typeof address !== 'string') {
      return false
    }

    address = address.toLocaleLowerCase().replace(':ed25519', '')
    const addr = new Uint8Array(base32Decode(address, 'Crockford'))

    const publicKey = addr.slice(0, 32)
    let errorCorrectingCode = crc32c.buf(publicKey, 3)
    errorCorrectingCode = (errorCorrectingCode & 0xfffffff0) | 0x3
    errorCorrectingCode = errorCorrectingCode >>> 0

    const buffer = new Int32Array([errorCorrectingCode]).buffer
    const errorCorrectingCodeBuffer = new Uint8Array(buffer)

    const mergedBuffer = concat(publicKey, errorCorrectingCodeBuffer)
    const encodedMergeBuffer = base32Encode(mergedBuffer, 'Crockford')

    return encodedMergeBuffer === address.toUpperCase()
  } catch (error) {
    return false
  }
}
