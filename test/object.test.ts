import { object } from '../src/index'

describe('Object', () => {
  it('shakeRedundantField', () => {
    const source = {
      from: '',
      name: 0,
      to: undefined,
      value: null,
    }
    expect(Object.keys(object.shakeRedundantField(source))).toEqual(['name'])
  })
})
