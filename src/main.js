import './styles/global.css';

import profileData from './data/profile.json';
import skillsData from './data/skills.json';
import projectsData from './data/projects.json';
import experienceData from './data/experience.json';

import { renderNavbar } from './components/Navbar.js';
import { renderHero } from './components/Hero.js';
import { renderSkillsGrid } from './components/SkillsGrid.js';
import { renderProjectsSection, renderProjectCards } from './components/ProjectsSection.js';
import { renderTimeline } from './components/Timeline.js';
import { renderContactCard, setupCopyEmailListener } from './components/ContactCard.js';
import { renderFooter } from './components/Footer.js';

function initApp() {
  const appEl = document.getElementById('app');
  if (!appEl) return;

  appEl.innerHTML = `
    ${renderNavbar(profileData)}
    <main class="w-full pt-16">
      <div class="flex flex-col w-full">
        ${renderHero(profileData)}
        ${renderSkillsGrid(skillsData)}
        ${renderProjectsSection(projectsData)}
        ${renderTimeline(experienceData)}
        ${renderContactCard(profileData)}
      </div>
    </main>
    ${renderFooter(profileData)}
  `;

  // Attach dynamic reactive filter event handlers
  setupProjectFilterListeners();

  // Attach clipboard listener for contact email copy
  setupCopyEmailListener();
}

function setupProjectFilterListeners() {
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
      gridContainer.innerHTML = renderProjectCards(projectsData, selectedFilter);
    });
  });
}

// Initialize application
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
