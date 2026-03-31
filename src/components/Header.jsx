import { LANGUAGES } from '../services/endpoints'
import '../styles/Header.css'

export default function Header({ language, onLanguageChange }) {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__logo">
          <div className="header__logo-mark">⚛</div>
          <div>
            <div className="header__logo-text">ScienceNews</div>
            <div className="header__logo-sub">España</div>
          </div>
        </div>
        <div className="header__right">
          <select
            className="header__lang-select"
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            aria-label="Idioma de las noticias"
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.flag} {l.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  )
}
