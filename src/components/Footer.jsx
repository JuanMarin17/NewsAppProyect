import '../styles/Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__item">
          <span className="footer__label">Institución</span>
          <span className="footer__value">SENA</span>
        </div>
        <div className="footer__sep" />
        <div className="footer__item">
          <span className="footer__label">Desarrollado por</span>
          <span className="footer__value">Juan David Marín</span>
        </div>
        <div className="footer__sep" />
        <div className="footer__item">
          <span className="footer__label">API utilizada</span>
          <a
            className="footer__link"
            href="https://www.thenewsapi.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            thenewsapi.com
          </a>
        </div>
        <div className="footer__sep" />
        <div className="footer__copy">
          © {year} ScienceNews Spain
        </div>
      </div>
    </footer>
  )
}
