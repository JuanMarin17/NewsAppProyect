import { useState } from 'react'
import '../styles/ArticleCard.css'

function formatDate(str) {
  if (!str) return ''
  try {
    return new Date(str).toLocaleDateString('es-ES', {
      day: 'numeric', month: 'short', year: 'numeric',
    })
  } catch {
    return str
  }
}

export default function ArticleCard({ article, accent, index }) {
  const [imgError, setImgError] = useState(false)

  return (
    <article className="article-card" style={{ animationDelay: `${index * 0.05}s` }}>
      <div className="article-card__image-wrap">
        {article.image_url && !imgError ? (
          <img
            className="article-card__image"
            src={article.image_url}
            alt={article.title}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="article-card__placeholder">⚗</div>
        )}
        <span className="article-card__category-pill">ciencia · es</span>
      </div>

      <div className="article-card__body">
        <div className="article-card__meta">
          <span className="article-card__source" style={{ color: accent }}>
            {article.source || 'Desconocido'}
          </span>
          <span className="article-card__sep" />
          <span className="article-card__date">{formatDate(article.published_at)}</span>
        </div>

        <h3 className="article-card__title">{article.title}</h3>

        {article.description && (
          <p className="article-card__desc">{article.description}</p>
        )}

        <a
          className="article-card__link"
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: accent }}
        >
          Leer artículo →
        </a>
      </div>
    </article>
  )
}
