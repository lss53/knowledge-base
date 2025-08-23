// js/state.js

export const isMobileQuery = window.matchMedia('(max-width: 768px)');

export const state = {
  sidebarHidden: isMobileQuery.matches,
  contentCache: new Map(),
  isLoading: false,
  scrollCache: new Map()
};

const savedState = localStorage.getItem('sidebarHidden');
if (savedState !== null && !isMobileQuery.matches) {
  state.sidebarHidden = JSON.parse(savedState);
}