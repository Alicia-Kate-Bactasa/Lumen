const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="lumen-footer">
      <div className="footer-top">
        <div className="footer-brand-col">
          <span className="footer-logo">LUMEN</span>
          <p className="footer-ethos">
            Dedicated to single-origin cultivars, biodynamic shade farming, and preserving sacred tea traditions through modern sensory science.
          </p>
          <div className="footer-quote">
            “Tea is quiet, and our modern world is full of noise.”
          </div>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-heading">Collections</h4>
          <ul>
            <li><a href="#matcha">Ceremonial Matcha</a></li>
            <li><a href="#gyokuro">Single-Estate Gyokuro</a></li>
            <li><a href="#sencha">High Mountain Sencha</a></li>
            <li><a href="#oolong">Charcoal-Roasted Oolong</a></li>
            <li><a href="#teaware">Artisan Chawan Teaware</a></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-heading">Sensory Tech</h4>
          <ul>
            <li><a href="#sommelier">AI Flavor Sommelier</a></li>
            <li><a href="#radar">6-Axis Flavor Taxonomy</a></li>
            <li><a href="#terroir">Terroir Traceability</a></li>
            <li><a href="#brewing">Brewing Temperature Science</a></li>
          </ul>
        </div>

        <div className="footer-subscribe-col">
          <h4 className="footer-heading">The Harvest Gazette</h4>
          <p className="subscribe-desc">
            Receive private allocations of First Flush Shincha and seasonal micro-lot harvests.
          </p>
          <form className="subscribe-form" onSubmit={(e) => { e.preventDefault(); alert('Subscribed to Harvest Gazette!') }}>
            <input
              type="email"
              placeholder="Enter your email..."
              className="subscribe-input"
              required
            />
            <button type="submit" className="subscribe-btn">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copy">
          © {CURRENT_YEAR} Lumen Tea & Botanicals. All rights reserved.
        </div>
        <div className="footer-tech-stack">
          Engineered with <strong>ASP.NET Core 10</strong>, <strong>React 19</strong>, <strong>EF Core</strong> & <strong>AI Embeddings</strong>
        </div>
      </div>
    </footer>
  )
}
