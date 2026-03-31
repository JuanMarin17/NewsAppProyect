# Informe: Science News Explorer — Germany
## The News API · React + Vite

---

## Descripción General

Aplicación web desarrollada con **React 18 + Vite** que permite explorar noticias científicas de **Alemania** (`locale: de`, `categories: science`) usando la API de [thenewsapi.com](https://www.thenewsapi.com). La interfaz es completamente responsiva y consume **7 endpoints distintos** organizados como módulos independientes.

---

## Estructura del Código

El proyecto sigue una arquitectura de separación de responsabilidades:

- **`/services`** — Lógica de API y configuración de endpoints (sin UI)
- **`/hooks`** — Hook `useNewsQuery` que abstrae el estado de las peticiones
- **`/components`** — Componentes JSX puros, cada uno con su propio archivo CSS
- **`/styles`** — Archivos CSS separados por componente + variables globales

---

## Endpoints Utilizados

### 1. `/v1/news/top` — Top Stories
Obtiene las noticias más destacadas del día en Alemania dentro de `science`.  
**Parámetros:** `locale=de`, `categories=science`, `language=en`  
**Funcionamiento:** Se dispara automáticamente al seleccionar la tarjeta. Muestra las noticias principales con imagen, fuente, fecha y enlace al artículo original.

---

### 2. `/v1/news/all` — All Science News
Obtiene el feed completo de noticias científicas de fuentes alemanas.  
**Parámetros:** `locale=de`, `categories=science`, `language=en`  
**Funcionamiento:** Carga automática al seleccionar. Muestra todos los artículos disponibles en el feed de ciencia alemán con paginación implícita.

---

### 3. `/v1/news/all?search=` — Search Articles
Permite filtrar artículos de ciencia alemanes por palabra clave ingresada por el usuario.  
**Parámetros:** `locale=de`, `categories=science`, `language=en`, `search={query}`  
**Funcionamiento:** El usuario escribe un término (ej: "quantum", "climate change") y presiona Enter o el botón Fetch. La búsqueda se realiza en título y cuerpo de los artículos.

---

### 4. `/v1/news/similar` — Similar Articles
Encuentra artículos temáticamente similares a una frase o concepto proporcionado.  
**Parámetros:** `locale=de`, `categories=science`, `language=en`, `search={tema}`  
**Funcionamiento:** El usuario ingresa un tema científico (ej: "space exploration", "CERN particle") y la API retorna artículos con contenido relacionado semánticamente. Diferente al endpoint de búsqueda clásica.

---

### 5. `/v1/news/sources` — News Sources
Lista todas las fuentes de noticias de ciencia registradas para Alemania.  
**Parámetros:** `locale=de`, `categories=science`, `language=en`  
**Funcionamiento:** Carga automática. Muestra cada fuente con su dominio, idioma, país y categorías. Útil para conocer el origen de las publicaciones. Renderiza con `SourceCard` en lugar de `ArticleCard`.

---

### 6. `/v1/news/all?published_after=&published_before=` — By Date Range
Filtra artículos dentro de un rango de fechas personalizado.  
**Parámetros:** `locale=de`, `categories=science`, `language=en`, `published_after=YYYY-MM-DD`, `published_before=YYYY-MM-DD`  
**Funcionamiento:** El usuario selecciona fechas de inicio y fin con inputs `type="date"`. Permite analizar cobertura de eventos científicos en períodos específicos.

---

### 7. `/v1/news/all` con fecha automática — Latest 24h
Muestra artículos publicados en las últimas 24 horas sin intervención del usuario.  
**Parámetros:** `locale=de`, `categories=science`, `language=en`, `published_after={ayer}`, `limit=12`  
**Funcionamiento:** La fecha de ayer se calcula automáticamente en JavaScript: `new Date(); yesterday.setDate(yesterday.getDate() - 1)`. Sin inputs requeridos.

---

## Capacidades Implementadas

| Requisito | Implementación |
|-----------|---------------|
| Menú principal | 7 tarjetas en grid CSS responsivo con estado activo |
| Entrada de datos | Input texto (búsqueda), input date (fechas), tecla Enter |
| Peticiones a la API | `fetch()` con `URLSearchParams` en `/services/newsApi.js` |
| Procesamiento JSON | Extracción de `data.data` y `data.meta.found` |
| Imágenes | `article.image_url` con fallback a icono decorativo |
| Presentación organizada | Grid adaptable con cards de artículo/fuente |
| Manejo de errores | `try/catch` con componente `ErrorBox` y mensajes claros |
| Responsive | CSS Grid `auto-fill minmax()` en todos los breakpoints |
| Separación de estilos | CSS externo por cada componente, variables globales en `globals.css` |

---

## País Seleccionado: Alemania 🇩🇪

Alemania lidera la investigación científica europea con instituciones como el **Instituto Max Planck**, el **Centro Aeroespacial Alemán (DLR)**, el **DKFZ** (Centro Alemán de Investigación del Cáncer) y múltiples universidades técnicas (TU Munich, KIT). El parámetro `locale=de` asegura fuentes periodísticas alemanas con cobertura científica de alta calidad.

---

*Proyecto — The News API · Science · Germany · React + Vite*
