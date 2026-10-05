import type { TeaCategory } from '../types/product'

interface HeaderProps {
  cartItemCount: number
  onOpenCart: () => void
  onOpenTeaFinder: () => void
  activeCategory: TeaCategory
  onSelectCategory: (category: TeaCategory) => void
  isLiveApi: boolean
}

const NAV_CATEGORIES: TeaCategory[] = [
  'All',
  'Matcha',
  'Hojicha',
  'Genmaicha',
  'Sencha',
  'Black Tea',
  'Milk Tea',
]

export function Header({
  cartItemCount,
  onOpenCart,
  onOpenTeaFinder,
  activeCategory,
  onSelectCategory,
  isLiveApi,
}: HeaderProps) {
  return (
    <header className="site-header">
      {/* Friendly Announcement Bar */}
      <div className="announcement-banner">
        <div className="announcement-inner">
          <span>Fresh harvest teas are here — Free shipping on orders over $45</span>
          <span className={`status-pill ${isLiveApi ? 'online' : 'demo'}`}>
            <i className="bi bi-circle-fill status-icon"></i>
            {isLiveApi ? 'Connected to API' : 'Catalog Mode'}
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="navbar">
        <div className="navbar-container">
          {/* Brand */}
          <button
            type="button"
            className="brand"
            onClick={() => onSelectCategory('All')}
            aria-label="Go to home"
          >
            <span className="brand-name">Lumen Tea</span>
            <span className="brand-tagline">Simple, Honest Teas</span>
          </button>

          {/* Navigation Links */}
          <div className="nav-menu">
            {NAV_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`nav-button ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => onSelectCategory(cat)}
              >
                {cat === 'All' ? 'All Teas' : cat}
              </button>
            ))}
            <button
              type="button"
              className="nav-button tea-finder-button"
              onClick={onOpenTeaFinder}
            >
              <i className="bi bi-sparkles"></i>
              <span>Tea Finder</span>
            </button>
          </div>

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
