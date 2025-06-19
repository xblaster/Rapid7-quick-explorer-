import axios from 'axios'
import { getEnvConfig } from './config'

const STORAGE_KEY = 'r7Auth'

function encode(data) {
  return btoa(JSON.stringify(data))
}

function decode(str) {
  try {
    return JSON.parse(atob(str))
  } catch {
    return null
  }
}

export function getStoredAuth() {
  const raw = sessionStorage.getItem(STORAGE_KEY)
  return raw ? decode(raw) : null
}

export function clearAuth() {
  sessionStorage.removeItem(STORAGE_KEY)
}

export function storeApiKey(apiKey) {
  sessionStorage.setItem(STORAGE_KEY, encode({ apiKey }))
}

export async function loginWithBasicAuth(username, password, otp) {
  const { baseUrl } = getEnvConfig()
  const headers = {
    Authorization: `Basic ${btoa(`${username}:${password}`)}`
  }
  const { data } = await axios.post(
    `${baseUrl}/api/3/auth/token`,
    { otp },
    { headers }
  )
  const { token } = data
  sessionStorage.setItem(STORAGE_KEY, encode({ token }))
  return token
}
