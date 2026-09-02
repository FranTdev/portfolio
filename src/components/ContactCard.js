export function renderContactCard(profileData, uiData) {
  return `
    <section id="contact" class="w-full max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-24 md:py-32 flex flex-col items-center">
      <div class="bg-surface-card border border-white/5 rounded-3xl p-8 md:p-12 w-full flex flex-col items-center text-center gap-8 relative overflow-hidden shadow-2xl">
        <!-- Glow Decor -->
        <div class="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none"></div>

        <div class="w-16 h-16 bg-surface-container-highest rounded-2xl flex items-center justify-center text-primary shadow-inner z-10 border border-primary/20">
          <span class="material-symbols-outlined text-[32px]">terminal</span>
        </div>

        <div class="flex flex-col gap-4 z-10">
          <h2 class="font-headline-xl text-3xl md:text-4xl text-on-surface font-bold">${uiData.contact.title}</h2>
          <p class="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto leading-relaxed">
            ${profileData.bio}
          </p>
          <div class="flex flex-wrap items-center justify-center gap-4 text-xs font-code-sm text-text-muted mt-1">
            <span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px] text-primary">location_on</span>${profileData.location}</span>
            <span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px] text-primary">call</span>${profileData.phone}</span>
          </div>
        </div>

        <!-- Copy Email Terminal Container -->
        <div class="w-full max-w-md bg-surface-main p-2 rounded-xl flex items-center justify-between shadow-inner mt-2 z-10 border-l-4 border-primary border border-white/5">
          <div class="flex items-center gap-3 pl-4 overflow-hidden">
            <span class="font-code-sm text-code-sm text-primary font-bold">&gt;</span>
            <span class="font-code-sm text-code-sm text-on-surface truncate" id="email-text">${profileData.email}</span>
            <span class="w-2 h-4 bg-primary animate-pulse ml-1 shrink-0"></span>
          </div>

          <button aria-label="${uiData.contact.copyEmail}"
                  id="copy-email-btn"
                  class="bg-surface-container p-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-all group relative shrink-0">
            <span class="material-symbols-outlined text-[20px]">content_copy</span>
            <span id="copy-tooltip"
                  class="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface-container-highest text-primary border border-primary/30 font-label-caps text-[11px] px-3 py-1 rounded-lg opacity-0 transition-opacity whitespace-nowrap shadow-lg pointer-events-none font-bold">
              ${uiData.contact.copied}
            </span>
          </button>
        </div>

        <div class="flex gap-6 mt-4 z-10">
          <a class="w-12 h-12 rounded-2xl bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:text-primary hover:shadow-[0_0_15px_rgba(78,222,163,0.3)] transition-all border border-white/5"
             href="${profileData.social.github}" target="_blank" rel="noopener noreferrer" title="GitHub Profile">
            <span class="material-symbols-outlined text-[24px]">code</span>
          </a>
          <a class="w-12 h-12 rounded-2xl bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:text-primary hover:shadow-[0_0_15px_rgba(78,222,163,0.3)] transition-all border border-white/5"
             href="${profileData.social.linkedin}" target="_blank" rel="noopener noreferrer" title="LinkedIn Profile">
            <span class="material-symbols-outlined text-[24px]">link</span>
          </a>
        </div>
      </div>
    </section>
  `;
}

export function setupCopyEmailListener() {
  const btn = document.getElementById('copy-email-btn');
  const emailTextEl = document.getElementById('email-text');
  const tooltip = document.getElementById('copy-tooltip');

  if (!btn || !emailTextEl || !tooltip) return;

  btn.addEventListener('click', () => {
    const email = emailTextEl.innerText.trim();
    navigator.clipboard.writeText(email).then(() => {
      tooltip.classList.remove('opacity-0');
      tooltip.classList.add('opacity-100');

      setTimeout(() => {
        tooltip.classList.remove('opacity-100');
        tooltip.classList.add('opacity-0');
      }, 2000);
    }).catch(err => {
      console.error('Error copying email to clipboard:', err);
    });
  });
}
