export function renderTimeline(experienceData, uiData) {
  const itemsHtml = experienceData.map((item, index) => {
    const isLast = index === experienceData.length - 1;
    const skillsHtml = (item.skills || []).map(skill => `
      <span class="bg-surface-container-high text-on-surface-variant font-code-sm text-xs px-2.5 py-1 rounded border border-white/5">
        ${skill}
      </span>
    `).join('');

    let icon = 'work';
    if (item.id.startsWith('edu')) icon = 'school';
    if (item.id.startsWith('cert')) icon = 'verified';

    const formattedDescription = item.description.replace(/\n/g, '<br>');

    return `
      <div class="relative flex gap-6 md:gap-8 pb-12 ${isLast ? 'pb-0' : ''}">
        <!-- Vertical Line -->
        ${!isLast ? '<div class="absolute left-5 top-10 bottom-0 w-0.5 bg-outline-variant/30"></div>' : ''}

        <!-- Timeline Marker Icon -->
        <div class="relative z-10 w-10 h-10 rounded-xl bg-surface-card border border-primary/40 flex items-center justify-center text-primary shadow-[0_0_12px_rgba(78,222,163,0.2)] shrink-0">
          <span class="material-symbols-outlined text-[20px]">${icon}</span>
        </div>

        <!-- Timeline Content Card -->
        <div class="bg-surface-card border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col gap-3 flex-1 shadow-lg hover:border-primary/30 transition-colors">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <h3 class="font-headline-lg-mobile text-xl text-on-surface font-bold">${item.role}</h3>
              <p class="font-code-sm text-code-sm text-primary font-medium">${item.company}</p>
            </div>
            <span class="font-code-sm text-xs text-text-muted px-3 py-1 bg-surface-container rounded-full w-fit border border-white/5">${item.period}</span>
          </div>

          <p class="font-body-md text-body-md text-on-surface-variant text-sm md:text-base leading-relaxed mt-1">
            ${formattedDescription}
          </p>

          <div class="flex flex-wrap gap-2 mt-2">
            ${skillsHtml}
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <section id="experience" class="w-full max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop py-24 flex flex-col gap-12">
      <div class="flex flex-col gap-3">
        <h2 class="font-headline-lg text-3xl md:text-4xl text-on-surface font-bold tracking-tight">${uiData.experience.title}</h2>
        <p class="font-code-sm text-code-sm text-text-muted">${uiData.experience.subtitle}</p>
      </div>

      <div class="flex flex-col">
        ${itemsHtml}
      </div>
    </section>
  `;
}
