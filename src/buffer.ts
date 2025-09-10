// https://developer.mozilla.org/zh-CN/docs/Web/API/Blob

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
      resolve(reader.result as any)
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
