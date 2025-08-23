// js/main.js

import { state } from './state.js';
import { elements } from './dom.js';
import { sidebar } from './sidebar.js';
import { contentRenderer } from './renderer.js';
import { eventHandlers } from './eventHandlers.js';
import * as utils from './utils.js';

let prefetchTimer;

/**
 * 优化：设置链接预加载功能。
 * 当用户鼠标悬停在链接上时，提前在后台获取内容。
 */
function setupPrefetching() {
  document.addEventListener('mouseover', e => {
    const link = e.target.closest('a');
    if (link?.getAttribute('href')?.startsWith('?')) {
      prefetchTimer = setTimeout(() => {
        const href = link.getAttribute('href');
        const file = href.substring(1) + '.md';
        if (!state.contentCache.has(file)) {
          fetch(file)
            .then(res => res.ok ? res.text() : '')
            .then(text => {
              if (text) {
                console.log(`Prefetched: ${file}`);
                state.contentCache.set(file, text);
              }
            }).catch(() => {}); // 预加载失败时静默处理，不打扰用户
        }
      }, 100); // 悬停 100ms 后触发
    }
  });

  document.addEventListener('mouseout', e => {
    if (e.target.closest('a')) {
      clearTimeout(prefetchTimer);
    }
  });
}

/**
 * 初始化应用，绑定所有事件监听器
 */
const initApp = () => {
  // 更新按钮的选择器
  elements.sidebarToggle.addEventListener('click', () => {
    state.sidebarHidden = !state.sidebarHidden;
    sidebar.updateState();
  });
  
  document.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (link?.getAttribute('href')?.startsWith('?')) {
      e.preventDefault();
      eventHandlers.handleLinkClick(link.getAttribute('href'));
    }
  });
  
  window.addEventListener('resize', eventHandlers.handleResize, { passive: true });
  window.addEventListener('keydown', eventHandlers.handleKeydown);
  
  // 处理浏览器前进/后退按钮
  window.addEventListener('popstate', () => {
    contentRenderer.load(utils.getFile());
  });
  
  // 启动链接预加载
  setupPrefetching();
  
  // 初始化UI和内容
  sidebar.updateState();
  sidebar.init();
  contentRenderer.load(utils.getFile());
};

// 确保DOM加载完毕后启动应用
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}