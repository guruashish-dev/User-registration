import { useState } from 'react'

function Login({ onSuccess }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const updateField = (event) => setForm({ ...form, [event.target.name]: event.target.value })

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!response.ok) throw new Error('Invalid email or password.')
      onSuccess()
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  return (
    <form className="auth-form" onSubmit={submit}>
      <label>Email<input name="email" type="email" value={form.email} onChange={updateField} required /></label>
      <label>Password<input name="password" type="password" value={form.password} onChange={updateField} required /></label>
      {error && <p className="error">{error}</p>}
      <button className="primary-button" type="submit">Sign in <span aria-hidden="true">↗</span></button>
    </form>
  )
}

export default Login
