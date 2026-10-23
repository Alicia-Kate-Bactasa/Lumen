import { useState, useEffect } from 'react'
import type { User } from '../types/auth'
import { login, register } from '../services/authApi'

interface AuthModalProps {
  isOpen: boolean
  initialMode?: 'login' | 'signup'
  message?: string | null
  onClose: () => void
  onSuccess: (user: User) => void
}

export function AuthModal({
  isOpen,
  initialMode = 'login',
  message,
  onClose,
  onSuccess,
}: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode)
      setError(null)
    }
  }, [isOpen, initialMode])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (mode === 'signup' && !name.trim()) {
      setError('Please enter your name.')
      return
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)
    try {
      if (mode === 'signup') {
        const res = await register({ name: name.trim(), email: email.trim(), password })
        onSuccess(res.user)
      } else {
        const res = await login({ email: email.trim(), password })
        onSuccess(res.user)
      }
      onClose()
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const switchMode = (newMode: 'login' | 'signup') => {
    setMode(newMode)
    setError(null)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="auth-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={mode === 'login' ? 'Log In' : 'Create Account'}
      >
        <button
          type="button"
          className="modal-close-button"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="auth-modal-header">
          <div className="auth-icon-badge">
            <i className={mode === 'login' ? 'bi bi-person-check' : 'bi bi-person-plus'}></i>
          </div>
          <h3 className="auth-title">
            {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </h3>
          <p className="auth-subtitle">
            {message || (mode === 'login'
              ? 'Sign in to review your tea orders and checkout quickly.'
              : 'Join Lumen Tea to order your favorite blends and track orders.')}
          </p>
        </div>

        {/* Tab switch */}
        <div className="auth-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'login'}
            className={`auth-tab-btn ${mode === 'login' ? 'active' : ''}`}
            onClick={() => switchMode('login')}
          >
            Log In
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'signup'}
            className={`auth-tab-btn ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => switchMode('signup')}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="auth-error-banner" role="alert">
            <i className="bi bi-exclamation-circle-fill"></i>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'signup' && (
            <div className="form-group">
              <label htmlFor="auth-name" className="form-label">
                Full Name
              </label>
              <div className="input-wrapper">
                <i className="bi bi-person input-icon"></i>
                <input
                  id="auth-name"
                  type="text"
                  required
                  placeholder="e.g. Kenji Tanaka"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="auth-email" className="form-label">
              Email Address
            </label>
            <div className="input-wrapper">
              <i className="bi bi-envelope input-icon"></i>
              <input
                id="auth-email"
                type="email"
                required
                placeholder="you@example.com"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="auth-password" className="form-label">
              Password
            </label>
            <div className="input-wrapper">
              <i className="bi bi-lock input-icon"></i>
              <input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder={mode === 'signup' ? 'At least 6 characters' : 'Your password'}
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="primary-button auth-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="button-spinner-text">
                <span className="soft-spinner-sm"></span>
                {mode === 'login' ? 'Signing in...' : 'Creating account...'}
              </span>
            ) : mode === 'login' ? (
              'Log In'
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="auth-footer-prompt">
          {mode === 'login' ? (
            <p>
              Don't have an account yet?{' '}
              <button
                type="button"
                className="auth-link-button"
                onClick={() => switchMode('signup')}
              >
                Sign up here
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                className="auth-link-button"
                onClick={() => switchMode('login')}
              >
                Log in here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
