# Manielados — Ruleta de Premios Interactiva

Aplicación web estática (sin backend, sin base de datos, 100% cliente) de una ruleta de premios tipo casino para **Manielados**, heladería artesanal dominicana.

## 🍦 Características

- **50 segmentos distribuidos exactamente**:
  - `Gracias por participar`: 36 segmentos (72%)
  - `Helado Natural`: 10 segmentos (20%)
  - `Helado Cremoso`: 3 segmentos (6%)
  - `Helado Premium`: 1 segmento (2%)
- **Diseño Casino Premium**:
  - Aro metálico grueso con brillo dorado y efecto glow `#FBB404`.
  - Anillo de luces (bombillos) en `#FAE7A0` con parpadeo alternado animado.
  - Radios metálicos delgados en crema `#FAF8E5`.
  - Hub central con logotipo de Manielados (DM Serif Display).
  - Puntero fijo superior en forma de flecha metálica dorada.
  - Paleta de color oficial Manielados (`#006045`, `#002C22`, `#0F271C`, `#E07101`, `#FBB404`, `#FAF8E5`).
- **Lógica de Giro Client-Side**:
  - Selección de premios mediante `Math.random()` con porcentajes reales (72%, 20%, 6%, 2%).
  - Animación fluida con desaceleración física (5.5s) y sonido sintético de ticks.
  - Efectos de sonido integrados con Web Audio API (efecto de rotación, fanfarria de victoria y timbre neutro).
  - Modal de resultado con confeti interactivo para premios ganados.
- **100% Estático e Offline-First**: No requiere servidor ni API externa.

---

## 🚀 Desarrollo Local

### 1. Instalación de Dependencias

```bash
npm install
```

### 2. Ejecutar en Modo Desarrollo

```bash
npm run dev
```

Abre tu navegador en `http://localhost:3000`.

### 3. Compilar Build Estático

```bash
npm run build
```

Este comando genera la carpeta `/dist` con el código estático listo para ser alojado en cualquier CDN o servicio de hosting.

---

## 🌐 Despliegue en Vercel (Sitio Estático Puro)

Para desplegar este proyecto en Vercel como un **sitio estático puro** (sin funciones serverless ni backend):

### Opción A: A través de GitHub (Recomendado)

1. Sube este repositorio a **GitHub**.
2. Ve a [Vercel](https://vercel.com) y selecciona **Add New Project**.
3. Importa tu repositorio desde GitHub.
4. En **Framework Preset**, selecciona **Vite**.
5. Asegúrate de que los comandos de configuración sean:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Haz clic en **Deploy**. ¡Listo!

### Opción B: Mediante Vercel CLI

```bash
npx vercel --prod
```

No se requieren variables de entorno ni funciones Serverless.

---

## 🛠️ Tecnologías Utilizadas

- **React 19**
- **Vite 6**
- **Tailwind CSS v4**
- **Lucide React**
- **Canvas Confetti**
- **Web Audio API**

---

© **Manielados** — Heladería Artesanal Dominicana.
