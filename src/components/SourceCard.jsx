import '../styles/SourceCard.css'

export default function SourceCard({ source, index }) {
  return (
    <div className="source-card" style={{ animationDelay: `${index * 0.04}s` }}>
      <div className="source-card__name">{source.name || source.domain}</div>
      <div className="source-card__domain">{source.domain}</div>
      <div className="source-card__tags">
        {source.language && <span className="source-card__tag">{source.language}</span>}
        {source.country && <span className="source-card__tag">{source.country}</span>}
        {source.categories?.map((c) => (
          <span key={c} className="source-card__tag">{c}</span>
        ))}
      </div>
    </div>
  )
}
