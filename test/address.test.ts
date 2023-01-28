import { address } from '../src/index'
import { DioxideAddrSignatur } from '../src/address'

const mock = {
  token: '7gtgnayn3wbr3w4jjz5vrg9jeeg9mp58d3sydbd5grkg09heqzmrj2xk98',
  user: 'm04adrp625hw66pg98xtzcwvyth7qd39rst7k96crcj5phmte7b26jj7bc:ed25519',
  nft: 'z27p19bdxx3hxzd82pd89gvg6dpdk5b51x8pcnr34461qkznmazrnw1d44:nft',
  invalid: 'z27p19bdxx3hxzd82pd89gvg6',
}

describe('Address', () => {
  it('isDioxideAddress: address end with `ed25519` algorithm', () => {
    expect(address.isDioxideAddress(mock.user, 'ed25519')).toBe(true)
  })

  it("isDioxideAddress: address don't end with `ed25519` algorithm", () => {
    const short = mock.user.split(':')[0]
    expect(address.isDioxideAddress(short, 'ed25519')).toBe(true)
  })

  it('isDioxideAddress: non-ed25519 address', () => {
    const addr = 'm04adrp625hw66pg98xtzcwvyth7qd39rst7k96crcj5phmte7b26c'
    expect(address.isDioxideAddress(addr, 'ed25519')).toBe(false)
  })

  it('address.getAddressTyp: should be ed25519', () => {
    expect(address.getAddressType(mock.user)).toBe('ed25519')
  })

  it('address.getAddressTyp: should be token address', () => {
    expect(address.getAddressType(mock.token)).toBe('token')
  })

  it('address.getAddressTyp: should be nft', () => {
    expect(address.getAddressType(mock.nft)).toBe('nft')
  })

  it('address.getAddressTyp: should be invalid address', () => {
    expect(address.getAddressType(mock.invalid)).toBe(null)
  })

  it('address.getTruelyAddress: should return address end with true alg', () => {
    const value = mock.token + ':token'
    expect(address.getTruelyAddress(mock.token)).toBe(value)
  })

  it('checkAddrByType: nft', () => {
    const result = address.checkAddrByType({
      addr: mock.nft,
    })
    expect(result.result).toBe(true)
  })

  it('checkAddrByType: token', () => {
    const result = address.checkAddrByType({
      addr: mock.token,
    })
    expect(result.type).toBe('token')
  })

  it('checkAddrByType: invalid address', () => {
    const result = address.checkAddrByType({
      addr: mock.invalid,
    })
    expect(result.result).toBeFalsy()
  })
})

describe('Address to Shard', () => {
  const addr =
    '7gtgnayn3wbr3w4jjz5vrg9jeeg9mp58d3sydbd5grkg09heqzmrj2xk98:token'
  const shardOrder = 2
  it('get shardIndex with address and shardOrder', () => {
    expect(address.addressToShard(addr, shardOrder)).toEqual(2)
  })

  it('get shardIndex with error address', () => {
    expect(() => address.addressToShard('error', shardOrder)).toThrowError(
      'invalid address format'
    )
  })
})
