import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import client from '../apolloClient'
import { LOGIN_USER } from '../graphql/mutations'


export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login] = useMutation(LOGIN_USER)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await login({ variables: { input: { username, password } } })
      localStorage.setItem('token', data.login) 
      await client.resetStore();

      onLogin()
      alert('Login successful!')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
