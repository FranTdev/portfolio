export function renderProjectsSection(projectsData, uiData) {
  return `
    <section class="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-24 flex flex-col gap-12" id="projects">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div class="flex flex-col gap-3">
          <h2 class="font-headline-lg text-3xl md:text-4xl text-on-surface font-bold tracking-tight">${uiData.projects.title}</h2>
          <p class="font-code-sm text-code-sm text-text-muted">${uiData.projects.subtitle}</p>
        </div>

        <!-- Filter Tab Buttons -->
        <div class="flex bg-surface-container-low p-1.5 rounded-xl w-fit shadow-inner border border-white/5" id="project-filters">
          <button data-filter="All" class="project-filter-btn px-6 py-2 rounded-lg bg-surface-container-highest text-primary font-label-caps text-label-caps shadow-sm transition-all font-bold">${uiData.projects.filters.all}</button>
          <button data-filter="Backend" class="project-filter-btn px-6 py-2 rounded-lg text-on-surface-variant hover:text-on-surface font-label-caps text-label-caps transition-colors">${uiData.projects.filters.backend}</button>
          <button data-filter="Open Source" class="project-filter-btn px-6 py-2 rounded-lg text-on-surface-variant hover:text-on-surface font-label-caps text-label-caps transition-colors">${uiData.projects.filters.openSource}</button>
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
    : projectsData.filter(p => p.category.toLowerCase().includes(activeFilter.toLowerCase()) || activeFilter.toLowerCase().includes(p.category.toLowerCase()));

  if (filtered.length === 0) {
    return `<div class="col-span-full py-12 text-center font-code-sm text-text-muted">${uiData.projects.noProjects}</div>`;
  }

  return filtered.map(project => {
    if (project.type === 'unity') {
      return renderUnityCard(project, uiData);
    }
    return renderMLOpsCard(project, uiData);
  }).join('');
}

function renderMLOpsCard(project, uiData) {
  const highlightsHtml = (project.highlights || []).map(h => `
    <div class="flex items-start gap-2">
      <span class="text-primary mt-0.5 font-bold">-&gt;</span>
      <span>${h}</span>
    </div>
  `).join('');

  const tagsHtml = (project.tags || []).map(t => `
    <span class="bg-surface-container text-on-surface-variant font-code-sm text-code-sm px-2.5 py-1 rounded border border-white/5">${t}</span>
  `).join('');

  return `
    <div class="bg-surface-card border border-white/5 rounded-2xl p-8 flex flex-col gap-6 shadow-xl relative group hover:shadow-[0_0_30px_rgba(78,222,163,0.15)] transition-all">
      <div class="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
        <span class="material-symbols-outlined text-[64px] text-primary">${project.icon || 'dns'}</span>
      </div>

      <div class="flex items-center gap-3">
        <div class="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(78,222,163,0.8)]"></div>
        <h3 class="font-headline-lg-mobile text-2xl text-on-surface font-bold">${project.title}</h3>
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
          <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="bg-surface-container-high text-primary font-label-caps text-label-caps px-5 py-2.5 rounded-lg hover:bg-surface-container-highest transition-colors flex items-center gap-2 font-bold">
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

function renderUnityCard(project, uiData) {
  const tagsHtml = (project.tags || []).map(t => `
    <span class="bg-secondary-container/20 text-secondary font-code-sm text-code-sm px-2.5 py-1 rounded border border-secondary/20">${t}</span>
  `).join('');

  return `
    <div class="bg-surface-card border border-white/5 rounded-2xl overflow-hidden flex flex-col shadow-xl group hover:shadow-[0_0_30px_rgba(208,188,255,0.15)] transition-all">
      <div class="h-64 w-full bg-surface-container-highest relative overflow-hidden">
        <div class="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 mix-blend-luminosity group-hover:mix-blend-normal"
             style="background-image: url('${project.image}');">
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-surface-card via-surface-card/40 to-transparent"></div>
        <div class="absolute bottom-4 left-6 bg-surface/80 backdrop-blur-md px-3 py-1.5 rounded-lg font-code-sm text-code-sm text-secondary flex items-center gap-2 border border-secondary/30">
          <span class="material-symbols-outlined text-[16px]">terminal</span>
          ${project.executable || 'SYSTEM_SIMULATOR.exe'}
        </div>
      </div>

      <div class="p-8 flex flex-col gap-4 flex-1">
        <h3 class="font-headline-lg-mobile text-2xl text-on-surface font-bold">${project.title}</h3>

        <p class="font-body-md text-body-md text-text-muted leading-relaxed">
          ${project.description}
        </p>

        <div class="flex flex-wrap gap-2 mt-1">
          ${tagsHtml}
        </div>

        <div class="flex items-center gap-4 mt-auto pt-4 border-t border-white/5">
          ${project.repoUrl ? `
            <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="bg-surface-container-high text-on-surface font-label-caps text-label-caps px-5 py-2.5 rounded-lg hover:bg-surface-container-highest transition-colors flex items-center gap-2">
              ${uiData.projects.viewRepo}
            </a>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}
