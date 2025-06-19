import { describe, it, expect } from 'vitest'
import { getEnvConfig } from './config'

describe('getEnvConfig', () => {
  it('reads variables from import.meta.env', () => {
    const mockEnv = {
      VITE_R7_BASE_URL: 'https://example.com',
      VITE_R7_API_KEY: 'KEY',
      VITE_APP_USE_BASIC_AUTH: 'true'
    }
    const cfg = getEnvConfig(mockEnv)
    expect(cfg).toEqual({
      baseUrl: 'https://example.com',
      apiKey: 'KEY',
      useBasicAuth: true
    })
  })
})
