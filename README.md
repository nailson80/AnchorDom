# ⚓ AnchorDOM

**A React UI system inspired by game engines—build HUDs and overlays without fighting CSS.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

**Stop fighting CSS to build game UIs in React.**

Design your UI at a fixed resolution (like 1920x1080), and AnchorDOM automatically handles scaling, positioning, and safe areas for any screen size or aspect ratio.

Think of it like a traditional game engine UI system—built for React.

Ideal for React Three Fiber (R3F), browser-based games, and hybrid mobile apps.

---

### 🎯 Use AnchorDOM if you:
- Are building UI for React Three Fiber or browser-based games  
- Want pixel-perfect layouts across all screen sizes  
- Are tired of wrestling with flexbox and media queries for game interfaces  

---

AnchorDOM provides predictable, resolution-independent layout primitives for building game-style UIs in React.

## ✨ Features

- 📐 **Virtual Canvas Scaling:** Design in 1920x1080. AnchorDOM scales your UI using precise CSS transforms without blurry canvas rendering.
- ⚓ **9-Point Anchoring:** Position elements like a native game engine (`TOP_LEFT`, `MIDDLE_CENTER`, `BOTTOM_RIGHT`).
- 🎯 **Relative Targeting:** Anchor components to *other* components using strict React Refs.
- 📏 **Constraint Spacers:** Dynamic "Snap-To-Grid" layout helpers that fill vertical real estate between elements.
- 🖼️ **Native 9-Slice Support:** Game sprites scale without corner distortion.
- 📱 **Notch-Proof:** Automatic Safe-Area integration for modern mobile devices.

## 📦 Installation

```bash
npm install anchordom
```

## 🚀 Quick Start

Wrap your app in a `<Panel>` to create a resolution-independent UI canvas: 

```tsx
import { Panel, Button, Label } from 'anchordom/kit';
import { defaultTheme } from 'anchordom/theme';

function GameHUD() {
  return (
    // Creates a 1920x1080 virtual canvas that fits to the window
    <Panel resolution={{ width: 1920, height: 1080 }} theme={defaultTheme} useSafeArea>
      
      <Label 
        text="Score: 9999" 
        anchor="TOP_LEFT" 
        x={50} y={50} 
      />

      <Button 
        label="ATTACK" 
        anchor="BOTTOM_RIGHT" 
        x={-50} y={-50} 
        onClick={() => console.log('Boom!')} 
      />

    </Panel>
  );
}
```

## 📚 Documentation
To get the most out of AnchorDOM, check out the detailed guides in our repository:
1. [**Components & API Reference**](https://github.com/nailson80/anchordom/blob/main/docs/COMPONENTS.md) - Full list of props and UI kit elements.
2. [**Theming & 9-Slice Assets**](https://github.com/nailson80/anchordom/blob/main/docs/THEMING.md) - How to style your game and preload sprites.
3. [**Layout Cookbook**](https://github.com/nailson80/anchordom/blob/main/docs/LAYOUT_COOKBOOK.md) - Advanced recipes for dynamic UI layouts.

## 📄 License
MIT License. See `LICENSE` for more information.