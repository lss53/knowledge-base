// js/sidebar.js

import { elements } from './dom.js';
import { state, isMobileQuery } from './state.js';
import * as utils from './utils.js';
import { highlightActiveLink } from './renderer.js';

const md = window.markdownit({ html: true, linkify: true, typographer: true });

export const sidebar = {
  updateState: () => {
    elements.sidebar.dataset.visible = !state.sidebarHidden;
    elements.sidebarToggle.textContent = state.sidebarHidden ? '☰' : '✕';
    
    // --- MODIFICATION START ---
    // 移除了下面这行代码，将布局逻辑完全交由 CSS 处理。
    // elements.sidebarToggle.style.insetInlineStart = state.sidebarHidden ? '0' : `${elements.sidebar.offsetWidth}px`;
    // --- MODIFICATION END ---
    
    elements.sidebarToggle.setAttribute('aria-expanded', !state.sidebarHidden);

    if (!state.sidebarHidden) {
      setTimeout(() => {
        const firstFocusableElement = elements.sidebarContent.querySelector('a, button');
        if (firstFocusableElement) {
          firstFocusableElement.focus();
        }
      }, 150);
    }

    if (!isMobileQuery.matches) {
      localStorage.setItem('sidebarHidden', JSON.stringify(state.sidebarHidden));
    }
  },

  init: () => {
    fetch('_sidebar.md')
      .then(res => res.ok ? res.text() : Promise.reject(new Error('Sidebar file not found')))
      .then(text => {
        utils.setHTML(elements.sidebarContent, md.render(utils.convertLinks(text)));
        highlightActiveLink();
      })
      .catch(error => {
        utils.setHTML(elements.sidebarContent, `
          <div class="error-message">
            <p>Failed to load sidebar.</p>
            <button class="button button--small js-retry-sidebar">Retry</button>
          </div>
        `);
        elements.sidebarContent.querySelector('.js-retry-sidebar').addEventListener('click', sidebar.init);
      });
  }
};