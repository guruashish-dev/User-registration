import { useState } from 'react'

function Register({ onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  const updateField = (event) => setForm({ ...form, [event.target.name]: event.target.value })

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!response.ok) throw new Error(response.status === 409 ? 'That email is already registered.' : 'Unable to create account.')
      onSuccess()
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  return (
    <form className="auth-form" onSubmit={submit}>
      <label>Full name<input name="name" value={form.name} onChange={updateField} required /></label>
      <label>Email<input name="email" type="email" value={form.email} onChange={updateField} required /></label>
      <label>Password<input name="password" type="password" value={form.password} onChange={updateField} minLength="6" required /></label>
      {error && <p className="error">{error}</p>}
      <button className="primary-button" type="submit">Create account <span aria-hidden="true">↗</span></button>
    </form>
  )
}

export default Register
