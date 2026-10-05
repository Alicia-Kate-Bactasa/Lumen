interface HeroProps {
  onBrowseTeas: () => void
  onOpenTeaFinder: () => void
}

export function Hero({ onBrowseTeas, onOpenTeaFinder }: HeroProps) {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <span className="hero-badge">Welcome to Lumen Tea</span>
        <h1 className="hero-heading">
          Find your favorite cup of tea
        </h1>
        <p className="hero-text">
          Whether you enjoy a warm roasted Hojicha, an energizing morning Matcha, or a comforting milk tea, we make it simple to choose and brew good tea at home.
        </p>

        <div className="hero-button-group">
          <button
            type="button"
            className="primary-button"
            onClick={onBrowseTeas}
          >
            <span>Browse All Teas</span>
            <i className="bi bi-arrow-right"></i>
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={onOpenTeaFinder}
          >
            <i className="bi bi-stars"></i>
            <span>Help Me Choose</span>
          </button>
        </div>

        <div className="hero-features-list">
          <div className="hero-feature-item">
            <i className="bi bi-cup-hot feature-icon"></i>
            <span className="feature-title">Easy to Brew</span>
            <span className="feature-desc">Simple guides with each tea</span>
          </div>
          <div className="hero-feature-item">
            <i className="bi bi-leaf feature-icon"></i>
            <span className="feature-title">Pure Whole Leaves</span>
            <span className="feature-desc">Naturally fresh and clean</span>
          </div>
          <div className="hero-feature-item">
            <i className="bi bi-heart feature-icon"></i>
            <span className="feature-title">Comforting Taste</span>
            <span className="feature-desc">Smooth and never harsh</span>
          </div>
        </div>
      </div>
    </section>
  )
}
