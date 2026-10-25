import type { Product } from '../types/product'
import { formatPrice } from '../utils/currency'
import { PetalBadgeIcon, SampaguitaStar } from './FloralIcons'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
  onViewDetails: (product: Product) => void
}

export function ProductCard({
  product,
  onAddToCart,
  onViewDetails,
}: ProductCardProps) {
  return (
    <article className="tea-card petal-hover-card">
      {/* Product Image Frame with Petal Flared Arch & Warm Glow */}
      <div
        className="tea-card-image-wrap petal-flared-frame"
        onClick={() => onViewDetails(product)}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${product.name}`}
      >
        <div className="card-soft-radial-glow" aria-hidden="true" />
        <img
          src={product.imageUrl}
          alt={product.name}
          className="tea-card-image petal-arch-crop"
          loading="lazy"
          onError={(e) => {
            // Graceful fallback to rich tea photo if external CDN fails
            const target = e.currentTarget
            target.onerror = null
            target.src = 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80'
          }}
        />
        <div className="card-badge-container">
          <span className="tea-category-badge">{product.category}</span>
          {product.featured && (
            <span className="tea-featured-badge">
              <SampaguitaStar size={13} className="badge-sampaguita" />
              <span>Artisanal Choice</span>
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="tea-card-body">
        <div className="card-meta-line">
          <span className="caffeine-indicator">
            <i className="bi bi-clock"></i>
            <span>{product.caffeineLevel} Caffeine</span>
          </span>
        </div>

        <h3
          className="tea-card-title"
          onClick={() => onViewDetails(product)}
        >
          {product.name}
        </h3>

        <p className="tea-card-desc">
          {product.description}
        </p>

        {/* Fragrance & Flavor Badges: rounded pill outlines with line-drawn petal icon */}
        <div className="card-taste-tags">
          {product.tasteNotes.slice(0, 3).map((note) => (
            <span key={note} className="taste-tag petal-pill-badge">
              <PetalBadgeIcon size={12} className="tag-petal-icon" />
              <span>{note}</span>
            </span>
          ))}
        </div>

        {/* Card Footer */}
        <div className="tea-card-footer">
          <div className="price-display">
            <span className="price-value">{formatPrice(product.price)}</span>
            <span className="price-unit">per fresh tin</span>
          </div>

          <div className="card-action-buttons">
            <button
              type="button"
              className="card-details-btn pill-btn"
              onClick={() => onViewDetails(product)}
              title="See brewing guide and details"
            >
              <i className="bi bi-info-circle"></i>
              <span>Details</span>
            </button>
            <button
              type="button"
              className="card-add-btn pill-btn"
              onClick={() => onAddToCart(product)}
            >
              <i className="bi bi-bag-plus"></i>
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
