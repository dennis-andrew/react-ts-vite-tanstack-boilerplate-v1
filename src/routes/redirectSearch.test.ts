import {
  getSafeRedirect,
  validateRedirectSearch,
} from 'src/routes/redirectSearch'

describe('redirectSearch', () => {
  it('should keep internal redirect paths', () => {
    expect(getSafeRedirect('/dashboard?tab=overview')).toBe(
      '/dashboard?tab=overview',
    )
  })

  it('should trim internal redirect paths', () => {
    expect(getSafeRedirect('  /dashboard  ')).toBe('/dashboard')
  })

  it('should reject external redirects', () => {
    expect(getSafeRedirect('https://example.com/dashboard')).toBeUndefined()
    expect(getSafeRedirect('//example.com/dashboard')).toBeUndefined()
  })

  it('should reject non-string redirects', () => {
    expect(getSafeRedirect(undefined)).toBeUndefined()
    expect(getSafeRedirect(123)).toBeUndefined()
  })

  it('should validate redirect search params', () => {
    expect(validateRedirectSearch({ redirect: '/settings' })).toEqual({
      redirect: '/settings',
    })
    expect(validateRedirectSearch({ redirect: 'https://example.com' })).toEqual(
      {
        redirect: undefined,
      },
    )
  })
})
