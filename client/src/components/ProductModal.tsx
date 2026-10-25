import { useState } from 'react'
import type { Product } from '../types/product'
import { formatPrice } from '../utils/currency'
import { SampaguitaStar, PetalBadgeIcon, FloralWatermark } from './FloralIcons'

interface ProductModalProps {
  product: Product | null
  onClose: () => void
  onAddToCart: (product: Product, quantity: number) => void
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)

  if (!product) return null

  const handleAdd = () => {
    onAddToCart(product, quantity)
    setQuantity(1)
    onClose()
  }

  const brewingGuide = product.brewingGuide || {
    waterTempC: 80,
    steepMinutes: 1,
    amountTsp: 1,
    simpleTip: 'Steep gently in fresh warm water for the best flavor.',
  }

  const tasteProfile = product.tasteProfile || {
    sweetness: 6,
    richness: 6,
    freshness: 7,
    toasted: 3,
    floral: 4,
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card petal-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-tea-title"
      >
        <FloralWatermark className="modal-watermark-bg" />

        <button
          type="button"
          className="modal-close-button pill-close-btn"
          onClick={onClose}
          aria-label="Close details"
        >
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="modal-layout">
          {/* Image Column with Petal Flared Arch & Soft Radial Glow */}
          <div className="modal-image-column">
            <div className="modal-image-petal-wrap">
              <div className="modal-soft-radial-glow" aria-hidden="true" />
              <img
                src={product.imageUrl}
                alt={product.name}
                className="modal-tea-image petal-arch-crop"
              />
            </div>
            <div className="modal-category-tag pill-tag">
              <SampaguitaStar size={13} className="tag-flower" />
              <span>{product.category}</span>
              <span className="dot-divider">&bull;</span>
              <span>{product.caffeineLevel} Caffeine</span>
            </div>
          </div>

          {/* Details */}
          <div className="modal-info-column">
            <div className="modal-header-block">
              <span className="modal-eyebrow">{product.category} Botanical Harvest</span>
              <h2 id="modal-tea-title" className="modal-tea-name">
                {product.name}
              </h2>
              <div className="modal-price-display">
                {formatPrice(product.price)}
                <span className="modal-price-note"> / sealed fresh tin</span>
              </div>
            </div>

            <p className="modal-tea-description">
              {product.description}
            </p>

            {/* Fragrance & Flavor Badges */}
            <div className="modal-taste-badges">
              {product.tasteNotes.map((note) => (
                <span key={note} className="taste-tag petal-pill-badge">
                  <PetalBadgeIcon size={12} className="tag-petal-icon" />
                  <span>{note}</span>
                </span>
              ))}
            </div>

            {/* Brewing Guide */}
            <div className="modal-section-card pill-curved-card">
              <h4 className="modal-section-title">
                <i className="bi bi-cup-hot"></i>
                <span>How to brew this tea</span>
              </h4>
              <div className="brewing-stats-grid">
                <div className="brew-stat-box">
                  <i className="bi bi-thermometer-half brew-stat-icon"></i>
                  <span className="brew-stat-val">{brewingGuide.waterTempC}°C</span>
                  <span className="brew-stat-label">Water Temp</span>
                </div>
                <div className="brew-stat-box">
                  <i className="bi bi-stopwatch brew-stat-icon"></i>
                  <span className="brew-stat-val">
                    {brewingGuide.steepMinutes} {brewingGuide.steepMinutes === 1 ? 'min' : 'mins'}
                  </span>
                  <span className="brew-stat-label">Steep Time</span>
                </div>
                <div className="brew-stat-box">
                  <i className="bi bi-cup brew-stat-icon"></i>
                  <span className="brew-stat-val">{brewingGuide.amountTsp} tsp</span>
                  <span className="brew-stat-label">Per Cup</span>
                </div>
              </div>
              <div className="brew-tip-box">
                <SampaguitaStar size={15} className="brew-tip-icon" />
                <p className="brew-tip-text">{brewingGuide.simpleTip}</p>
              </div>
            </div>

            {/* Taste Profile Bars */}
            <div className="modal-section-card pill-curved-card">
              <h4 className="modal-section-title">
                <i className="bi bi-sliders"></i>
                <span>Sensory & Flavor Profile</span>
              </h4>
              <div className="taste-meter-grid">
                {[
                  { label: 'Sweetness', val: tasteProfile.sweetness },
                  { label: 'Rich & Smooth', val: tasteProfile.richness },
                  { label: 'Fresh & Crisp', val: tasteProfile.freshness },
                  { label: 'Toasted / Warm', val: tasteProfile.toasted },
                  { label: 'Floral Aroma', val: tasteProfile.floral },
                ].map((item) => (
                  <div key={item.label} className="taste-meter-item">
                    <div className="taste-meter-header">
                      <span>{item.label}</span>
                      <span className="taste-meter-num">{item.val}/10</span>
                    </div>
                    <div className="taste-meter-track">
                      <div
                        className="taste-meter-fill"
                        style={{ width: `${(item.val / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Row */}
            <div className="modal-actions-bar">
              <div className="quantity-stepper-box pill-stepper">
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease amount"
                >
                  <i className="bi bi-dash"></i>
                </button>
                <span className="step-count">{quantity}</span>
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase amount"
                >
                  <i className="bi bi-plus"></i>
                </button>
              </div>

              <button
                type="button"
                className="add-to-cart-action-btn pill-btn"
                onClick={handleAdd}
              >
                <i className="bi bi-bag-check"></i>
                <span>Add to Cart — {formatPrice(product.price * quantity)}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
