export interface RedirectSearch {
  redirect?: string
}

export const getSafeRedirect = (redirect: unknown): string | undefined => {
  if (typeof redirect !== 'string') return undefined

  const trimmedRedirect = redirect.trim()

  if (!trimmedRedirect.startsWith('/') || trimmedRedirect.startsWith('//')) {
    return undefined
  }

  return trimmedRedirect
}

export const validateRedirectSearch = (
  search: Record<string, unknown>,
): RedirectSearch => ({
  redirect: getSafeRedirect(search.redirect),
})
