import '../styles/Loader.css'

export default function Loader() {
  return (
    <div className="loader">
      <div className="loader__ring" />
      <span className="loader__text">Cargando desde la API…</span>
    </div>
  )
}
