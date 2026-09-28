import { useState } from 'react'
import Login from './Login.jsx'
import Register from './Register.jsx'
import './App.css'

function App() {
  const [view, setView] = useState('login')
  const [message, setMessage] = useState('')

  return (
    <main className="app-shell">
      <section className="intro-panel">
        <p className="eyebrow">KLU / MEMBERS</p>
        <h1>Make your next chapter official.</h1>
        <p className="intro-copy">A simple, secure place to begin your journey with us.</p>
      </section>
      <section className="form-panel">
        <div className="form-heading">
          <p className="eyebrow">WELCOME</p>
          <h2>{view === 'login' ? 'Sign in' : 'Create account'}</h2>
          <p>{view === 'login' ? 'Enter your details to continue.' : 'Join the KLU community today.'}</p>
        </div>
        {message && <p className="message" role="status">{message}</p>}
        {view === 'login' ? (
          <Login onSuccess={() => setMessage('Welcome back.')} />
        ) : (
          <Register onSuccess={() => { setMessage('Account created. You can now sign in.'); setView('login') }} />
        )}
        <button className="switch-button" type="button" onClick={() => { setMessage(''); setView(view === 'login' ? 'register' : 'login') }}>
          {view === 'login' ? 'Need an account? Register' : 'Already have an account? Sign in'}
        </button>
      </section>
    </main>
  )
}

export default App
