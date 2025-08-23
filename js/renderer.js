// js/renderer.js

import { elements } from './dom.js';
import { state } from './state.js';
import * as utils from './utils.js';
import { imageLoader } from './imageLoader.js';

const md = window.markdownit({ html: true, linkify: true, typographer: true });

/**
 * BUG修复：提取并导出一个独立的高亮函数，以解决竞态条件。
 * 无论侧边栏还是主内容后加载完成，都会调用此函数以确保链接被高亮。
 */
export function highlightActiveLink() {
  const currentFile = decodeURIComponent(utils.getFile().replace('.md', ''));
  const sidebarLinks = elements.sidebarContent.querySelectorAll('a');
  
  if (sidebarLinks.length === 0) return;
  
  // --- MODIFICATION START ---
  // 优化：不再遍历所有链接，而是直接查找和操作，效率更高。
  
  // 1. 找到当前活动的链接并移除 active 类
  const oldActiveLink = elements.sidebarContent.querySelector('a.active');
  if (oldActiveLink) {
    oldActiveLink.classList.remove('active');
  }
  
  // 2. 找到新的应该被激活的链接并添加 active 类
  const newActiveLink = elements.sidebarContent.querySelector(`a[href="?${currentFile}"]`);
  if (newActiveLink) {
    newActiveLink.classList.add('active');
  }
  // --- MODIFICATION END ---
}

export const contentRenderer = {
  render: (text, file) => {
    utils.setHTML(elements.mainContent, md.render(utils.convertLinks(text)));
    document.title = `${decodeURIComponent(file.replace('.md', ''))} - JSMD`;

    if (state.scrollCache.has(file)) {
      elements.mainContent.scrollTop = state.scrollCache.get(file);
    } else {
      elements.mainContent.scrollTop = 0;
    }

    const images = elements.mainContent.querySelectorAll('img');
    images.forEach(img => {
      if (img.src && !img.getAttribute('data-src')) {
        img.setAttribute('data-src', img.src);
        img.removeAttribute('src');
      }
    });
    imageLoader.init();

    if (/\$\$[\s\S]*?\$\$|\$[^\n]*?\$/.test(text)) {
      utils.loadMathJax().then(() => {
        if (window.MathJax?.typesetPromise) window.MathJax.typesetPromise();
      }).catch(console.error);
    }

    highlightActiveLink();

    state.isLoading = false;
  },

  load: (file) => {
    state.isLoading = true;
    utils.setHTML(elements.mainContent, `
      <div class="content-loader">
        <div class="loading-spinner loading-spinner--small"></div>
        <p>Loading ${file}...</p>
      </div>`);

    if (state.contentCache.has(file)) {
      contentRenderer.render(state.contentCache.get(file), file);
      return;
    }

    fetch(file)
      .then(res => res.ok ? res.text() : `# 404 - Not Found\n\nFile ${file} was not found.`)
      .then(text => {
        state.contentCache.set(file, text);
        contentRenderer.render(text, file);
      })
      .catch(error => {
        state.isLoading = false;
        utils.setHTML(elements.mainContent, `
          <div class="error-message">
            <h2>Error Loading Content</h2>
            <p>${error.message}</p>
            <button class="button js-retry-content">Retry</button>
          </div>`);
        elements.mainContent.querySelector('.js-retry-content').addEventListener('click', () => contentRenderer.load(file));
      });
  }
};