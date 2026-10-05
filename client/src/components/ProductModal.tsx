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
  const [quantity, setQuantity] = useState(1)

  if (!product) return null

  const { tasteProfile, brewingGuide } = product

  const handleAdd = () => {
    onAddToCart(product, quantity)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-tea-title"
      >
        <button
          type="button"
          className="modal-close-button"
          onClick={onClose}
          aria-label="Close details"
        >
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="modal-layout">
          {/* Image */}
          <div className="modal-image-column">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="modal-tea-image"
            />
            <div className="modal-category-tag">
              <span>{product.category}</span>
              <span>Caffeine: {product.caffeineLevel}</span>
            </div>
          </div>

          {/* Details */}
          <div className="modal-info-column">
            <div className="modal-header-block">
              <span className="modal-eyebrow">{product.category}</span>
              <h2 id="modal-tea-title" className="modal-tea-name">
                {product.name}
              </h2>
              <div className="modal-price-display">
                ${product.price.toFixed(2)}
                <span className="modal-price-note"> / sealed fresh tin</span>
              </div>
            </div>

            <p className="modal-tea-description">
              {product.description}
            </p>

            {/* Brewing Guide */}
            <div className="modal-section-card">
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
                <i className="bi bi-lightbulb brew-tip-icon"></i>
                <p className="brew-tip-text">{brewingGuide.simpleTip}</p>
              </div>
            </div>

            {/* Taste Profile Bars */}
            <div className="modal-section-card">
              <h4 className="modal-section-title">
                <i className="bi bi-sliders"></i>
                <span>What it tastes like</span>
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
              <div className="quantity-stepper-box">
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
                className="add-to-cart-action-btn"
                onClick={handleAdd}
              >
                <i className="bi bi-bag-check"></i>
                <span>Add to Cart — ${(product.price * quantity).toFixed(2)}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
