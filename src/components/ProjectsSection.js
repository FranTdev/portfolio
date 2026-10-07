export function renderProjectsSection(projectsData, uiData) {
  return `
    <section class="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-24 flex flex-col gap-12" id="projects">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-2 text-primary font-code-sm text-xs uppercase tracking-widest">
            <span class="material-symbols-outlined text-[18px]">verified_user</span>
            <span>SECURE CODE & INFRASTRUCTURE</span>
          </div>
          <h2 class="font-headline-lg text-3xl md:text-4xl text-on-surface font-bold tracking-tight">${uiData.projects.title}</h2>
          <p class="font-code-sm text-code-sm text-text-muted">${uiData.projects.subtitle}</p>
        </div>

        <!-- Filter Tab Buttons -->
        <div class="flex flex-wrap bg-surface-container-low p-1.5 rounded-xl w-fit shadow-inner border border-white/5" id="project-filters">
          <button data-filter="All" class="project-filter-btn px-5 py-2 rounded-lg bg-surface-container-highest text-primary font-label-caps text-label-caps shadow-sm transition-all font-bold">${uiData.projects.filters.all}</button>
          <button data-filter="Backend" class="project-filter-btn px-5 py-2 rounded-lg text-on-surface-variant hover:text-on-surface font-label-caps text-label-caps transition-colors">${uiData.projects.filters.backend}</button>
          <button data-filter="Security" class="project-filter-btn px-5 py-2 rounded-lg text-on-surface-variant hover:text-on-surface font-label-caps text-label-caps transition-colors">${uiData.projects.filters.security || 'Ciberseguridad & DevSecOps'}</button>
          <button data-filter="Open Source" class="project-filter-btn px-5 py-2 rounded-lg text-on-surface-variant hover:text-on-surface font-label-caps text-label-caps transition-colors">${uiData.projects.filters.openSource}</button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-bento-gap" id="projects-grid">
        ${renderProjectCards(projectsData, 'All', uiData)}
      </div>
    </section>
  `;
}

export function renderProjectCards(projectsData, activeFilter = 'All', uiData) {
  const filtered = activeFilter === 'All' 
    ? projectsData 
    : projectsData.filter(p => {
        const f = activeFilter.toLowerCase();
        const cat = (p.category || '').toLowerCase();
        const pType = (p.type || '').toLowerCase();
        const tags = (p.tags || []).map(t => t.toLowerCase());

        if (f.includes('security') || f.includes('ciberseguridad')) {
          return cat.includes('security') || cat.includes('ciberseguridad') || cat.includes('devsecops') || pType === 'security' || tags.some(t => t.includes('owasp') || t.includes('hardening') || t.includes('devsecops'));
        }
        if (f.includes('backend')) {
          return cat.includes('backend') || cat.includes('cloud') || pType === 'backend';
        }
        if (f.includes('open source')) {
          return cat.includes('open source') || tags.some(t => t.includes('open source'));
        }
        return cat.includes(f) || tags.some(t => t.includes(f));
      });

  if (filtered.length === 0) {
    return `<div class="col-span-full py-12 text-center font-code-sm text-text-muted">${uiData.projects.noProjects}</div>`;
  }

  return filtered.map(project => renderStandardProjectCard(project, uiData)).join('');
}

function renderStandardProjectCard(project, uiData) {
  const highlightsHtml = (project.highlights || []).map(h => `
    <div class="flex items-start gap-2">
      <span class="text-primary mt-0.5 font-bold">›</span>
      <span>${h}</span>
    </div>
  `).join('');

  const tagsHtml = (project.tags || []).map(t => `
    <span class="bg-surface-container text-on-surface-variant font-code-sm text-code-sm px-2.5 py-1 rounded border border-white/5">${t}</span>
  `).join('');

  const isSecurity = project.type === 'security' || (project.category || '').toLowerCase().includes('sec');

  return `
    <div class="bg-surface-card border border-white/5 rounded-2xl p-8 flex flex-col gap-6 shadow-xl relative group hover:shadow-[0_0_30px_rgba(78,222,163,0.15)] hover:border-primary/30 transition-all">
      <div class="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
        <span class="material-symbols-outlined text-[64px] text-primary">${project.icon || 'dns'}</span>
      </div>

      <!-- Enterprise Header Badge -->
      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-3 h-3 rounded-full ${isSecurity ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]' : 'bg-primary shadow-[0_0_10px_rgba(78,222,163,0.8)]'}"></div>
          <h3 class="font-headline-lg-mobile text-2xl text-on-surface font-bold">${project.title}</h3>
        </div>
        <span class="font-code-sm text-[10px] uppercase tracking-wider px-2.5 py-1 rounded bg-surface-container-highest ${isSecurity ? 'text-emerald-400 border border-emerald-500/20' : 'text-primary border border-primary/20'} font-bold">
          ${project.category}
        </span>
      </div>

      <p class="font-body-md text-body-md text-text-muted mt-1 leading-relaxed">
        ${project.description}
      </p>

      <div class="bg-surface-main p-4 rounded-xl flex flex-col gap-3 font-code-sm text-code-sm text-on-surface-variant mt-2 border border-white/5">
        ${highlightsHtml}
      </div>

      <div class="flex flex-wrap gap-2 mt-2">
        ${tagsHtml}
      </div>

      <div class="flex items-center gap-4 mt-auto pt-6 border-t border-white/5">
        ${project.repoUrl ? `
          <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="bg-surface-container-high text-primary font-label-caps text-label-caps px-5 py-2.5 rounded-lg hover:bg-surface-container-highest hover:text-emerald-400 transition-colors flex items-center gap-2 font-bold border border-primary/20">
            <span class="material-symbols-outlined text-[18px]">code</span>
            ${uiData.projects.viewRepo}
          </a>
        ` : ''}
        ${project.docUrl ? `
          <a href="${project.docUrl}" target="_blank" rel="noopener noreferrer" class="text-on-surface-variant font-label-caps text-label-caps px-4 py-2.5 hover:text-on-surface transition-colors flex items-center gap-2">
            <span class="material-symbols-outlined text-[18px]">menu_book</span>
            ${uiData.projects.doc}
          </a>
        ` : ''}
      </div>
    </div>
  `;
}
