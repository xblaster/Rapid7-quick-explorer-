import { useState } from 'react'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { getEnvConfig } from '../services/config'
import { loginWithBasicAuth, storeApiKey } from '../services/auth'

function LoginPage() {
  const { useBasicAuth } = getEnvConfig()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [apiKey, setApiKey] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (useBasicAuth) {
      await loginWithBasicAuth(username, password, otp)
    } else {
      storeApiKey(apiKey)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} sx={{ maxWidth: 360, mx: 'auto', mt: 8 }}>
        <Typography variant="h5" component="h1">
          Rapid7 Login
        </Typography>
        {useBasicAuth ? (
          <>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              label="OTP Token"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </>
        ) : (
          <TextField
            label="API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            required
          />
        )}
        <Button type="submit" variant="contained">
          Sign In
        </Button>
      </Stack>
    </form>
  )
}

export default LoginPage
