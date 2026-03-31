import '../styles/Loader.css'

export default function ErrorBox({ message }) {
  return (
    <div className="error-box">
      <div className="error-box__title">⚠ Error</div>
      <div className="error-box__msg">{message}</div>
      <div className="error-box__hint">
        Asegúrate de que tu token de API esté configurado en <strong>src/services/newsApi.js</strong> (línea 2).<br />
        Obtén un token gratuito en <strong>thenewsapi.com</strong>
      </div>
    </div>
  )
}
