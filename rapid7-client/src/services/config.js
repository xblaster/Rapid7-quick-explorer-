export function getEnvConfig(env = import.meta.env) {
  const {
    VITE_R7_BASE_URL,
    VITE_R7_API_KEY,
    VITE_APP_USE_BASIC_AUTH
  } = env

  return {
    baseUrl: VITE_R7_BASE_URL,
    apiKey: VITE_R7_API_KEY,
    useBasicAuth: VITE_APP_USE_BASIC_AUTH === 'true'
  }
}
