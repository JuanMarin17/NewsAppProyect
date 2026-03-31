import '../styles/Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg-glow" />
      <div className="hero__content">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-dot" />
          Inteligencia Científica en Vivo
        </div>
        <h1 className="hero__title">
          <span className="hero__title-line">Spain Science</span>
          <span className="hero__title-accent">News Explorer</span>
        </h1>
        <p className="hero__desc">
          Descubre las últimas investigaciones y avances científicos desde España,
          impulsado por The News API. Elige un modo de consulta para comenzar.
        </p>
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-num">7</span>
            <span className="hero__stat-label">Endpoints</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">🇪🇸</span>
            <span className="hero__stat-label">España</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">∞</span>
            <span className="hero__stat-label">Artículos</span>
          </div>
        </div>
      </div>
    </section>
  )
}
