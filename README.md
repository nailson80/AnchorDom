# AnchorDOM

AnchorDOM is a React + TypeScript UI framework designed specifically for game development, perfectly suited for use alongside Three.js / React Three Fiber (R3F). It provides a robust DOM-overlay approach that lets you build responsive, high-performance user interfaces on top of your WebGL canvas.

## Key Concepts

### Virtual Resolution
AnchorDOM uses a virtual 1920x1080 resolution for its `<Panel>` container. This virtual canvas is automatically scaled up or down via CSS `transform` (using a letterbox/pillarbox approach) to fit the browser window while maintaining aspect ratio. This guarantees that your UI elements maintain their exact proportions and pixel-perfect design regardless of the user's screen size or device.

### Anchor Positioning
Positioning elements in AnchorDOM is highly intuitive and eliminates the need for manual absolute pixel calculations. It uses a flexible anchor system defined by an origin point (`anchor`) and pixel offsets (`x`, `y`).
The logic uses exclusively `left` and `top` percentages for the origin point (e.g., `BOTTOM_RIGHT` corresponds to `left: '100%', top: '100%'`). An internal pivot is then applied using `transform: translate()`, which ensures that any `x` or `y` offsets naturally push the element inward from its anchored corner.

### Safe Areas
Mobile devices with notches, punch holes, or home indicators are natively supported. Safe areas are dynamically injected as CSS variables (`--safe-top`, `--safe-right`, `--safe-bottom`, `--safe-left`) on the main `<Panel>` container using standard CSS environment variables (e.g., `env(safe-area-inset-top)`). Set `useSafeArea={true}` on your `<Panel>` to enable this behavior seamlessly.

## Getting Started

AnchorDOM is built with Vite, React, and TypeScript. To run the project locally:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Basic Usage

The core of AnchorDOM is the `<Panel>` component, which establishes the virtual resolution, handles scaling, and sets up the UI context. Inside the panel, you can place built-in components like `<Button>`, `<Label>`, `<ProgressBar>`, and more.

Here is a full example demonstrating how to set up your UI and use anchors:

```tsx
import { useState } from 'react';
import { Panel } from './framework/components/Panel';
import { Button, Label, ProgressBar, Toggle, ScrollList, Image } from './framework/components/kit';

function App() {
  const [progress, setProgress] = useState(0.5);
  const [toggled, setToggled] = useState(false);

  return (
    // Wrap your UI in the Panel. useSafeArea ensures mobile notches are handled.
    <Panel useSafeArea={true} designWidth={1920} designHeight={1080}>

      {/* Centered at the top with a 50px offset downwards */}
      <Label
        anchor="TOP_CENTER"
        y={50}
        text="AnchorDOM Demo"
        style={{ fontSize: 48, color: '#ffeb3b' }}
      />

      {/* Perfectly centered in the middle of the screen */}
      <Button
        anchor="MIDDLE_CENTER"
        label="Click Me!"
        onClick={() => setProgress(p => (p + 0.1) % 1.1)}
      />

      {/* Anchored to the bottom center, 50px upwards */}
      <ProgressBar
        anchor="BOTTOM_CENTER"
        y={-50}
        progress={progress}
        width={400}
      />

      {/* Anchored to the top left corner, pushed 50px inward from both edges */}
      <Toggle
        anchor="TOP_LEFT"
        x={50}
        y={50}
        toggled={toggled}
        onToggle={setToggled}
      />

      {/* Anchored to the top right corner, pushed 50px inward */}
      <Image
        anchor="TOP_RIGHT"
        x={-50}
        y={50}
        src="/assets/test-icon.png"
        width={64}
        height={64}
        alt="Icon"
      />

      {/* A scrollable list anchored to the middle right */}
      <ScrollList
        anchor="MIDDLE_RIGHT"
        x={-50}
        width={300}
        height={400}
      >
        <div style={{ padding: 20, background: '#444', color: 'white' }}>Item 1</div>
        <div style={{ padding: 20, background: '#555', color: 'white' }}>Item 2</div>
        <div style={{ padding: 20, background: '#666', color: 'white' }}>Item 3</div>
        <div style={{ padding: 20, background: '#777', color: 'white' }}>Item 4</div>
        <div style={{ padding: 20, background: '#888', color: 'white' }}>Item 5</div>
        <div style={{ padding: 20, background: '#999', color: 'white' }}>Item 6</div>
      </ScrollList>

    </Panel>
  );
}

export default App;
```
