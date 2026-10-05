interface HeroProps {
  onScrollToCatalog: () => void
  onOpenSommelier: () => void
}

export function Hero({ onScrollToCatalog, onOpenSommelier }: HeroProps) {
  return (
    <section className="lumen-hero">
      <div className="hero-content">
        <span className="hero-tagline">Single-Origin • Micro-Lot • AI-Curated</span>
        <h1 className="hero-title">
          Artisanal Teas Matched to Your Unique Palate
        </h1>
        <p className="hero-description">
          Experience ceremonial matchas and wild-mountain harvests directly from
          generational growers in Kyoto, Shizuoka, and Wuyi. Decode your flavor
          profile with our intelligent sommelier.
        </p>

        <div className="hero-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={onScrollToCatalog}
          >
            Explore Collection
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={onOpenSommelier}
          >
            <span>Match My Flavor Profile</span>
            <span className="sparkle-icon">✨</span>
          </button>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Direct Farm Traceability</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">6-Axis</span>
            <span className="stat-label">Flavor Profiling</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">Sub-70°C</span>
            <span className="stat-label">Shade-Grown Mastery</span>
          </div>
        </div>
      </div>
    </section>
  )
}
