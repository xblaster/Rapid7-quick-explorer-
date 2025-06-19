import { beforeEach, describe, expect, it, vi } from 'vitest'
import axios from 'axios'
import { storeApiKey, getStoredAuth, loginWithBasicAuth } from './auth'

vi.mock('axios')

describe('auth service', () => {
  beforeEach(() => {
    sessionStorage.clear()
    vi.resetAllMocks()
  })

  it('stores API key in sessionStorage', () => {
    storeApiKey('XYZ')
    expect(getStoredAuth()).toEqual({ apiKey: 'XYZ' })
  })

  it('stores token returned by Rapid7', async () => {
    axios.post.mockResolvedValue({ data: { token: 'T' } })
    await loginWithBasicAuth('user', 'pass', '000')
    expect(axios.post).toHaveBeenCalled()
    expect(getStoredAuth()).toEqual({ token: 'T' })
  })
})
