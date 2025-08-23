// js/imageLoader.js

import { elements } from './dom.js';

export const imageLoader = {
  observer: null,
  
  init() {
    this.disconnect();
    const lazyImages = elements.mainContent.querySelectorAll('img[data-src]');
    if (lazyImages.length === 0) return;
    
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target);
            this.observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px 100px 0px', threshold: 0.1 });
      lazyImages.forEach(img => {
        this.createImageContainer(img);
        this.observer.observe(img);
      });
    } else {
      lazyImages.forEach(img => {
        this.createImageContainer(img);
        this.loadImage(img);
      });
    }
  },
  
  createImageContainer(img) {
    if (img.parentElement.classList.contains('image-card')) return;
    const container = document.createElement('div');
    container.className = 'image-card';
    img.parentNode.insertBefore(container, img);
    
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-spinner loading-spinner--large';
    container.appendChild(loadingIndicator);
    
    img.classList.add('image-card__image');
    container.appendChild(img);
  },
  
  loadImage(img) {
    const container = img.closest('.image-card');
    const loadingIndicator = container.querySelector('.loading-spinner');
    const loadImageObj = new Image();
    loadImageObj.src = img.dataset.src;
    
    loadImageObj.onload = function() {
      const aspectRatio = this.naturalWidth / this.naturalHeight;
      img.style.maxWidth = aspectRatio > 2 ? '100%' : (aspectRatio < 0.5 ? 'none' : 'min(100%, 800px)');
      img.style.maxHeight = aspectRatio < 0.5 ? '70vh' : (aspectRatio > 2 ? 'none' : '70vh');
      img.src = this.src;
      img.removeAttribute('data-src');
      if (loadingIndicator) loadingIndicator.remove();
      img.classList.add('image-card__image--loaded');
      
      const altText = img.alt;
      if (altText && !container.querySelector('.image-card__caption')) {
        const caption = document.createElement('div');
        caption.className = 'image-card__caption';
        caption.textContent = altText;
        container.appendChild(caption);
      }
    };
    
    loadImageObj.onerror = function() {
      if (loadingIndicator) loadingIndicator.remove();
      
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.innerHTML = `<p>Failed to load image</p>`;
      
      if (container.parentNode) {
        container.parentNode.replaceChild(errorDiv, container);
      }
    };
  },
  
  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
};