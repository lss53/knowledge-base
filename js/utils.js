// js/utils.js

export const setHTML = (element, html) => {
  element.innerHTML = DOMPurify.sanitize(html);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const convertLinks = text => text
  .replace(/\[\[([^\]]+)\]\]/g, '[$1](?$1)')
  .replace(/\[([^\]]+)\]\(([^)]+)\.md\)/g, '[$1](?$2)');

export const getFile = () => {
  const params = new URLSearchParams(window.location.search);
  const firstParam = params.keys().next().value;
  return firstParam ? `${firstParam}.md` : 'README.md';
};

export const loadMathJax = () => {
  if (window.MathJax) return Promise.resolve();
  return new Promise((resolve, reject) => {
    window.MathJax = {
      tex: { inlineMath: [['$', '$']], displayMath: [['$$', '$$']] },
      startup: { typeset: false }
    };
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};