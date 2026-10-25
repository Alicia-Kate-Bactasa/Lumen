import { useState } from 'react'
import { SampaguitaStar, FloralWatermark } from './FloralIcons'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="site-footer">
      {/* Wide Soft Upward-Curved Dome Transition */}
      <div className="footer-dome-transition" aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className="footer-dome-svg">
          <path
            d="M0,80 C360,10 1080,10 1440,80 L1440,80 L0,80 Z"
            fill="#FFFDF9"
          />
        </svg>
      </div>

      <div className="footer-cream-base">
        <FloralWatermark className="footer-watermark-bg" />

        <div className="footer-container">
          {/* Brand column */}
          <div className="footer-col brand-col">
            <div className="footer-brand-lockup">
              <SampaguitaStar size={20} className="footer-brand-flower" />
              <span className="footer-brand">Lumen Tea</span>
            </div>
            <p className="footer-about">
              Modern artisanal matcha and honest botanical teas sourced from family-run farms in Uji and Shizuoka. Pure, organic luxury designed for daily mindful wellness.
            </p>
            <div className="footer-friendly-quote">
              Every leaf whisked with intention, simplicity, and calm.
            </div>
          </div>

          {/* Categories */}
          <div className="footer-col">
            <h4 className="footer-title">Botanical Harvest</h4>
            <ul className="footer-nav-list">
              <li><a href="#matcha">Ceremonial Uji Matcha</a></li>
              <li><a href="#hojicha">Roasted Hojicha</a></li>
              <li><a href="#genmaicha">Toasted Rice Genmaicha</a></li>
              <li><a href="#sencha">First Flush Spring Sencha</a></li>
              <li><a href="#blacktea">Wild Honey Black Tea</a></li>
              <li><a href="#milktea">Creamy Botanical Milk Tea</a></li>
            </ul>
          </div>

          {/* Guides */}
          <div className="footer-col">
            <h4 className="footer-title">Mindful Brewing</h4>
            <ul className="footer-nav-list">
              <li><a href="#whisking">Artisanal Whisking Guide</a></li>
              <li><a href="#sommelier">AI Tea Finder</a></li>
              <li><a href="#caffeine">Sensory Caffeine Guide</a></li>
              <li><a href="#freshness">Preserving Fresh Aroma</a></li>
            </ul>
          </div>

          {/* Newsletter with Pill-Shaped Input & Exact Requested Button */}
          <div className="footer-col newsletter-col">
            <h4 className="footer-title">Tea Notes in Your Inbox</h4>
            <p className="footer-newsletter-text">
              Receive seasonal harvest announcements, mindful tea brewing tips, and fresh batch releases.
            </p>

            {subscribed ? (
              <div className="newsletter-success-pill">
                <SampaguitaStar size={15} />
                <span>Thank you for joining our tea community!</span>
              </div>
            ) : (
              <form className="footer-form pill-newsletter-form" onSubmit={handleSubscribe}>
                <div className="pill-input-wrap">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="footer-email-input pill-input"
                    required
                  />
                  <button type="submit" className="footer-submit-btn pill-submit-btn glow-cta-btn" aria-label="Subscribe">
                    <span>Ready to Glow? Grab Our Matcha Guide</span>
                    <i className="bi bi-arrow-right-short"></i>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © {CURRENT_YEAR} Lumen Tea. Artisanal Matcha & Botanical Harvest.
          </div>
          <div className="footer-tech-attribution">
            Organic luxury &bull; Simple everyday rituals
          </div>
        </div>
      </div>
    </footer>
  )
}
