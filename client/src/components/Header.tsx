import { useEffect, useRef, useState } from 'react'
import type { User } from '../types/auth'

interface HeaderProps {
  cartItemCount: number
  user: User | null
  onOpenCart: () => void
  onGoHome?: () => void
  onOpenAuth: (mode: 'login' | 'signup') => void
  onOpenOrders: () => void
  onLogout: () => void
}

export function Header({
  cartItemCount,
  user,
  onOpenCart,
  onGoHome,
  onOpenAuth,
  onOpenOrders,
  onLogout,
}: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  return (
    <header className="site-header">
      <nav className="navbar">
        <div className="navbar-container">
          {/* Brand */}
          <button
            type="button"
            className="brand"
            onClick={onGoHome}
            aria-label="Go to home"
          >
            <span className="brand-name">Lumen Tea</span>
            <span className="brand-tagline">Simple, Honest Teas</span>
          </button>

          {/* Right Action Controls */}
          <div className="navbar-actions">
            {user ? (
              <div className="user-menu-container" ref={dropdownRef}>
                <button
                  type="button"
                  className="user-profile-button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  aria-expanded={isDropdownOpen}
                  aria-label="Account menu"
                >
                  <span className="user-avatar-circle">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="user-profile-name">{user.name.split(' ')[0]}</span>
                  <i className={`bi bi-chevron-${isDropdownOpen ? 'up' : 'down'} dropdown-chevron`}></i>
                </button>

                {isDropdownOpen && (
                  <div className="user-dropdown-panel" role="menu">
                    <div className="dropdown-user-info">
                      <span className="dropdown-user-name">{user.name}</span>
                      <span className="dropdown-user-email">{user.email}</span>
                    </div>

                    <div className="dropdown-divider"></div>

                    <button
                      type="button"
                      className="dropdown-item"
                      role="menuitem"
                      onClick={() => {
                        setIsDropdownOpen(false)
                        onOpenOrders()
                      }}
                    >
                      <i className="bi bi-clock-history"></i>
                      <span>My Orders</span>
                    </button>

                    <button
                      type="button"
                      className="dropdown-item text-danger"
                      role="menuitem"
                      onClick={() => {
                        setIsDropdownOpen(false)
                        onLogout()
                      }}
                    >
                      <i className="bi bi-box-arrow-right"></i>
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons-group">
                <button
                  type="button"
                  className="auth-header-btn login-btn"
                  onClick={() => onOpenAuth('login')}
                >
                  Log In
                </button>
                <button
                  type="button"
                  className="auth-header-btn signup-btn"
                  onClick={() => onOpenAuth('signup')}
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Cart Button */}
            <button
              type="button"
              className="cart-toggle-button"
              onClick={onOpenCart}
              aria-label="Open your bag"
            >
              <i className="bi bi-bag"></i>
              <span className="cart-text">Cart</span>
              {cartItemCount > 0 && (
                <span className="cart-count-badge">{cartItemCount}</span>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
