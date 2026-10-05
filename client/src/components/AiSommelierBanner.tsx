import { useState } from 'react'
import type { Product } from '../types/product'

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
      title: 'Clean morning energy without coffee jitters',
      explanation: 'Green teas like Ceremonial Matcha and crisp Sencha give you steady morning focus and a fresh, uplifting start.',
      matchedTeas: products.filter(
        (p) => p.category === 'Matcha' || p.category === 'Sencha'
      ).slice(0, 2),
    },
    afternoon: {
      title: 'A cozy, rich cup for a relaxing break',
      explanation: 'Rich black teas and comforting milk tea blends make the perfect afternoon treat with a splash of warm milk.',
      matchedTeas: products.filter(
        (p) => p.category === 'Milk Tea' || p.category === 'Black Tea'
      ).slice(0, 2),
    },
    evening: {
      title: 'Warm, roasted, and naturally low in caffeine',
      explanation: 'Gently roasted Hojicha and toasted rice Genmaicha are soothing to the stomach and relaxing for the evening.',
      matchedTeas: products.filter(
        (p) => p.category === 'Hojicha' || p.category === 'Genmaicha'
      ).slice(0, 2),
    },
  }

  const currentRecommendation = recommendations[selectedMood]

  return (
    <section className="tea-finder-section">
      <div className="tea-finder-card">
        <div className="tea-finder-prompt-side">
          <div className="tea-finder-tag">
            <i className="bi bi-stars"></i>
            <span>AI Tea Finder</span>
          </div>

          <h2 className="tea-finder-heading">
            Not sure what tea to try first?
          </h2>

          <p className="tea-finder-subtitle">
            Choose what you feel like right now, and our tea guide will pick the best options for your day:
          </p>

          <div className="mood-selection-list">
            <button
              type="button"
              className={`mood-button ${selectedMood === 'morning' ? 'active' : ''}`}
              onClick={() => setSelectedMood('morning')}
            >
              <i className="bi bi-sun mood-icon"></i>
              <div className="mood-button-text">
                <span className="mood-title">Morning Focus</span>
                <span className="mood-sub">Fresh and energizing</span>
              </div>
            </button>

            <button
              type="button"
              className={`mood-button ${selectedMood === 'afternoon' ? 'active' : ''}`}
              onClick={() => setSelectedMood('afternoon')}
            >
              <i className="bi bi-cup-hot mood-icon"></i>
              <div className="mood-button-text">
                <span className="mood-title">Afternoon Cozy</span>
                <span className="mood-sub">Comforting and sweet</span>
              </div>
            </button>

            <button
              type="button"
              className={`mood-button ${selectedMood === 'evening' ? 'active' : ''}`}
              onClick={() => setSelectedMood('evening')}
            >
              <i className="bi bi-moon-stars mood-icon"></i>
              <div className="mood-button-text">
                <span className="mood-title">Evening Wind Down</span>
                <span className="mood-sub">Warm roasted and low caffeine</span>
              </div>
            </button>
          </div>
        </div>

        {/* Result suggestions */}
        <div className="tea-finder-result-side">
          <div className="recommendation-header-box">
            <span className="recommendation-badge">Suggested For You</span>
            <h3 className="recommendation-title">{currentRecommendation.title}</h3>
            <p className="recommendation-explanation">{currentRecommendation.explanation}</p>
          </div>

          <div className="recommended-teas-row">
            {currentRecommendation.matchedTeas.map((tea) => (
              <div
                key={tea.id}
                className="mini-tea-card"
                onClick={() => onSelectProduct(tea)}
                role="button"
                tabIndex={0}
                aria-label={`View ${tea.name}`}
              >
                <img src={tea.imageUrl} alt={tea.name} className="mini-tea-img" />
                <div className="mini-tea-content">
                  <span className="mini-tea-cat">{tea.category}</span>
                  <h4 className="mini-tea-name">{tea.name}</h4>
                  <div className="mini-tea-footer">
                    <span className="mini-tea-price">${tea.price.toFixed(2)}</span>
                    <span className="mini-tea-link">
                      <span>View</span>
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
