// js/eventHandlers.js

import { state, isMobileQuery } from './state.js';
import { elements } from './dom.js';
import { sidebar } from './sidebar.js';
import { contentRenderer } from './renderer.js';
import * as utils from './utils.js';

export const eventHandlers = {
  handleLinkClick: (href) => {
    if (!href.startsWith('?') || state.isLoading) return;

    const oldFile = utils.getFile();
    state.scrollCache.set(oldFile, elements.mainContent.scrollTop);

    const file = href.substring(1) + '.md';
    history.pushState(null, '', `?${href.substring(1)}`);
    contentRenderer.load(file);

    if (isMobileQuery.matches && !state.sidebarHidden) {
      state.sidebarHidden = true;
      sidebar.updateState();
    }
  },

  handleResize: utils.debounce(() => {
    if (isMobileQuery.matches) {
      state.sidebarHidden = true;
    } else {
      const saved = localStorage.getItem('sidebarHidden');
      if (saved !== null) state.sidebarHidden = JSON.parse(saved);
    }
    sidebar.updateState();
  }, 250),

  handleKeydown: (e) => {
    if (e.key === 'Escape' && !state.sidebarHidden) {
      state.sidebarHidden = true;
      sidebar.updateState();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      state.sidebarHidden = !state.sidebarHidden;
      sidebar.updateState();
    }
  }
};