export function renderFooter(profileData, uiData) {
  const currentYear = new Date().getFullYear();
  return `
    <footer class="w-full bg-surface-container-lowest border-t border-white/5 py-12">
      <div class="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="flex flex-col items-center md:items-start gap-2">
          <div class="font-label-caps text-xs text-on-surface-variant">${uiData.footer.hosted}</div>
          <div class="text-xs text-text-muted">© ${currentYear} ${profileData.name}. ${uiData.footer.rights}</div>
        </div>
        <div class="flex items-center gap-6">
          <a class="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 font-label-caps text-xs"
             href="${profileData.social.github}" target="_blank" rel="noopener noreferrer">
            <span class="material-symbols-outlined text-[18px]">code</span> GitHub
          </a>
          <a class="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 font-label-caps text-xs"
             href="${profileData.social.linkedin}" target="_blank" rel="noopener noreferrer">
            <span class="material-symbols-outlined text-[18px]">link</span> LinkedIn
          </a>
        </div>
      </div>
    </footer>
  `;
}
