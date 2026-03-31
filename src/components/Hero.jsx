import '../styles/Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg-glow" />
      <div className="hero__content">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-dot" />
          Live Science Intelligence
        </div>
        <h1 className="hero__title">
          <span className="hero__title-line">Spain Science</span>
          <span className="hero__title-accent">News Explorer</span>
        </h1>
        <p className="hero__desc">
          Discover the latest scientific research and breakthroughs from Spain
          powered by The News API. Choose a query mode below to begin.
        </p>
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-num">7</span>
            <span className="hero__stat-label">Endpoints</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">🇩🇪</span>
            <span className="hero__stat-label">Spain</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">∞</span>
            <span className="hero__stat-label">Science Articles</span>
          </div>
        </div>
      </div>
    </section>
  )
}
