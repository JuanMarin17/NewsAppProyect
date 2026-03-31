import '../styles/Loader.css'

export default function ErrorBox({ message }) {
  return (
    <div className="error-box">
      <div className="error-box__title">⚠ API Error</div>
      <div className="error-box__msg">{message}</div>
      <div className="error-box__hint">
        Make sure your API token is set in <strong>src/services/newsApi.js</strong> (line 2).<br />
        Get a free token at <strong>thenewsapi.com</strong>
      </div>
    </div>
  )
}
