import { useState } from 'react'
import type { Product } from '../types/product'

interface AiSommelierBannerProps {
  products: Product[]
  onSelectProduct: (p: Product) => void
}

export function AiSommelierBanner({ products, onSelectProduct }: AiSommelierBannerProps) {
  const [activeMood, setActiveMood] = useState<'morning-focus' | 'afternoon-zen' | 'evening-unwind'>('morning-focus')

  // Simple heuristic recommendation for the preview
  const recommendations = {
    'morning-focus': {
      title: 'Vibrant Green Energy & L-Theanine Focus',
      description: 'High umami, shade-grown chlorophyl rich teas designed to enhance cognitive clarity without jittery spikes.',
      matchedTeas: products.filter(
        (p) => p.category === 'Matcha' || (p.flavorProfile && p.flavorProfile.umami >= 7)
      ).slice(0, 2),
    },
    'afternoon-zen': {
      title: 'Harmonious Mineral Sweetness',
      description: 'Complex oolongs and lightly oxidized leaves that reveal developing floral notes through multiple infusions.',
      matchedTeas: products.filter(
        (p) => p.category === 'Oolong' || (p.flavorProfile && p.flavorProfile.floral >= 6)
      ).slice(0, 2),
    },
    'evening-unwind': {
      title: 'Toasted Calming Botanicals & Low Caffeine',
      description: 'Slow-roasted charcoal leaves and soothing jasmine tips that ground the nervous system for restorative sleep.',
      matchedTeas: products.filter(
        (p) => (p.flavorProfile && p.flavorProfile.roastiness >= 7) || p.category === 'Herbal'
      ).slice(0, 2),
    },
  }

  const currentMatch = recommendations[activeMood]

  return (
    <section className="sommelier-banner-section">
      <div className="sommelier-card">
        <div className="sommelier-header">
          <div className="sommelier-badge">
            <span className="badge-sparkle">✨</span>
            <span>AI Flavor Sommelier Engine</span>
          </div>
          <h2 className="sommelier-title">
            Intelligent Palate Pairing
          </h2>
          <p className="sommelier-desc">
            Our recommendation model computes multi-dimensional vector distances between your flavor aspirations and our tea harvest analytics. Select your ritual intention below:
          </p>

          <div className="mood-pills">
            <button
              type="button"
              className={`mood-pill ${activeMood === 'morning-focus' ? 'active' : ''}`}
              onClick={() => setActiveMood('morning-focus')}
            >
              🌅 Morning Clarity & Focus
            </button>
            <button
              type="button"
              className={`mood-pill ${activeMood === 'afternoon-zen' ? 'active' : ''}`}
              onClick={() => setActiveMood('afternoon-zen')}
            >
              🍃 Midday Contemplation
            </button>
            <button
              type="button"
              className={`mood-pill ${activeMood === 'evening-unwind' ? 'active' : ''}`}
              onClick={() => setActiveMood('evening-unwind')}
            >
              🌙 Evening Soothing & Low Caffeine
            </button>
          </div>
        </div>

        <div className="sommelier-result-box">
          <div className="result-narrative">
            <span className="analysis-tag">Sommelier Tasting Analysis</span>
            <h3 className="narrative-heading">{currentMatch.title}</h3>
            <p className="narrative-body">{currentMatch.description}</p>
          </div>

          <div className="matched-products-row">
            {currentMatch.matchedTeas.map((tea) => (
              <div
                key={tea.id}
                className="match-mini-card"
                onClick={() => onSelectProduct(tea)}
              >
                <img src={tea.imageUrl} alt={tea.name} className="mini-card-img" />
                <div className="mini-card-info">
                  <span className="mini-category">{tea.category}</span>
                  <h4 className="mini-title">{tea.name}</h4>
                  <div className="mini-meta">
                    <span className="mini-price">${tea.price.toFixed(2)}</span>
                    <span className="mini-view">Inspect Profile →</span>
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
