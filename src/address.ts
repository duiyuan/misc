import crc32c from 'crc-32/crc32c'
import base32Encode from 'base32-encode'
import base32Decode from 'base32-decode'

import { concat } from './dataview'

export type Variant = 'RFC3548' | 'RFC4648' | 'RFC4648-HEX' | 'Crockford'
export type DioxideAddrSignatur =
  | 'ed25519'
  | 'sm2'
  | 'ethereum'
  | 'dapp'
  | 'token'
  | 'nft'

export enum AlgType {
  'ethereum' = 1,
  'sm2' = 2,
  'ed25519' = 3,
  'dapp' = 8,
  'token' = 9,
  'nft' = 10,
}

export const algToEnumValMapping = {
  ed25519: 3,
  sm2: 2,
  ethereum: 1,
  dapp: 8,
  token: 9,
  nft: 10,
}

const valToAlgMapping: any = {
  3: 'ed25519',
  2: 'sm2',
  1: 'ethereum',
  8: 'dapp',
  9: 'token',
  10: 'nft',
}

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

/**
 * address to shard
 * @param address
 * @param shardOrder
 * @returns shard
 */
export const addressToShard = (address: string, shardOrder: number): number => {
  const colonIdx = address.lastIndexOf(':')
  if (colonIdx === -1) throw 'invalid address format'
  const unit8Array = new Uint8Array(
    base32Decode(address.substring(0, colonIdx), 'Crockford')
  )
  const decoded = String.fromCharCode.apply(null, Array.from(unit8Array))
  if (!decoded || decoded.length != 36) throw 'invalid address format'
  const dwords = new Uint32Array(9)
  for (let i = 0; i < 9; i++) {
    dwords[i] = 0
    for (let j = 0; j < 4; j++) {
      dwords[i] += decoded.charCodeAt(i * 4 + j) << (j * 8)
    }
  }
  const shardDword = dwords[0] ^ dwords[7] ^ dwords[4]
  const shardMask = ~(0xffffffff << shardOrder)
  return shardDword & shardMask
}

export const getAddressType = (
  addr: string,
  variant: Variant = 'Crockford'
): DioxideAddrSignatur | null => {
  const type = getAddressEnum(addr, variant)
  const alg = valToAlgMapping[type]
  if (typeof alg !== 'undefined') {
    return alg
  }
  return null
}

export const getAddressEnum = (
  addr: string,
  variant: Variant = 'Crockford'
): number => {
  addr = addr.includes(':') ? addr.split(':')[0] : addr
  const u8: Uint8Array = new Uint8Array(base32Decode(addr, variant))
  const byte: number = u8[32]
  return byte & 0xf
}

export const getTruelyAddress = (addr: string): string => {
  addr = addr.includes(':') ? addr.split(':')[0] : addr
  const type = getAddressType(addr)
  return !type ? addr : [addr, type].join(':')
}

export const checkAddrByType = (params: {
  addr: string
}): {
  result: boolean
  type?: DioxideAddrSignatur | null
  enumValue?: number
  err?: string
} => {
  try {
    const { addr } = params

    const address = addr.toLocaleLowerCase().replace(/:\w+$/, '')
    const addrU8 = new Uint8Array(base32Decode(address, 'Crockford'))
    const algValue = getAddressEnum(addr)
    const algType = getAddressType(addr)
    if (algValue === null) {
      return {
        result: false,
        err: "Can't deduce alg id",
      }
    }
    const publicKey = addrU8.slice(0, 32)
    let errorCorrectingCode = crc32c.buf(publicKey, algValue)
    errorCorrectingCode = (errorCorrectingCode & 0xfffffff0) | algValue
    errorCorrectingCode = errorCorrectingCode >>> 0

    const buffer = new Int32Array([errorCorrectingCode]).buffer
    const errorCorrectingCodeBuffer = new Uint8Array(buffer)

    const mergedBuffer = concat(publicKey, errorCorrectingCodeBuffer)
    const encodedMergeBuffer = base32Encode(mergedBuffer, 'Crockford')
    return {
      result: encodedMergeBuffer === address.toUpperCase(),
      enumValue: algValue,
      type: algType,
    }
  } catch (ex: any) {
    return {
      result: false,
      err: ex.toString(),
    }
  }
}
