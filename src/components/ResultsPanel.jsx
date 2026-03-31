import { useState, useEffect } from 'react'
import { ENDPOINTS } from '../services/endpoints'
import { useNewsQuery } from '../hooks/useNewsQuery'
import ArticleCard from './ArticleCard'
import SourceCard from './SourceCard'
import Loader from './Loader'
import ErrorBox from './ErrorBox'
import '../styles/Panel.css'

export default function ResultsPanel({ endpointId }) {
  const ep = ENDPOINTS.find((e) => e.id === endpointId)
  const { data, loading, error, execute } = useNewsQuery()

  const [query, setQuery] = useState('')
  const [dateAfter, setDateAfter] = useState('')
  const [dateBefore, setDateBefore] = useState('')

  useEffect(() => {
    setQuery('')
    setDateAfter('')
    setDateBefore('')
    if (ep?.type === 'auto') {
      execute(endpointId)
    }
  }, [endpointId])

  const handleFetch = () => {
    execute(endpointId, { query, dateAfter, dateBefore })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleFetch()
  }

  if (!ep) return null

  const articles = data?.data || []
  const meta = data?.meta

  return (
    <section className="panel">
      <div className="panel__inner">
        <div className="panel__divider" />

        <div className="panel__header">
          <div>
            <h2 className="panel__title">{ep.label}</h2>
            <div className="panel__endpoint">{ep.endpointLabel}</div>
          </div>
          {meta && (
            <span className="panel__count" style={{ color: ep.accent, borderColor: ep.accent }}>
              {meta.found ?? articles.length} results
            </span>
          )}
        </div>

        {ep.type === 'search' && (
          <div className="panel__controls">
            <input
              className="panel__input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={ep.inputPlaceholder}
            />
            <button
              className="panel__btn"
              style={{
                background: `color-mix(in srgb, ${ep.accent} 15%, transparent)`,
                border: `1px solid color-mix(in srgb, ${ep.accent} 40%, transparent)`,
                color: ep.accent,
              }}
              onClick={handleFetch}
            >
              Fetch →
            </button>
          </div>
        )}

        {ep.type === 'date' && (
          <div className="panel__controls">
            <input
              type="date"
              className="panel__input panel__input--date"
              value={dateAfter}
              onChange={(e) => setDateAfter(e.target.value)}
            />
            <input
              type="date"
              className="panel__input panel__input--date"
              value={dateBefore}
              onChange={(e) => setDateBefore(e.target.value)}
            />
            <button
              className="panel__btn"
              style={{
                background: `color-mix(in srgb, ${ep.accent} 15%, transparent)`,
                border: `1px solid color-mix(in srgb, ${ep.accent} 40%, transparent)`,
                color: ep.accent,
              }}
              onClick={handleFetch}
            >
              Fetch →
            </button>
          </div>
        )}

        {loading && <Loader />}
        {error && <ErrorBox message={error} />}

        {!loading && !error && data && (
          <>
            {ep.isSources ? (
              articles.length > 0 ? (
                <div className="sources-grid">
                  {articles.map((src, i) => (
                    <SourceCard key={src.domain || i} source={src} index={i} />
                  ))}
                </div>
              ) : (
                <div className="panel__empty">No sources found.</div>
              )
            ) : articles.length > 0 ? (
              <div className="articles-grid">
                {articles.map((a, i) => (
                  <ArticleCard key={a.uuid || i} article={a} accent={ep.accent} index={i} />
                ))}
              </div>
            ) : (
              <div className="panel__empty">No articles found for this query.</div>
            )}
          </>
        )}

        {!loading && !error && !data && (ep.type === 'search' || ep.type === 'date') && (
          <div className="panel__empty">Fill in the fields above and press Fetch →</div>
        )}
      </div>
    </section>
  )
}
