/**
 *  remove key-value pair which value is null/undefined/empty from json-object
 * @param {(json-object | undefined)} params
 * @return {*}
 */
export function shakeRedundantField(params: KeyValue | undefined) {
  if (params && typeof params === 'object') {
    Object.keys(params).forEach((key) => {
      const val = params[key]
      if (['', undefined, null].includes(val)) {
        delete params[key]
      }
    })
    return params
  }
  return params
}
