export function renderNavbar(profileData, uiData, currentLang = 'es') {
  return `
    <header class="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/5">
      <div class="h-16 max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop flex items-center justify-between">
        <a href="#" class="flex items-center gap-base">
          <div class="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold">
            <span class="material-symbols-outlined text-[20px]">terminal</span>
          </div>
          <span class="font-label-caps text-label-caps tracking-widest text-primary font-bold">FRANTDEV</span>
        </a>

        <nav class="hidden md:flex items-center gap-gutter">
          <a class="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors" href="#projects">${uiData.nav.projects}</a>
          <a class="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors" href="#skills">${uiData.nav.skills}</a>
          <a class="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors" href="#experience">${uiData.nav.experience}</a>
          <a class="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors" href="#contact">${uiData.nav.contact}</a>
        </nav>

        <div class="flex items-center gap-3">
          <!-- Language Switcher Toggle -->
          <div class="flex items-center bg-surface-container-low p-1 rounded-lg border border-white/5 font-label-caps text-xs" id="lang-switcher">
            <button id="lang-btn-es" data-lang="es" class="px-2.5 py-1 rounded transition-all ${currentLang === 'es' ? 'bg-primary text-on-primary font-bold shadow-[0_0_10px_rgba(78,222,163,0.3)]' : 'text-on-surface-variant hover:text-on-surface'}">ES</button>
            <button id="lang-btn-en" data-lang="en" class="px-2.5 py-1 rounded transition-all ${currentLang === 'en' ? 'bg-primary text-on-primary font-bold shadow-[0_0_10px_rgba(78,222,163,0.3)]' : 'text-on-surface-variant hover:text-on-surface'}">EN</button>
          </div>

          <div class="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low border border-outline-variant">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span class="font-label-caps text-[10px] text-on-surface-variant">${profileData.availability}</span>
          </div>

          <a href="mailto:${profileData.email}" class="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-colors font-label-caps text-[12px]">
            <span class="material-symbols-outlined text-[16px]">mail</span>
            <span>Email</span>
          </a>
        </div>
      </div>
    </header>
  `;
}
