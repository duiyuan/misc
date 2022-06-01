import { dataview } from '../src/index'

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
