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
  const profile = product.flavorProfile

  return (
    <article className="product-card">
      {/* Image & Badges */}
      <div className="card-media" onClick={() => onViewDetails(product)}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        <div className="card-badges">
          {product.category && (
            <span className="badge badge-category">{product.category}</span>
          )}
          {product.featured && (
            <span className="badge badge-featured">Master Reserve</span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="card-body">
        <div className="card-origin">
          {product.origin ? product.origin : 'Single Estate'}
        </div>

        <h3 className="card-title" onClick={() => onViewDetails(product)}>
          {product.name}
        </h3>

        <p className="card-description">
          {product.description}
        </p>

        {/* Tasting Notes */}
        {product.flavorNotes && product.flavorNotes.length > 0 && (
          <div className="card-flavor-notes">
            {product.flavorNotes.slice(0, 3).map((note) => (
              <span key={note} className="flavor-tag">
                {note}
              </span>
            ))}
          </div>
        )}

        {/* Mini Flavor Spectrum Meter */}
        {profile && (
          <div className="card-spectrum">
            <div className="spectrum-row">
              <span className="spectrum-label">Umami</span>
              <div className="spectrum-bar">
                <div
                  className="spectrum-fill umami-fill"
                  style={{ width: `${(profile.umami / 10) * 100}%` }}
                />
              </div>
            </div>
            <div className="spectrum-row">
              <span className="spectrum-label">Sweet</span>
              <div className="spectrum-bar">
                <div
                  className="spectrum-fill sweet-fill"
                  style={{ width: `${(profile.sweetness / 10) * 100}%` }}
                />
              </div>
            </div>
            <div className="spectrum-row">
              <span className="spectrum-label">Floral</span>
              <div className="spectrum-bar">
                <div
                  className="spectrum-fill floral-fill"
                  style={{ width: `${(profile.floral / 10) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Footer with Price and Add to Cart */}
        <div className="card-footer">
          <div className="price-tag">
            <span className="currency">$</span>
            <span className="amount">{product.price.toFixed(2)}</span>
            <span className="unit">/ tin</span>
          </div>

          <div className="card-actions">
            <button
              type="button"
              className="btn btn-sm btn-ghost"
              onClick={() => onViewDetails(product)}
            >
              Ritual
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => onAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
