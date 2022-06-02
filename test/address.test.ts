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