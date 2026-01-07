import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import client from '../apolloClient'
import { LOGIN_USER, REGISTER_USER  } from '../graphql/mutations'
import "../styles/login.css"

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login] = useMutation(LOGIN_USER)
  const [register] = useMutation(REGISTER_USER)

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
  const handleRegister = async () => {

    if(username && password && password.length>=6 )
    {
      try {
        const { data } = await register({ variables: { input: { username, password } } })
        alert('User created!')
      } catch (err) {
        alert(err.message)
      }
    }
    else
    {
      alert('Invalid values!');
    }
  }

  return (
    <div>
      <div className='loginContainer'>
        <form onSubmit={handleSubmit}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username" required
          /><br/>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
            minLength={6}
          /><br/>
          <button type="submit">Login</button>
        </form>

        <br/>
        <button onClick={()=>handleRegister()}>Register?</button>
      </div>
    </div>
  )
}
