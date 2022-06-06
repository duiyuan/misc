import { address } from '../src/index'

describe('Address', () => {
  const addr =
    'm04adrp625hw66pg98xtzcwvyth7qd39rst7k96crcj5phmte7b26jj7bc:ed25519'
  it('isDioxideAddress: address end with `ed25519` algorithm', () => {
    expect(address.isDioxideAddress(addr, 'ed25519')).toBe(true)
  })

  it("isDioxideAddress: address don't end with `ed25519` algorithm", () => {
    const short = addr.split(':')[0]
    expect(address.isDioxideAddress(short, 'ed25519')).toBe(true)
  })

  it('isDioxideAddress: non-ed25519 address', () => {
    const addr = 'm04adrp625hw66pg98xtzcwvyth7qd39rst7k96crcj5phmte7b26c'
    expect(address.isDioxideAddress(addr, 'ed25519')).toBe(false)
  })
})

describe('Address to Shard', () => {
  const addr = '7gtgnayn3wbr3w4jjz5vrg9jeeg9mp58d3sydbd5grkg09heqzmrj2xk98:token'
  const shardOrder = 2
  it('get shardIndex with address and shardOrder', () => {
    expect(address.addressToShard(addr, shardOrder)).toEqual(2)
  })
})
