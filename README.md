# 🇩🇪 Science News Explorer · Germany

Aplicación React + Vite para explorar noticias de ciencia de Alemania usando **The News API**.

---

## ⚙️ Configuración rápida

### 1. Obtener API Token (gratis)
Ve a → https://www.thenewsapi.com → Sign up → copia tu token

### 2. Agregar el token
Abre `src/services/newsApi.js` y en la línea 2 reemplaza:
```js
export const API_TOKEN = 'YOUR_API_TOKEN_HERE'
```
con tu token real.

### 3. Instalar dependencias y ejecutar
```bash
npm install
npm run dev
```

Luego abre: **http://localhost:5173**

---

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── Header.jsx          → Barra de navegación sticky
│   ├── Hero.jsx            → Sección de presentación
│   ├── MenuGrid.jsx        → Menú de 7 tarjetas de endpoints
│   ├── ResultsPanel.jsx    → Panel de resultados dinámico
│   ├── ArticleCard.jsx     → Tarjeta de artículo con imagen
│   ├── SourceCard.jsx      → Tarjeta de fuente periodística
│   ├── Loader.jsx          → Indicador de carga
│   └── ErrorBox.jsx        → Manejo visual de errores
├── hooks/
│   └── useNewsQuery.js     → Hook personalizado para fetching
├── services/
│   ├── newsApi.js          → Todas las llamadas a la API
│   └── endpoints.js        → Configuración de los 7 endpoints
├── styles/
│   ├── globals.css         → Variables CSS y reset global
│   ├── Header.css
│   ├── Hero.css
│   ├── Menu.css
│   ├── Panel.css
│   ├── ArticleCard.css
│   ├── SourceCard.css
│   └── Loader.css
├── App.jsx                 → Componente raíz
└── main.jsx                → Punto de entrada Vite
```

---

## 🔬 Endpoints implementados (7)

| # | Tarjeta | Endpoint | Tipo |
|---|---------|----------|------|
| 1 | Top Stories | `/v1/news/top` | Auto |
| 2 | All Science | `/v1/news/all` | Auto |
| 3 | Search Articles | `/v1/news/all?search=` | Búsqueda por texto |
| 4 | Similar Articles | `/v1/news/similar` | Búsqueda por tema |
| 5 | News Sources | `/v1/news/sources` | Auto |
| 6 | By Date Range | `/v1/news/all?published_after=&published_before=` | Selector de fechas |
| 7 | Latest 24h | `/v1/news/all` (fecha auto) | Auto |

Todos los endpoints usan: `locale=de` · `categories=science` · `language=en`

---

## 📱 Responsive
- ✅ Móvil (320px+)
- ✅ Tablet (768px+)  
- ✅ Escritorio (1440px+)
