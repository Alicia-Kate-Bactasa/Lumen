import { useState } from 'react'
import type { Product } from '../types/product'
import { formatPrice } from '../utils/currency'
import { SampaguitaStar, LilyPetal, FloralWatermark } from './FloralIcons'

interface AiSommelierBannerProps {
  products: Product[]
  onSelectProduct: (p: Product) => void
}

type TeaMood = 'morning' | 'afternoon' | 'evening'

export function AiSommelierBanner({ products, onSelectProduct }: AiSommelierBannerProps) {
  const [selectedMood, setSelectedMood] = useState<TeaMood>('morning')

  const recommendations: Record<
    TeaMood,
    { title: string; explanation: string; matchedTeas: Product[] }
  > = {
    morning: {
      title: 'Clean morning energy with floral jasmine notes',
      explanation: 'Vibrant green teas like Ceremonial Matcha and crisp Sencha give you steady morning clarity, smooth focus, and an uplifting start.',
      matchedTeas: products.filter(
        (p) => p.category === 'Matcha' || p.category === 'Sencha'
      ).slice(0, 2),
    },
    afternoon: {
      title: 'A velvety, rich cup with creamy botanical body',
      explanation: 'Rich black teas and comforting milk tea blends make the perfect afternoon treat with a splash of warm oat or fresh milk.',
      matchedTeas: products.filter(
        (p) => p.category === 'Milk Tea' || p.category === 'Black Tea'
      ).slice(0, 2),
    },
    evening: {
      title: 'Warm roasted nuttiness & naturally low caffeine',
      explanation: 'Gently roasted Hojicha and toasted rice Genmaicha are soothing to the stomach and deeply relaxing for evening unwinding.',
      matchedTeas: products.filter(
        (p) => p.category === 'Hojicha' || p.category === 'Genmaicha'
      ).slice(0, 2),
    },
  }

  const currentRecommendation = recommendations[selectedMood]

  return (
    <section className="tea-finder-section">
      <div className="tea-finder-card petal-curved-container">
        <FloralWatermark className="finder-watermark-bg" />

        <div className="tea-finder-prompt-side">
          <div className="botanical-eyebrow">
            <SampaguitaStar size={15} className="badge-flower" />
            <span>AI Sommelier Guide</span>
            <LilyPetal size={15} className="badge-flower" />
          </div>

          <h2 className="tea-finder-heading">
            Not sure what tea to try first?
          </h2>

          <p className="tea-finder-subtitle">
            Select your mood or moment, and our sommelier will pair you with the ideal artisanal brew:
          </p>

          <div className="mood-selection-list">
            <button
              type="button"
              className={`mood-button pill-mood-btn ${selectedMood === 'morning' ? 'active' : ''}`}
              onClick={() => setSelectedMood('morning')}
            >
              <i className="bi bi-sun mood-icon"></i>
              <div className="mood-button-text">
                <span className="mood-title">Morning Focus</span>
                <span className="mood-sub">Fresh matcha and crisp sencha</span>
              </div>
            </button>

            <button
              type="button"
              className={`mood-button pill-mood-btn ${selectedMood === 'afternoon' ? 'active' : ''}`}
              onClick={() => setSelectedMood('afternoon')}
            >
              <i className="bi bi-cup-hot mood-icon"></i>
              <div className="mood-button-text">
                <span className="mood-title">Afternoon Cozy</span>
                <span className="mood-sub">Creamy milk tea and comforting blends</span>
              </div>
            </button>

            <button
              type="button"
              className={`mood-button pill-mood-btn ${selectedMood === 'evening' ? 'active' : ''}`}
              onClick={() => setSelectedMood('evening')}
            >
              <i className="bi bi-moon-stars mood-icon"></i>
              <div className="mood-button-text">
                <span className="mood-title">Evening Wind Down</span>
                <span className="mood-sub">Warm roasted hojicha and genmaicha</span>
              </div>
            </button>
          </div>
        </div>

        {/* Result suggestions */}
        <div className="tea-finder-result-side">
          <div className="recommendation-header-box pill-rec-box">
            <span className="recommendation-badge pill-tag">
              <SampaguitaStar size={13} />
              <span>Recommended Match</span>
            </span>
            <h3 className="recommendation-title">{currentRecommendation.title}</h3>
            <p className="recommendation-explanation">{currentRecommendation.explanation}</p>
          </div>

          <div className="recommended-teas-row">
            {currentRecommendation.matchedTeas.map((tea) => (
              <div
                key={tea.id}
                className="mini-tea-card petal-hover-mini-card"
                onClick={() => onSelectProduct(tea)}
                role="button"
                tabIndex={0}
                aria-label={`View ${tea.name}`}
              >
                <div className="mini-tea-image-frame petal-flared-frame">
                  <img src={tea.imageUrl} alt={tea.name} className="mini-tea-img petal-arch-crop" />
                </div>
                <div className="mini-tea-content">
                  <span className="mini-tea-cat">{tea.category}</span>
                  <h4 className="mini-tea-name">{tea.name}</h4>
                  <div className="mini-tea-footer">
                    <span className="mini-tea-price">{formatPrice(tea.price)}</span>
                    <span className="mini-tea-link">
                      <span>View details</span>
                      <i className="bi bi-arrow-right-short"></i>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
