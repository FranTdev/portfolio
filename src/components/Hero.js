export function renderHero(profileData, uiData) {
  return `
    <section class="relative w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-24 md:py-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 justify-between overflow-hidden">
      <!-- Decor Background Ambient Glows -->
      <div class="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div class="absolute top-1/2 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div class="flex flex-col items-start gap-6 z-10 w-full lg:w-[60%]">
        <div class="flex items-center gap-3 bg-surface-container-highest px-4 py-2 rounded-full shadow-sm border border-emerald-500/20">
          <span class="relative flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
          </span>
          <span class="font-code-sm text-code-sm text-primary tracking-widest uppercase">${profileData.systemStatus}</span>
        </div>

        <h1 class="font-headline-xl text-3xl md:text-5xl text-on-surface font-bold leading-tight">
          ${profileData.name} <br>
          <span class="text-text-muted text-[0.6em] md:text-[0.62em] font-normal tracking-normal block mt-3 leading-snug">
            <span class="text-primary font-bold">${profileData.role}</span>
          </span>
        </h1>

        <!-- Enterprise Security Badges -->
        <div class="flex flex-wrap items-center gap-2">
          <span class="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-md font-code-sm text-[11px] tracking-wide flex items-center gap-1.5 font-bold">
            <span class="material-symbols-outlined text-[14px]">shield</span>
            SECURE SDLC ENFORCED
          </span>
          <span class="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-md font-code-sm text-[11px] tracking-wide flex items-center gap-1.5 font-bold">
            <span class="material-symbols-outlined text-[14px]">verified_user</span>
            OWASP TOP 10 AUDITED
          </span>
          <span class="bg-surface-container-high text-on-surface-variant border border-outline-variant/30 px-3 py-1 rounded-md font-code-sm text-[11px] tracking-wide flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[14px]">cloud_done</span>
            CLOUD & CONTAINER HARDENED
          </span>
        </div>

        <p class="font-body-md text-body-md text-on-surface-variant max-w-2xl text-base md:text-lg leading-relaxed">
          ${profileData.bio}
        </p>

        <div class="flex flex-wrap items-center gap-4 mt-4">
          <a href="#projects" class="bg-primary text-on-primary font-label-caps text-label-caps px-8 py-4 rounded-lg shadow-[0_0_20px_rgba(78,222,163,0.3)] hover:shadow-[0_0_30px_rgba(78,222,163,0.5)] transition-all flex items-center gap-2 font-bold">
            ${uiData.hero.exploreProjects}
            <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
          </a>

          <a href="#contact" class="bg-surface-container-high border border-outline-variant/30 text-on-surface font-label-caps text-label-caps px-8 py-4 rounded-lg hover:bg-surface-container-highest hover:border-primary/40 transition-all flex items-center gap-2">
            ${uiData.hero.initiateConnection}
            <span class="material-symbols-outlined text-[18px]">lock</span>
          </a>
        </div>
      </div>

      <!-- Hero Visual Accent — Enterprise Cyber Status Dashboard -->
      <div class="w-full lg:w-[40%] flex justify-center z-10">
        <div class="relative w-full max-w-md group">
          <div class="absolute inset-0 bg-gradient-to-tr from-primary/20 via-emerald-500/10 to-primary/5 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
          <div class="relative z-10 w-full rounded-3xl bg-surface-card/80 border border-white/10 backdrop-blur-xl p-6 md:p-8 flex flex-col justify-between shadow-2xl group-hover:scale-[1.01] transition-transform duration-500">
            
            <!-- Terminal Header -->
            <div class="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-[#ff5f57]"></span>
                <span class="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
                <span class="w-3 h-3 rounded-full bg-[#28c840]"></span>
              </div>
              <span class="font-code-sm text-code-sm text-primary font-bold tracking-wider">${uiData.hero.sysinfoCmd}</span>
            </div>
            
            <!-- Enterprise Security Metrics -->
            <div class="space-y-3 font-code-sm text-xs md:text-sm text-on-surface-variant">
              <div class="flex items-center justify-between py-1 border-b border-white/5">
                <span class="text-text-muted">LOCATION:</span>
                <span class="text-on-surface font-bold">${profileData.location}</span>
              </div>
              <div class="flex items-center justify-between py-1 border-b border-white/5">
                <span class="text-text-muted">BACKEND & CLOUD:</span>
                <span class="text-primary font-bold">Python, C#, Azure, AWS</span>
              </div>
              <div class="flex items-center justify-between py-1 border-b border-white/5">
                <span class="text-text-muted">CYBERSECURITY:</span>
                <span class="text-emerald-400 font-bold">OWASP Top 10, Forense</span>
              </div>
              <div class="flex items-center justify-between py-1 border-b border-white/5">
                <span class="text-text-muted">DEVSECOPS:</span>
                <span class="text-on-surface font-bold">Docker, GitHub Actions</span>
              </div>
              <div class="flex items-center justify-between py-1">
                <span class="text-text-muted">COMPLIANCE:</span>
                <span class="text-primary font-bold">ISO 27001 & Secure SDLC</span>
              </div>
            </div>

            <!-- Footer Badge -->
            <div class="pt-4 mt-4 border-t border-white/10 flex items-center justify-between font-code-sm text-[11px]">
              <span class="text-text-muted flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[14px] text-primary">verified</span>
                ${uiData.hero.statusOperational}
              </span>
              <span class="text-primary font-mono font-bold">${uiData.hero.health}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
