# Theming & Asset Management

AnchorDOM uses a centralized, JSON-based theme provider. Because game UIs rely heavily on custom sprites rather than CSS gradients, the theme engine is built entirely around **Image Assets**, **Nine-Slice Scaling**, and **Preloading**.

## 🎨 Anatomy of a Theme

A theme object defines global colors, typography, and specific styles (including background sprites) for every component in the kit.

```typescript
import { Theme } from 'anchordom/theme';

export const CyberpunkTheme: Theme = {
  colors: {
    primary: '#00ffcc',
    danger: '#ff0055',
  },
  assets: [
    '/assets/panel-bg.png',
    '/assets/btn-active.png'
  ],
  components: {
    button: {
      fontFamily: '"Orbitron", sans-serif',
      fontSize: '24px',
      color: '#ffffff',
      backgroundImage: '/assets/btn-idle.png',
      activeBackgroundImage: '/assets/btn-active.png',
      // Nine-Slice Settings
      backgroundSlice: { top: 12, right: 12, bottom: 12, left: 12 },
      padding: '10px 20px',
    },
    // ... label, progressBar, toggle styles
  }
}
```

## 🖼️ Nine-Slice Scaling (border-image)
Game UIs often use small source textures (e.g., 64x64 pixels) that need to stretch to fit dynamic content. Standard CSS stretching makes corners blurry and distorted. 

AnchorDOM uses standard CSS `border-image-slice` logic under the hood. By defining the `backgroundSlice` in your theme, you tell AnchorDOM to protect the corners of your sprite and only stretch the middle pixels.

*If your button graphic has a 12px rounded corner, set your slice to `12` on all sides. The framework handles the rest, ensuring crisp UI panels at any size.*

## ⏳ Asset Preloader
Nothing looks less professional than a game loading and the UI popping in piece-by-piece. 

When you define an array of strings in the `theme.assets` property, AnchorDOM's internal `useAssetLoader` hook will automatically cache those images into browser memory.

The `<Panel>` component will **prevent the rendering of your UI** until all local assets have successfully loaded, guaranteeing a "native app" feel without visual flicker.