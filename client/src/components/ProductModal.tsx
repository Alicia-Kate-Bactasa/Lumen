import { useState } from 'react'
import type { Product } from '../types/product'

interface ProductModalProps {
  product: Product | null
  onClose: () => void
  onAddToCart: (product: Product, quantity: number) => void
}

export function ProductModal({
  product,
  onClose,
  onAddToCart,
}: ProductModalProps) {
  const [qty, setQty] = useState(1)

  if (!product) return null

  const profile = product.flavorProfile
  const guide = product.brewingGuide

  const handleAdd = () => {
    onAddToCart(product, qty)
    onClose()
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close dialog"
        >
          ✕
        </button>

        <div className="modal-grid">
          {/* Media Column */}
          <div className="modal-media">
            <img src={product.imageUrl} alt={product.name} />
            <div className="modal-terroir-badge">
              <span>{product.origin}</span>
              {product.harvestSeason && <span> • {product.harvestSeason}</span>}
            </div>
          </div>

          {/* Details Column */}
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-category">{product.category}</span>
              <h2 className="modal-title">{product.name}</h2>
              <div className="modal-price">
                ${product.price.toFixed(2)}
                <span className="modal-price-sub"> / 50g artisan canister</span>
              </div>
            </div>

            <p className="modal-description">{product.description}</p>

            {/* Cultivar */}
            {product.cultivar && (
              <div className="cultivar-note">
                <strong>Cultivar:</strong> {product.cultivar}
              </div>
            )}

            {/* 6-Axis Flavor Breakdown */}
            {profile && (
              <div className="modal-flavor-section">
                <h4 className="section-heading">Flavor Profile Analysis</h4>
                <div className="flavor-grid">
                  {[
                    { label: 'Umami', val: profile.umami, color: '#3d5a4c' },
                    { label: 'Sweetness', val: profile.sweetness, color: '#d89b53' },
                    { label: 'Vegetal', val: profile.vegetal, color: '#688c5f' },
                    { label: 'Floral', val: profile.floral, color: '#bc6c82' },
                    { label: 'Bitterness', val: profile.bitterness, color: '#88927f' },
                    { label: 'Roastiness', val: profile.roastiness, color: '#8b5a3e' },
                  ].map((axis) => (
                    <div key={axis.label} className="axis-item">
                      <div className="axis-header">
                        <span>{axis.label}</span>
                        <span className="axis-val">{axis.val.toFixed(1)}/10</span>
                      </div>
                      <div className="axis-track">
                        <div
                          className="axis-fill"
                          style={{
                            width: `${(axis.val / 10) * 100}%`,
                            backgroundColor: axis.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Brewing Ritual Guide */}
            {guide && (
              <div className="modal-brewing-section">
                <h4 className="section-heading">Recommended Brewing Ritual</h4>
                <div className="brewing-tiles">
                  <div className="brew-tile">
                    <span className="brew-icon">🌡️</span>
                    <span className="brew-val">{guide.waterTempC}°C</span>
                    <span className="brew-label">Water Temp</span>
                  </div>
                  <div className="brew-tile">
                    <span className="brew-icon">⏱️</span>
                    <span className="brew-val">{guide.steepSeconds}s</span>
                    <span className="brew-label">Steep Time</span>
                  </div>
                  <div className="brew-tile">
                    <span className="brew-icon">🍃</span>
                    <span className="brew-val">{guide.leafRatioGrams}g</span>
                    <span className="brew-label">Leaf / 100ml</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Row */}
            <div className="modal-action-row">
              <div className="quantity-control">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="qty-btn"
                >
                  −
                </button>
                <span className="qty-display">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="qty-btn"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="btn btn-primary modal-add-btn"
                onClick={handleAdd}
              >
                Add {qty} to Cart • ${(product.price * qty).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
