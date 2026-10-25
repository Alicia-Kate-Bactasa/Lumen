import { useState } from 'react'
import { SampaguitaStar, LilyPetal, FloralWatermark, WaveDivider } from './FloralIcons'

interface ColorSwatchTier {
  id: string
  name: string
  subtitle: string
  hex: string
  badgeText: string
  tastingNotes: string[]
  description: string
  origin: string
}

const BLEND_TIERS: ColorSwatchTier[] = [
  {
    id: 'ceremonial',
    name: 'Master’s Ceremonial',
    subtitle: 'First Flush Uji Harvest',
    hex: '#8FA344',
    badgeText: 'Emerald Whisk Tier',
    tastingNotes: ['Silky umami', 'Natural sweet foam', 'Dewy greens'],
    description: 'Slow granite stone-milled shaded gyokuro leaves yielding an ethereal emerald foam.',
    origin: 'Uji, Kyoto (40m slow milling)',
  },
  {
    id: 'sprout',
    name: 'Morning Sprout Genmaicha',
    subtitle: 'Green Sencha & Toasted Rice',
    hex: '#D8E3B0',
    badgeText: 'Daily Radiance Tier',
    tastingNotes: ['Toasted brown rice', 'Warm grain aroma', 'Crisp finish'],
    description: 'Blended with roasted mochi rice for comforting daytime nourishment and focus.',
    origin: 'Shizuoka Foothills',
  },
  {
    id: 'blush',
    name: 'Lily & Jasmine Botanical',
    subtitle: 'Wild White Petals & Green Tea',
    hex: '#FAD6D5',
    badgeText: 'Floral Bloom Tier',
    tastingNotes: ['Sampaguita blossoms', 'Soft jasmine', 'Honeyed dew'],
    description: 'Naturally scented with night-blooming sampaguita and lily petals for delicate serenity.',
    origin: 'Artisanal Single Farm Harvest',
  },
  {
    id: 'peach',
    name: 'Roasted Golden Hojicha',
    subtitle: 'Slow Ember Roasted',
    hex: '#FCE6C6',
    badgeText: 'Warm Hearth Tier',
    tastingNotes: ['Toasted hazelnut', 'Warm caramel', 'Stomach gentle'],
    description: 'Caramelized over high-heat porcelain pans to remove astringency and lower caffeine.',
    origin: 'Kyoto Ancient Kiln Roast',
  },
]

export function AtelierPhilosophy() {
  const [activeTier, setActiveTier] = useState<string>('ceremonial')

  return (
    <section className="atelier-wave-section" aria-label="The Atelier Philosophy">
      <div className="atelier-peach-body tactile-paper-texture">
        <FloralWatermark className="atelier-watermark-left" />
        <FloralWatermark className="atelier-watermark-right" />

        <div className="atelier-inner-content">
          {/* Section Heading & Philosophy Intro */}
          <div className="atelier-header-block">
            <div className="botanical-eyebrow">
              <SampaguitaStar size={15} className="badge-flower" />
              <span>The Atelier Philosophy</span>
              <LilyPetal size={15} className="badge-flower" />
            </div>

            <h2 className="section-main-heading">Whimsical Mastery in Every Whisk</h2>

            <p className="section-description">
              We reject industrial shortcuts. Guided by botanical mindfulness, each harvest is slow-stone ground in micro-batches with organic care, gentle patience, and zero artificial additions.
            </p>

            {/* Philosophy Bullet Values with 1px floral motifs */}
            <div className="philosophy-values-row">
              <div className="value-pill-item">
                <div className="value-icon-circle">
                  <SampaguitaStar size={14} />
                </div>
                <div className="value-text">
                  <span className="value-title">Single-Origin Terroir</span>
                  <span className="value-desc">Shaded volcanic soil farms</span>
                </div>
              </div>

              <div className="value-pill-item">
                <div className="value-icon-circle">
                  <LilyPetal size={14} />
                </div>
                <div className="value-text">
                  <span className="value-title">Slow Stone-Milling</span>
                  <span className="value-desc">Only 30g ground per hour</span>
                </div>
              </div>

              <div className="value-pill-item">
                <div className="value-icon-circle">
                  <SampaguitaStar size={14} />
                </div>
                <div className="value-text">
                  <span className="value-title">Botanical Purity</span>
                  <span className="value-desc">Zero sugar, dairy or fillers</span>
                </div>
              </div>
            </div>
          </div>

          {/* The Unique Twist: Vertical Color-Swatch Style Feature Cards & Interlocking Pills */}
          <div className="swatches-interactive-wrap">
            <div className="swatches-grid">
              {BLEND_TIERS.map((tier) => {
                const isActive = activeTier === tier.id
                return (
                  <div
                    key={tier.id}
                    className={`color-swatch-card ${isActive ? 'active-swatch' : ''}`}
                    onClick={() => setActiveTier(tier.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Select ${tier.name}`}
                  >
                    {/* Top Color Cap Swatch */}
                    <div
                      className="swatch-color-pill"
                      style={{ backgroundColor: tier.hex }}
                    >
                      <span className="swatch-badge-tag">{tier.badgeText}</span>
                    </div>

                    {/* Card Content */}
                    <div className="swatch-card-body">
                      <div className="swatch-title-wrap">
                        <SampaguitaStar size={12} className="swatch-star" />
                        <h4 className="swatch-name">{tier.name}</h4>
                      </div>
                      <span className="swatch-subtitle">{tier.subtitle}</span>

                      <p className="swatch-desc">{tier.description}</p>

                      {/* Tasting Note Pills */}
                      <div className="swatch-notes-row">
                        {tier.tastingNotes.map((note) => (
                          <span key={note} className="swatch-note-pill">
                            <LilyPetal size={10} className="note-petal" />
                            <span>{note}</span>
                          </span>
                        ))}
                      </div>

                      <div className="swatch-footer-meta">
                        <span className="swatch-origin">{tier.origin}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Deep Wavy Curve Transition into Creamy Off-White Catalog */}
      <WaveDivider colorClass="fill-offwhite" />
    </section>
  )
}
