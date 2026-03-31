import '../styles/Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__logo">
          <div className="header__logo-mark">⚛</div>
          <div>
            <div className="header__logo-text">ScienceNews</div>
            <div className="header__logo-sub">Spain</div>
          </div>
        </div>
        <div className="header__right">
          <span className="header__tag">🇩🇪 ES · Science · ES</span>
        </div>
      </div>
    </header>
  )
}
