import { SampaguitaStar, LilyPetal, WaveDivider, FloralWatermark } from './FloralIcons'

interface HeroProps {
  onBrowseTeas: () => void
  onOpenTeaFinder: () => void
}

const CEREMONIAL_MATCHA_HERO_IMG = 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80'

export function Hero({ onBrowseTeas, onOpenTeaFinder }: HeroProps) {
  return (
    <section className="hero-section">
      <FloralWatermark className="hero-watermark-left" />
      <FloralWatermark className="hero-watermark-right" />

      <div className="hero-container">
        <div className="hero-grid">
          {/* Left Column: Text & Whimsical CTAs */}
          <div className="hero-content">
            <div className="botanical-eyebrow">
              <SampaguitaStar size={15} className="badge-flower" />
              <span>Artisanal Japanese Harvest</span>
              <LilyPetal size={15} className="badge-flower" />
            </div>

            <h1 className="hero-heading">
              Organic luxury in every whisked petal
            </h1>

            <p className="hero-text">
              Ceremonial-grade Uji matcha and artisanal botanicals with delicate lily undertones and creamy umami. Crafted for calm mornings, mindful focus, and pure daily rituals.
            </p>

            <div className="hero-button-group">
              <button
                type="button"
                className="primary-button hero-cta"
                onClick={onBrowseTeas}
              >
                <span>Explore The Collection</span>
                <i className="bi bi-arrow-right"></i>
              </button>
              <button
                type="button"
                className="secondary-button hero-finder-btn"
                onClick={onOpenTeaFinder}
              >
                <SampaguitaStar size={15} />
                <span>Tea Sommelier Finder</span>
              </button>
            </div>

            {/* Pill-shaped Feature Cards Grid with Sampaguita Icons */}
            <div className="hero-feature-grid">
              <div className="feature-pill-card">
                <div className="feature-icon-circle">
                  <SampaguitaStar size={14} />
                </div>
                <div className="feature-text-block">
                  <span className="feature-title">Stone-Ground Wholesomeness</span>
                  <span className="feature-desc">Shaded leaves milled to silky perfection</span>
                </div>
              </div>

              <div className="feature-pill-card">
                <div className="feature-icon-circle">
                  <LilyPetal size={14} />
                </div>
                <div className="feature-text-block">
                  <span className="feature-title">Floral Jasmine & Sampaguita Notes</span>
                  <span className="feature-desc">Naturally sweet, smooth, and never bitter</span>
                </div>
              </div>

              <div className="feature-pill-card">
                <div className="feature-icon-circle">
                  <SampaguitaStar size={14} />
                </div>
                <div className="feature-text-block">
                  <span className="feature-title">Clean Sustained Energy</span>
                  <span className="feature-desc">Gentle L-theanine without caffeine crashes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Whisked Matcha Bowl in Custom Floral Scalloped Image Frame with Floating Petals */}
          <div className="hero-visual-column">
            <div className="petal-frame-glow-wrapper">
              <div className="petal-radial-glow" aria-hidden="true" />

              {/* Floating Petal Accents */}
              <div className="hero-floating-petal petal-pos-1" aria-hidden="true">
                <SampaguitaStar size={22} />
              </div>
              <div className="hero-floating-petal petal-pos-2" aria-hidden="true">
                <LilyPetal size={24} />
              </div>
              <div className="hero-floating-petal petal-pos-3" aria-hidden="true">
                <SampaguitaStar size={18} />
              </div>

              {/* Floral Multi-Lobed Scalloped Frame */}
              <div className="petal-arch-frame floral-scalloped-mask">
                <img
                  src={CEREMONIAL_MATCHA_HERO_IMG}
                  alt="Ceremonial Matcha in handcrafted ceramic chawan bowl with vibrant emerald foam and bamboo chasen whisk"
                  className="hero-matcha-img"
                  loading="eager"
                  onError={(e) => {
                    const target = e.currentTarget
                    target.onerror = null
                    target.src = 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=1000&q=80'
                  }}
                />
              </div>

              {/* Floating Petal Badge */}
              <div className="floating-petal-badge">
                <SampaguitaStar size={15} className="floating-star" />
                <div className="floating-badge-text">
                  <span className="floating-title">1st Flush Ceremonial</span>
                  <span className="floating-subtitle">100% Organic Uji Harvest</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Organic Wavy Curve Transition into Peach Atelier */}
      <WaveDivider colorClass="fill-peach" />
    </section>
  )
}
