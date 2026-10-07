export function renderSkillsGrid(skillsData, uiData) {
  const cardsHtml = skillsData.map(category => {
    let colorStyles = {
      cardGlow: 'hover:shadow-[0_0_25px_rgba(78,222,163,0.15)] hover:border-primary/40',
      bgGlow: 'from-primary/30',
      iconContainer: 'bg-primary-container/20 text-primary border border-primary/20',
      titleHover: 'group-hover:text-primary',
      dotBg: 'bg-primary'
    };

    if (category.variant === 'secondary') {
      colorStyles = {
        cardGlow: 'hover:shadow-[0_0_25px_rgba(52,211,153,0.2)] hover:border-emerald-400/40',
        bgGlow: 'from-emerald-500/30',
        iconContainer: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
        titleHover: 'group-hover:text-emerald-400',
        dotBg: 'bg-emerald-400'
      };
    } else if (category.variant === 'neutral') {
      colorStyles = {
        cardGlow: 'hover:shadow-[0_0_25px_rgba(218,226,253,0.15)] hover:border-white/20',
        bgGlow: 'from-on-surface/20',
        iconContainer: 'bg-surface-container-highest text-on-surface border border-white/10',
        titleHover: 'group-hover:text-on-surface',
        dotBg: 'bg-on-surface'
      };
    }

    const skillsTagsHtml = category.skills.map(skill => `
      <span class="bg-surface-container-high text-on-surface-variant font-code-sm text-code-sm px-3 py-1.5 rounded flex items-center gap-2 border border-white/5">
        <span class="w-1.5 h-1.5 rounded-full ${colorStyles.dotBg}"></span>
        ${skill}
      </span>
    `).join('');

    return `
      <div class="bg-surface-card border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col gap-6 relative group transition-all duration-300 hover:-translate-y-1 shadow-lg ${colorStyles.cardGlow}">
        <div class="absolute inset-0 rounded-2xl bg-gradient-to-b ${colorStyles.bgGlow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>

        <div class="w-12 h-12 ${colorStyles.iconContainer} rounded-xl flex items-center justify-center mb-2 shadow-inner">
          <span class="material-symbols-outlined text-[24px]">${category.icon}</span>
        </div>

        <h3 class="font-headline-lg-mobile text-xl text-on-surface font-bold ${colorStyles.titleHover} transition-colors">
          ${category.title}
        </h3>

        <div class="flex flex-wrap gap-2 mt-auto">
          ${skillsTagsHtml}
        </div>
      </div>
    `;
  }).join('');

  return `
    <section id="skills" class="relative w-full bg-surface-container-lowest py-24 border-y border-white/5">
      <div class="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop flex flex-col gap-12">
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-2 text-primary font-code-sm text-xs uppercase tracking-widest">
            <span class="material-symbols-outlined text-[18px]">terminal</span>
            <span>ENTERPRISE ARCHITECTURE & SECURITY</span>
          </div>
          <h2 class="font-headline-lg text-3xl md:text-4xl text-on-surface font-bold tracking-tight">${uiData.skills.title}</h2>
          <p class="font-code-sm text-code-sm text-text-muted">${uiData.skills.subtitle}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-bento-gap">
          ${cardsHtml}
        </div>
      </div>
    </section>
  `;
}
