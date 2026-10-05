import type { Product } from '../types/product'

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
    <article className="tea-card">
      {/* Product Image */}
      <div
        className="tea-card-image-wrap"
        onClick={() => onViewDetails(product)}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${product.name}`}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="tea-card-image"
          loading="lazy"
        />
        <div className="card-badge-container">
          <span className="tea-category-badge">{product.category}</span>
          {product.featured && (
            <span className="tea-featured-badge">Popular Choice</span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="tea-card-body">
        <div className="card-meta-line">
          <span className="caffeine-indicator">
            <i className="bi bi-clock"></i>
            {product.caffeineLevel} Caffeine
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

        {/* Taste Notes */}
        <div className="card-taste-tags">
          {product.tasteNotes.slice(0, 3).map((note) => (
            <span key={note} className="taste-tag">
              {note}
            </span>
          ))}
        </div>

        {/* Card Footer */}
        <div className="tea-card-footer">
          <div className="price-display">
            <span className="price-value">${product.price.toFixed(2)}</span>
            <span className="price-unit">per tin</span>
          </div>

          <div className="card-action-buttons">
            <button
              type="button"
              className="card-details-btn"
              onClick={() => onViewDetails(product)}
              title="See brewing guide and details"
            >
              <i className="bi bi-info-circle"></i>
              <span>Details</span>
            </button>
            <button
              type="button"
              className="card-add-btn"
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
