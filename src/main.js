import './styles/global.css';

import profileEs from './data/es/profile.json';
import skillsEs from './data/es/skills.json';
import projectsEs from './data/es/projects.json';
import experienceEs from './data/es/experience.json';
import uiEs from './data/es/ui.json';

import profileEn from './data/en/profile.json';
import skillsEn from './data/en/skills.json';
import projectsEn from './data/en/projects.json';
import experienceEn from './data/en/experience.json';
import uiEn from './data/en/ui.json';

import { renderNavbar } from './components/Navbar.js';
import { renderHero } from './components/Hero.js';
import { renderSkillsGrid } from './components/SkillsGrid.js';
import { renderProjectsSection, renderProjectCards } from './components/ProjectsSection.js';
import { renderTimeline } from './components/Timeline.js';
import { renderContactCard, setupCopyEmailListener } from './components/ContactCard.js';
import { renderFooter } from './components/Footer.js';

const i18nData = {
  es: {
    profile: profileEs,
    skills: skillsEs,
    projects: projectsEs,
    experience: experienceEs,
    ui: uiEs
  },
  en: {
    profile: profileEn,
    skills: skillsEn,
    projects: projectsEn,
    experience: experienceEn,
    ui: uiEn
  }
};

let currentLang = localStorage.getItem('portfolio_lang') || 'es';

function initApp() {
  const appEl = document.getElementById('app');
  if (!appEl) return;

  const data = i18nData[currentLang] || i18nData.es;

  appEl.innerHTML = `
    ${renderNavbar(data.profile, data.ui, currentLang)}
    <main class="w-full pt-16">
      <div class="flex flex-col w-full">
        ${renderHero(data.profile, data.ui)}
        ${renderSkillsGrid(data.skills, data.ui)}
        ${renderProjectsSection(data.projects, data.ui)}
        ${renderTimeline(data.experience, data.ui)}
        ${renderContactCard(data.profile, data.ui)}
      </div>
    </main>
    ${renderFooter(data.profile, data.ui)}
  `;

  // Attach dynamic event handlers
  setupLanguageSwitcherListeners();
  setupProjectFilterListeners(data.projects, data.ui);
  setupCopyEmailListener();
}

function setupLanguageSwitcherListeners() {
  const btnEs = document.getElementById('lang-btn-es');
  const btnEn = document.getElementById('lang-btn-en');

  if (btnEs) {
    btnEs.addEventListener('click', () => switchLanguage('es'));
  }
  if (btnEn) {
    btnEn.addEventListener('click', () => switchLanguage('en'));
  }
}

function switchLanguage(newLang) {
  if (currentLang === newLang) return;
  currentLang = newLang;
  localStorage.setItem('portfolio_lang', newLang);
  initApp();
}

function setupProjectFilterListeners(projectsData, uiData) {
  const filterContainer = document.getElementById('project-filters');
  const gridContainer = document.getElementById('projects-grid');

  if (!filterContainer || !gridContainer) return;

  const buttons = filterContainer.querySelectorAll('.project-filter-btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedFilter = btn.getAttribute('data-filter');

      // Update button active styles
      buttons.forEach(b => {
        b.className = 'project-filter-btn px-6 py-2 rounded-lg text-on-surface-variant hover:text-on-surface font-label-caps text-label-caps transition-colors';
      });

      btn.className = 'project-filter-btn px-6 py-2 rounded-lg bg-surface-container-highest text-primary font-label-caps text-label-caps shadow-sm transition-all font-bold';

      // Reactively render updated project cards
      gridContainer.innerHTML = renderProjectCards(projectsData, selectedFilter, uiData);
    });
  });
}

// Initialize application
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
