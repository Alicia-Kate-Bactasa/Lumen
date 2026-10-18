interface HeaderProps {
  cartItemCount: number
  onOpenCart: () => void
  onGoHome?: () => void
}

export function Header({
  cartItemCount,
  onOpenCart,
  onGoHome,
}: HeaderProps) {
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

          {/* Cart Button */}
          <div className="navbar-actions">
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
