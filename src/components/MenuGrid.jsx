import { ENDPOINTS } from '../services/endpoints'
import '../styles/Menu.css'

export default function MenuGrid({ activeId, onSelect }) {
  return (
    <section className="menu">
      <div className="menu__inner">
        <div className="menu__label">— Select query type</div>
        <div className="menu__grid">
          {ENDPOINTS.map((ep, i) => (
            <div
              key={ep.id}
              className={`menu-card${activeId === ep.id ? ' menu-card--active' : ''}`}
              style={{
                '--card-accent': ep.accent,
                animationDelay: `${i * 0.06}s`,
              }}
              onClick={() => onSelect(ep.id)}
            >
              <span className="menu-card__icon">{ep.icon}</span>
              <div className="menu-card__title">{ep.label}</div>
              <div className="menu-card__desc">{ep.description}</div>
              <div className="menu-card__corner">EP {String(i + 1).padStart(2, '0')}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
