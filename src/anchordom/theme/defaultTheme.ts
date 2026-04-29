import type { Theme } from './types';

export const defaultTheme: Theme = {
  name: 'default',
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    text: '#ffffff',
    background: '#333333',
  },
  assets: [
    // Preload these assets
    '/assets/button-bg.png',
    '/assets/button-bg-active.png',
    '/assets/progress-track.png',
    '/assets/progress-fill.png',
    '/assets/toggle-bg.png',
    '/assets/toggle-handle.png',
  ],
  components: {
    button: {
      fontFamily: 'sans-serif',
      fontSize: 24,
      color: '#ffffff',
      padding: '12px 24px',
      backgroundImage: '/assets/button-bg.png',
      backgroundSlice: '10 10 10 10 fill',
      activeBackgroundImage: '/assets/button-bg-active.png',
    },
    label: {
      fontFamily: 'sans-serif',
      fontSize: 24,
      color: '#ffffff',
      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
    },
    progressBar: {
      trackImage: '/assets/progress-track.png',
      trackSlice: '5 5 5 5 fill',
      fillImage: '/assets/progress-fill.png',
      fillSlice: '5 5 5 5 fill',
      height: 30,
    },
    toggle: {
      backgroundImage: '/assets/toggle-bg.png',
      handleImage: '/assets/toggle-handle.png',
      width: 80,
      height: 40,
    },
    scrollList: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 10,
    },
  },
};
