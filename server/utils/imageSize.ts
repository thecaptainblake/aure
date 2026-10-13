export interface InspectedImage {
  mime: 'image/jpeg' | 'image/png' | 'image/webp'
  extension: 'jpg' | 'png' | 'webp'
  width: number
  height: number
}

const jpegSize = (buffer: Buffer) => {
  if (buffer[0] !== 0xff || buffer[1] !== 0xd8) return null
  let offset = 2
  while (offset + 8 < buffer.length) {
    if (buffer[offset] !== 0xff) return null
    const marker = buffer[offset + 1]
    if (marker === undefined) return null
    if (marker === 0xd8 || marker === 0xd9) {
      offset += 2
      continue
    }
    const length = buffer.readUInt16BE(offset + 2)
    const isStartOfFrame =
      marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc
    if (isStartOfFrame) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
      }
    }
    offset += 2 + length
  }
  return null
}

const pngSize = (buffer: Buffer) => {
  const isPng =
    buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47
  if (!isPng || buffer.length < 24) return null
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  }
}

const webpSize = (buffer: Buffer) => {
  const isWebp = buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP'
  if (!isWebp || buffer.length < 30) return null
  const chunk = buffer.toString('ascii', 12, 16)
  if (chunk === 'VP8 ') {
    return {
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff,
    }
  }
  if (chunk === 'VP8L') {
    const bits = buffer.readUInt32LE(21)
    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >> 14) & 0x3fff) + 1,
    }
  }
  if (chunk === 'VP8X') {
    return {
      width: 1 + buffer.readUIntLE(24, 3),
      height: 1 + buffer.readUIntLE(27, 3),
    }
  }
  return null
}

export const inspectImage = (buffer: Buffer): InspectedImage | null => {
  const png = pngSize(buffer)
  if (png && png.width > 0 && png.height > 0) {
    return { mime: 'image/png', extension: 'png', ...png }
  }
  const jpeg = jpegSize(buffer)
  if (jpeg && jpeg.width > 0 && jpeg.height > 0) {
    return { mime: 'image/jpeg', extension: 'jpg', ...jpeg }
  }
  const webp = webpSize(buffer)
  if (webp && webp.width > 0 && webp.height > 0) {
    return { mime: 'image/webp', extension: 'webp', ...webp }
  }
  return null
}
