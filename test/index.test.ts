import { dataview, address } from '../src/index'

describe('DataView', () => {
  it('Uint8Array To Number', () => {
    const value = new Uint32Array([10])
    const u8 = new Uint8Array(value.buffer)
    expect(dataview.u8ToInt(u8, 0, true)).toBe(10)
  })

  it('Number To Uint8Array', () => {
    const u32 = new Uint32Array([10])
    const u8 = new Uint8Array(u32.buffer)
    expect(dataview.intToU8(10, true).BYTES_PER_ELEMENT).toEqual(
      u8.BYTES_PER_ELEMENT
    )
  })
})

// describe('Address', () => {
//   it('isDioxideAddress: address end with `ed25519` algorithm', () => {
//     const addr =
//       'm04adrp625hw66pg98xtzcwvyth7qd39rst7k96crcj5phmte7b26jj7bc:ed25519'
//     expect(address.isDioxideAddress(addr, 'ed25519')).toBe(true)
//   })

//   it("isDioxideAddress: address don't end with `ed25519` algorithm", () => {
//     const addr = 'm04adrp625hw66pg98xtzcwvyth7qd39rst7k96crcj5phmte7b26jj7bc'
//     expect(address.isDioxideAddress(addr, 'ed25519')).toBe(true)
//   })

//   it('isDioxideAddress: non-ed25519 address', () => {
//     const addr = 'm04adrp625hw66pg98xtzcwvyth7qd39rst7k96crcj5phmte7b26c'
//     expect(address.isDioxideAddress(addr, 'ed25519')).toBe(false)
//   })
// })
