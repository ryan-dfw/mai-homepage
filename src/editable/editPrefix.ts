/**
 * Edit mode is derived purely from the current URL — nothing is stored
 * anywhere. maimelancholia.netlify.app is the read-only site (just reads
 * from Firebase/Cloudinary like any visitor). Anything under
 * maimelancholia.netlify.app/supersecretpassword is the exact same site and
 * data, but with editing controls turned on. Leave that path and the
 * controls are gone again — no flag, no localStorage, nothing left behind.
 */
export const EDIT_PREFIX = '/supersecretpassword'

export function isEditPath(pathname: string): boolean {
  return pathname === EDIT_PREFIX || pathname.startsWith(`${EDIT_PREFIX}/`)
}

/** Prefixes an app-relative path (e.g. "/gallery") to stay in edit mode when navigating. */
export function withEditPrefix(to: string, unlocked: boolean): string {
  if (!unlocked) return to
  return to === '/' ? EDIT_PREFIX : `${EDIT_PREFIX}${to}`
}
