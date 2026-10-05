interface HeaderProps {
  cartItemCount: number
  onOpenCart: () => void
  onOpenSommelier: () => void
  activeNav: string
  onSelectNav: (category: string) => void
  isLiveApi: boolean
}

export function Header({
  cartItemCount,
  onOpenCart,
  onOpenSommelier,
  activeNav,
  onSelectNav,
  isLiveApi,
}: HeaderProps) {
  return (
    <header className="lumen-header">
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <div className="announcement-content">
          <span>Spring 2026 First Harvest Matcha Now Available</span>
          <span className="dot-separator">•</span>
          <span>Complimentary Bamboo Whisk on Orders Over $65</span>
          <span className="dot-separator">•</span>
          <span className={`api-indicator ${isLiveApi ? 'online' : 'offline'}`}>
            <span className="indicator-dot"></span>
            {isLiveApi ? 'API Connected (.NET 10)' : 'Catalog Mode'}
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="main-nav">
        <div className="nav-container">
          <div className="brand-lockup" onClick={() => onSelectNav('All')}>
            <span className="brand-logo">LUMEN</span>
            <span className="brand-sub">TEA & BOTANICALS</span>
          </div>

          <div className="nav-links">
            {['All', 'Matcha', 'Green Tea', 'Oolong', 'Herbal'].map((item) => (
              <button
                key={item}
                type="button"
                className={`nav-link ${activeNav === item ? 'active' : ''}`}
                onClick={() => onSelectNav(item)}
              >
                {item === 'All' ? 'Collection' : item}
              </button>
            ))}
            <button
              type="button"
              className="nav-link nav-link-sommelier"
              onClick={onOpenSommelier}
            >
              <span>AI Sommelier</span>
              <span className="ai-badge">BETA</span>
            </button>
          </div>

          <div className="nav-actions">
            <button
              type="button"
              className="action-btn cart-btn"
              onClick={onOpenCart}
              aria-label="View Shopping Cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="cart-label">Cart</span>
              {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
