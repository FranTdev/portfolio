# CONTEXTO DEL PROYECTO: PORTAFOLIO MODULAR

**Propietario:** Francisco Steven Tabares Ussa  
**Rol:** Ingeniero de Software | Backend & MLOps • Game Systems Developer  
**Estado Actual:** Finalizado y Verificado Satisfactoriamente  
**Fecha:** 2026-08-26  

---

## 1. RESUMEN Y OBJETIVOS

Construcción del portafolio profesional altamente estético, interactivo y desacoplado técnicamente para Francisco Steven Tabares Ussa.

### Principios Fundamentales Implementados:
1. **Desacoplamiento total de datos:** El contenido (proyectos, habilidades, trayectoria, perfil) reside en archivos JSON dentro de `src/data/`. Cualquier adición o edición de proyectos se realiza modificando JSONs sin alterar HTML o JS.
2. **Reactividad Vanilla + Vite:** Interacción de filtrado de proyectos sin frameworks pesados, garantizando máxima velocidad de carga.
3. **Estética Figma Premium:** Basado en el prototipo `CODIGOEJEMPLO.HTML` con tema oscuro (`#0b1326`), paleta esmeralda (`#4edea3`) para MLOps/Backend y violeta (`#d0bcff`) para Game Systems, tipografías *Geist* y *JetBrains Mono*, e iconos *Material Symbols Outlined*.
4. **Despliegue GitHub Pages:** Configuración de `vite.config.js` con `base: './'` y pipeline automatizado `.github/workflows/deploy.yml`.

---

## 2. ESTRUCTURA DEL PROYECTO Y MAPA DE ARCHIVOS

```
c:/Users/FranT/Desktop/my-page/
├── .github/
│   └── workflows/
│       └── deploy.yml              # Workflows de CI/CD para GitHub Pages
├── public/
│   └── assets/                     # Recursos gráficos y documentos estáticos
├── src/
│   ├── data/                       # Capa de datos desacoplada (JSON)
│   │   ├── profile.json            # Información general y bio
│   │   ├── projects.json           # Proyectos MLOps, Game Dev e Híbridos
│   │   ├── skills.json             # Matriz técnica y arsenal
│   │   └── experience.json         # Trayectoria y educación
│   ├── components/                 # Módulos de renderizado dinámico
│   │   ├── Navbar.js
│   │   ├── Hero.js
│   │   ├── SkillsGrid.js
│   │   ├── ProjectsSection.js
│   │   ├── Timeline.js
│   │   ├── ContactCard.js
│   │   └── Footer.js
│   ├── styles/
│   │   └── global.css              # Estilos base y directivas Tailwind
│   └── main.js                     # Punto de entrada principal JS
├── index.html                      # Ensamblador HTML principal
├── package.json                    # Scripts y dependencias
├── tailwind.config.js              # Tokens de diseño, colores y fuentes
├── postcss.config.js               # Configuración de PostCSS para Tailwind
├── vite.config.js                  # Configuración de compilación Vite (base: './')
├── CONTEXT.MD                      # Fuente de verdad y registro de contexto continuo
├── INSTRUCCIONES_LLM               # Especificaciones y requerimientos originales
├── EJEMPLODISENO.txt               # Árbol de directorios de referencia
├── CODIGOEJEMPLO.HTML              # Maquetado y diseño de referencia
└── README.md                       # Documentación técnica para desarrollo
```

---

## 3. TAREAS Y ROADMAP DE EJECUCIÓN

- [x] **Fase 1: Análisis y Planificación**
  - [x] Lectura de `INSTRUCCIONES_LLM`, `EJEMPLODISENO.txt`, `CODIGOEJEMPLO.HTML`.
  - [x] Creación del plan de implementación (`implementation_plan.md`).
  - [x] Inicialización del documento de contexto (`CONTEXT.MD`).

- [x] **Fase 2: Fundamentos del Entorno y Estilos**
  - [x] Crear `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`.
  - [x] Instalar dependencias (`vite`, `tailwindcss`, `autoprefixer`, `postcss`).
  - [x] Configurar `src/styles/global.css` e `index.html` con fuentes de Google (*Geist*, *JetBrains Mono*, *Material Symbols*).

- [x] **Fase 3: Capa de Datos (JSON)**
  - [x] Crear `src/data/profile.json`.
  - [x] Crear `src/data/projects.json` (con esquemas para MLOps y Unity).
  - [x] Crear `src/data/skills.json` (categorizado por Bento Grid).
  - [x] Crear `src/data/experience.json`.

- [x] **Fase 4: Desarrollo Módulos UI en Javascript**
  - [x] Crear `Navbar.js` (navegación y estado).
  - [x] Crear `Hero.js` (encabezado e introducción).
  - [x] Crear `SkillsGrid.js` (Bento grid de habilidades).
  - [x] Crear `ProjectsSection.js` (filtros reactivos "All", "MLOps", "Videojuegos").
  - [x] Crear `Timeline.js` (línea de tiempo interactiva).
  - [x] Crear `ContactCard.js` (portapapeles API Clipboard + tooltip "Copied!").
  - [x] Crear `Footer.js`.
  - [x] Conectar todo en `src/main.js`.

- [x] **Fase 5: CI/CD y Documentación**
  - [x] Configurar `.github/workflows/deploy.yml`.
  - [x] Crear `README.md` completo.
  - [x] Pruebas de compilación exitosas (`npm run build`).
  - [x] Verificación interactiva en navegador (`http://localhost:4173/`).

- [x] **Fase 6: Integración de Repositorios Públicos y Organización de Perfil de GitHub**
  - [x] Adición del repositorio `Algorithms` (.NET 10 Sorting & Benchmarks) en `src/data/projects.json`.
  - [x] Adición del repositorio `Unity2DBackend` (.NET 9 & SignalR 2D Multiplayer Template) en `src/data/projects.json`.
  - [x] Creación del archivo `GITHUB_PROFILE_README.md` para el repositorio especial de GitHub (`FranTdev/FranTdev`).
  - [x] Creación de `GITHUB_ORGANIZATION_GUIDE.md` con guías de fijación de repositorios, metadatos y etiquetas.

- [x] **Fase 7: Soporte Bilingüe Internacionalizado (Español / Inglés)**
  - [x] Estructuración de datos bilingües en `src/data/es/` y `src/data/en/` (`profile`, `projects`, `skills`, `experience`, `ui`).
  - [x] Implementación de selector de idioma `[ ES | EN ]` en `Navbar.js` con persistencia en `localStorage`.
  - [x] Re-renderizado reactivo dinámico sin recargar la página en `src/main.js`.


---

## 4. REGISTRO DE DECISIONES DE DISEÑO Y ARQUITECTURA

- **Glow & Gradient Utilities:** Uso de utilidades Tailwind personalizadas en `tailwind.config.js` para replicar exactamente las sombras neón (`rgba(78,222,163,0.3)` y `rgba(208,188,255,0.3)`).
- **Clipboard API Standard:** Uso de `navigator.clipboard.writeText` con tooltip animado "Copied!".
- **Single Page Application (SPA) modular:** Uso de JavaScript Vanilla moderno con importación ESM nativa en Vite.

