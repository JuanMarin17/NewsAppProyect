import { useOnlineStatus } from '../hooks/useOnlineStatus'
import '../styles/OfflineBanner.css'

export default function OfflineBanner() {
  const isOnline = useOnlineStatus()

  if (isOnline) return null

  return (
    <div className="offline-banner" role="alert" aria-live="assertive">
      <span className="offline-banner__icon">📡</span>
      <span className="offline-banner__text">
        Sin conexión a internet — mostrando contenido guardado en caché
      </span>
    </div>
  )
}
