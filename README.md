# ⚓ AnchorDOM

**A resolution-independent, constraint-based UI framework for React game development.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

Stop fighting with CSS media queries and flexbox for your game UIs. **AnchorDOM** allows you to design your interface at a master virtual resolution (e.g., 1920x1080) and perfectly scales it to fit any device, aspect ratio, or notch (Safe Area) automatically. 

Perfect for React Three Fiber (R3F) overlays, Cordova/Capacitor mobile wrappers, and web-based game engines.

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

Wrap your application in the `<Panel>` provider and define your master resolution. 

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
To get the most out of AnchorDOM, check out the detailed guides in our `/docs` folder:
1. [**Components & API Reference**](/docs/COMPONENTS.md) - Full list of props and UI kit elements.
2. [**Theming & 9-Slice Assets**](/docs/THEMING.md) - How to style your game and preload sprites.
3. [**Layout Cookbook**](/docs/LAYOUT_COOKBOOK.md) - Advanced recipes for dynamic UI layouts.

## 📄 License
MIT License. See `LICENSE` for more information.