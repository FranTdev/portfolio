export function renderHero(profileData) {
  return `
    <section class="relative w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-24 md:py-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 justify-between overflow-hidden">
      <!-- Decor Background Ambient Glows -->
      <div class="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div class="absolute top-1/2 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div class="flex flex-col items-start gap-6 z-10 w-full lg:w-[60%]">
        <div class="flex items-center gap-2 bg-surface-container-highest px-4 py-2 rounded-full shadow-sm border border-white/5">
          <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span class="font-code-sm text-code-sm text-primary tracking-widest uppercase">${profileData.systemStatus}</span>
        </div>

        <h1 class="font-headline-xl text-3xl md:text-5xl text-on-surface font-bold leading-tight">
          ${profileData.name} <br>
          <span class="text-text-muted text-[0.65em] font-normal tracking-normal block mt-3 leading-snug">
            <span class="text-primary font-semibold">Backend Development & Data Engineering</span> • <br>
            <span class="text-secondary font-semibold">Machine Learning & System Design</span>
          </span>
        </h1>

        <p class="font-body-md text-body-md text-on-surface-variant max-w-2xl text-base md:text-lg leading-relaxed">
          ${profileData.bio}
        </p>

        <div class="flex flex-wrap items-center gap-4 mt-4">
          <a href="#projects" class="bg-primary text-on-primary font-label-caps text-label-caps px-8 py-4 rounded-lg shadow-[0_0_20px_rgba(78,222,163,0.3)] hover:shadow-[0_0_30px_rgba(78,222,163,0.5)] transition-all flex items-center gap-2 font-bold">
            Explorar Proyectos
            <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
          </a>

          <a href="#contact" class="bg-surface-container-high border border-outline-variant/30 text-on-surface font-label-caps text-label-caps px-8 py-4 rounded-lg hover:bg-surface-container-highest transition-all flex items-center gap-2">
            Iniciar Conexión
            <span class="material-symbols-outlined text-[18px]">terminal</span>
          </a>
        </div>
      </div>

      <!-- Hero Visual Accent -->
      <div class="w-full lg:w-[40%] flex justify-center z-10">
        <div class="relative w-64 h-64 md:w-80 md:h-80 group">
          <div class="absolute inset-0 bg-gradient-to-tr from-primary/20 via-primary/5 to-secondary/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
          <div class="relative z-10 w-full h-full rounded-3xl bg-surface-card/60 border border-white/10 backdrop-blur-xl p-8 flex flex-col justify-between shadow-2xl group-hover:scale-[1.02] transition-transform duration-500">
            <div class="flex items-center justify-between border-b border-white/10 pb-4">
              <span class="font-code-sm text-code-sm text-primary font-bold">> sysinfo --full</span>
              <span class="w-3 h-3 rounded-full bg-primary/80 shadow-[0_0_8px_rgba(78,222,163,0.8)]"></span>
            </div>
            
            <div class="space-y-3 font-code-sm text-xs md:text-sm text-on-surface-variant">
              <p><span class="text-primary font-bold">LOCATION:</span> Cali, Colombia</p>
              <p><span class="text-primary font-bold">BACKEND:</span> Python, FastAPI, .NET</p>
              <p><span class="text-secondary font-bold">DATA/ML:</span> PostgreSQL, PyTorch</p>
              <p><span class="text-tertiary font-bold">INFRA:</span> Docker, Git, Azure</p>
            </div>

            <div class="pt-4 border-t border-white/10 flex items-center justify-between font-code-sm text-[11px] text-text-muted">
              <span>STATUS: OPERATIONAL</span>
              <span class="text-primary font-mono">100% HEALTH</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
