# Portafolio Profesional - Francisco S. Tabares U.

**Software Engineer | Backend & MLOps • Game Systems Developer**

Portafolio web modular, de alto rendimiento y desacoplado, construido con **Vite**, **Vanilla JavaScript** y **Tailwind CSS**. Diseñado para desplegarse limpiamente en **GitHub Pages** mediante integración continua con GitHub Actions.

---

## 🛠️ Stack Tecnológico & Arquitectura

- **Build Tool:** [Vite](https://vitejs.dev/) (Compilación ultrarrápida y soporte ESM nativo)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v3 (Tema oscuro personalizado, tokens de diseño y diseño Bento Grid)
- **Icons & Typography:** Google Material Symbols Outlined, fuentes *Geist* y *JetBrains Mono*
- **Desacoplamiento de Datos:** El contenido se gestiona de forma totalmente independiente en la carpeta `src/data/` en formato JSON:
  - `profile.json`: Datos biográficos, estado del sistema, disponibilidad y enlaces de contacto.
  - `projects.json`: Lista de proyectos (MLOps, Game Dev, Híbridos) con tarjetas personalizadas, highlights y tags.
  - `skills.json`: Matriz técnica categorizada (Backend/MLOps, Game Systems, Arquitectura).
  - `experience.json`: Hitos de carrera, trayectoria profesional y formación académica.

---

## 📁 Estructura del Proyecto

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml              # Pipeline de CI/CD para GitHub Pages
├── public/
│   └── assets/                     # Recursos gráficos y documentos estáticos
├── src/
│   ├── components/                 # Módulos JS reutilizables
│   │   ├── Navbar.js               # Navegación y estado
│   │   ├── Hero.js                 # Sección principal
│   │   ├── SkillsGrid.js           # Bento Grid de habilidades
│   │   ├── ProjectsSection.js      # Showcase con filtrado reactivo
│   │   ├── Timeline.js             # Línea de tiempo profesional
│   │   ├── ContactCard.js          # Terminal de contacto + Copiar Email
│   │   └── Footer.js               # Pie de página
│   ├── data/                       # Capa de datos desacoplada (JSON)
│   │   ├── profile.json
│   │   ├── projects.json
│   │   ├── skills.json
│   │   └── experience.json
│   ├── styles/
│   │   └── global.css              # Directivas Tailwind y estilos globales
│   └── main.js                     # Punto de entrada de la aplicación
├── index.html                      # Ensamblador HTML
├── package.json                    # Dependencias y scripts
├── tailwind.config.js              # Configuración de diseño y colores
├── postcss.config.js               # Plugins PostCSS
├── vite.config.js                  # Configuración Vite (`base: './'`)
└── CONTEXT.MD                      # Contexto del desarrollo e historial
```

---

## 🚀 Desarrollo Local

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Compilar para producción:**
   ```bash
   npm run build
   ```

4. **Previsualizar la compilación de producción:**
   ```bash
   npm run preview
   ```

---

## ⚙️ Cómo Agregar o Modificar Proyectos

Para agregar un nuevo proyecto a la landing page **no necesitas modificar archivos HTML o JS**:

1. Abre `src/data/projects.json`.
2. Agrega un nuevo objeto con el siguiente formato (para MLOps o Unity):

```json
{
  "id": "nuevo-proyecto",
  "title": "Nombre del Proyecto",
  "category": "MLOps", // "MLOps" o "Videojuegos"
  "type": "mlops", // "mlops" o "unity"
  "description": "Descripción técnica detallada...",
  "highlights": [
    "Logro técnico 1",
    "Logro técnico 2"
  ],
  "tags": ["Python", "FastAPI", "Docker"],
  "repoUrl": "https://github.com/usuario/repo",
  "docUrl": "https://github.com/usuario/repo"
}
```

Al guardar el archivo, los filtros interactivos y las tarjetas se actualizarán automáticamente.

---

## 🌐 Despliegue en GitHub Pages

- La configuración de `vite.config.js` incluye `base: './'`, lo cual garantiza que los assets estáticos se carguen sin rutas rotas independientemente del nombre del repositorio.
- El archivo `.github/workflows/deploy.yml` compila el proyecto en cada `push` a la rama `main` y lo despliega automáticamente a GitHub Pages.
