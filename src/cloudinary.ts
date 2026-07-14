const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

export const cloudinaryConfigured = Boolean(CLOUD_NAME && UPLOAD_PRESET)

// Cloudinary's free plan caps image uploads at 10MB. Oversized files get
// downscaled/recompressed client-side (see compressImageUnderLimit) rather
// than rejected outright.
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024

export type UploadedImage = {
  url: string
  width: number
  height: number
  publicId: string
}

/**
 * Re-encodes an oversized image via <canvas> until it's under maxBytes,
 * reducing JPEG quality first and then dimensions if quality alone isn't
 * enough. Returns the original file untouched if it's already small enough.
 */
async function compressImageUnderLimit(file: File, maxBytes: number): Promise<File> {
  if (file.size <= maxBytes) return file

  const bitmap = await createImageBitmap(file)
  let width = bitmap.width
  let height = bitmap.height

  const MAX_DIMENSION = 4096
  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    const scale = MAX_DIMENSION / Math.max(width, height)
    width = Math.round(width * scale)
    height = Math.round(height * scale)
  }

  let quality = 0.9
  let blob: Blob | null = null

  for (let attempt = 0; attempt < 8; attempt++) {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) break
    ctx.drawImage(bitmap, 0, 0, width, height)

    blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/jpeg', quality))
    if (!blob) break
    if (blob.size <= maxBytes) break

    if (quality > 0.5) {
      quality -= 0.15
    } else {
      width = Math.round(width * 0.85)
      height = Math.round(height * 0.85)
    }
  }

  bitmap.close()

  if (!blob) {
    throw new Error(`"${file.name}" couldn't be compressed in this browser — try exporting a smaller version yourself.`)
  }
  if (blob.size > maxBytes) {
    const sizeMb = (blob.size / (1024 * 1024)).toFixed(1)
    throw new Error(`"${file.name}" is still ${sizeMb}MB after compression — try a smaller photo.`)
  }

  const newName = file.name.replace(/\.[^./]+$/, '') + '.jpg'
  return new File([blob], newName, { type: 'image/jpeg' })
}

/**
 * Uploads a file straight from the browser to Cloudinary using an unsigned
 * upload preset — no backend or secret key involved. Requires
 * VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to be set.
 * Files over the free plan's 10MB cap are shrunk automatically first.
 */
export async function uploadImageToCloudinary(file: File): Promise<UploadedImage> {
  if (!cloudinaryConfigured) {
    throw new Error('Cloudinary is not configured (missing VITE_CLOUDINARY_CLOUD_NAME / VITE_CLOUDINARY_UPLOAD_PRESET).')
  }

  const uploadFile = await compressImageUnderLimit(file, MAX_FILE_SIZE_BYTES)

  const formData = new FormData()
  formData.append('file', uploadFile)
  formData.append('upload_preset', UPLOAD_PRESET as string)

  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    let message = `Upload failed (${response.status})`
    try {
      const body = await response.json()
      if (body?.error?.message) message = body.error.message
    } catch {
      // response wasn't JSON — fall back to the generic message above
    }
    throw new Error(message)
  }

  const data = await response.json()
  return {
    url: data.secure_url as string,
    width: data.width as number,
    height: data.height as number,
    publicId: data.public_id as string,
  }
}

/**
 * Returns a resized version of a Cloudinary image by inserting a
 * transformation segment into the URL — no separate thumbnail upload needed.
 * Non-Cloudinary URLs (e.g. the original static /res/img/* placeholder
 * assets) are returned unchanged.
 */
export function cloudinaryThumb(url: string, width = 500): string {
  const marker = '/upload/'
  const i = url.indexOf(marker)
  if (i === -1) return url
  const insertAt = i + marker.length
  return `${url.slice(0, insertAt)}w_${width},c_limit,q_auto,f_auto/${url.slice(insertAt)}`
}

/**
 * Same idea as cloudinaryThumb, but capped at a much larger width — for the
 * lightbox / full-view case. Still gets q_auto + f_auto (so it's served as
 * WebP/AVIF where supported) without shipping the raw, unoptimized original.
 */
export function cloudinaryFull(url: string, maxWidth = 2400): string {
  return cloudinaryThumb(url, maxWidth)
}
