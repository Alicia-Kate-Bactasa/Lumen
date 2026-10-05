const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Brand column */}
        <div className="footer-col brand-col">
          <span className="footer-brand">Lumen Tea</span>
          <p className="footer-about">
            We source fresh, honest teas directly from family farms in Japan.
            No artificial additives, no complicated rituals — just pure, delicious tea.
          </p>
          <div className="footer-friendly-quote">
            Good tea should be simple to enjoy every day.
          </div>
        </div>

        {/* Categories */}
        <div className="footer-col">
          <h4 className="footer-title">Explore Teas</h4>
          <ul className="footer-nav-list">
            <li><a href="#matcha">Ceremonial Matcha</a></li>
            <li><a href="#hojicha">Roasted Hojicha</a></li>
            <li><a href="#genmaicha">Toasted Rice Genmaicha</a></li>
            <li><a href="#sencha">Spring Sencha</a></li>
            <li><a href="#blacktea">Honey Black Tea</a></li>
            <li><a href="#milktea">Creamy Milk Tea</a></li>
          </ul>
        </div>

        {/* Guides */}
        <div className="footer-col">
          <h4 className="footer-title">Simple Guides</h4>
          <ul className="footer-nav-list">
            <li><a href="#brewing">Beginner Brewing Tips</a></li>
            <li><a href="#finder">AI Tea Finder</a></li>
            <li><a href="#caffeine">Caffeine Guide</a></li>
            <li><a href="#storage">Keeping Tea Fresh</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-col newsletter-col">
          <h4 className="footer-title">Tea Notes in Your Inbox</h4>
          <p className="footer-newsletter-text">
            Get friendly brewing tips, new harvest updates, and seasonal recommendations.
          </p>
          <form
            className="footer-form"
            onSubmit={(e) => {
              e.preventDefault()
              alert('Thank you for subscribing to our tea notes!')
            }}
          >
            <input
              type="email"
              placeholder="Your email address..."
              className="footer-email-input"
              required
            />
            <button type="submit" className="footer-submit-btn">
              <span>Sign Up</span>
              <i className="bi bi-arrow-right-short"></i>
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="footer-copyright">
          © {CURRENT_YEAR} Lumen Tea. Simple teas for everyday moments.
        </div>
        <div className="footer-tech-attribution">
          Powered by ASP.NET Core 10 and React 19
        </div>
      </div>
    </footer>
  )
}
