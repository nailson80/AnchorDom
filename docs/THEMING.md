# Theming in AnchorDOM

AnchorDOM uses a JSON-based theme provider to manage styling and assets across all UI components. This approach ensures consistency and allows for dynamic theming (e.g., swapping between light/dark mode or applying distinct visual styles for different parts of a game or application).

This document covers everything you need to know about the theming system, including how to define themes, apply them, and access them within custom components.

---

## 1. The Theme Structure

A theme in AnchorDOM is defined as a TypeScript object that implements the `Theme` interface (found in `src/anchordom/theme/types.ts`). A theme consists of a few primary sections:

```typescript
export interface Theme {
  name: string;           // A unique identifier for the theme
  colors: ThemeColors;    // A dictionary of semantic colors
  assets: string[];       // A list of local asset paths to preload
  components: ComponentStyles; // Styles specific to each UI component
}
```

### Colors
The `colors` object defines semantic colors such as `primary`, `secondary`, `text`, and `background`. You can add custom keys as needed:
```typescript
colors: {
  primary: '#007bff',
  secondary: '#6c757d',
  text: '#ffffff',
  background: '#333333',
  danger: '#dc3545', // Custom color
}
```

### Components (`ComponentStyles`)
The `components` object allows you to define default styles for built-in components like `Button`, `Label`, `ProgressBar`, `Toggle`, and `ScrollList`. These values map to CSS properties or special component logic (like nine-slice scaling).

---

## 2. Applying a Theme with `UIProvider`

To use the theming system, you must wrap your component tree (usually the `App` component or your main UI layer) in the `UIProvider`. The `UIProvider` makes the theme available to all descendant components.

If you don't provide a theme explicitly, AnchorDOM falls back to `defaultTheme`.

```tsx
import React from 'react';
import { UIProvider } from './anchordom/context/UIContext';
import { defaultTheme } from './anchordom/theme/defaultTheme';
import App from './App';

const Root = () => {
  return (
    <UIProvider theme={defaultTheme} scale={1}>
      <App />
    </UIProvider>
  );
};
```

---

## 3. Creating a Custom Theme

You can create a custom theme from scratch or by extending the `defaultTheme`. Extending the default theme is the easiest way to override specific components while retaining the default look for others.

### Overriding the Default Theme

```typescript
import { Theme } from '../anchordom/theme/types';
import { defaultTheme } from '../anchordom/theme/defaultTheme';

export const myCustomTheme: Theme = {
  ...defaultTheme,
  name: 'myCustomTheme',
  colors: {
    ...defaultTheme.colors,
    primary: '#ff0000', // Override primary color to red
  },
  components: {
    ...defaultTheme.components,
    button: {
      ...defaultTheme.components.button,
      fontSize: 28,
      color: '#fff',
      backgroundImage: '/assets/custom-button-bg.png',
      backgroundSlice: '12 12 12 12 fill', // Adjusted slice
    },
  },
};
```

Then, pass your custom theme into the `UIProvider`:

```tsx
<UIProvider theme={myCustomTheme}>
  <App />
</UIProvider>
```

---

## 4. Consuming the Theme (`useUIContext`)

When building custom UI components, you can access the current theme using the `useUIContext` hook. This ensures your custom components respond dynamically to theme changes.

```tsx
import React from 'react';
import { useUIContext } from '../anchordom/context/UIContext';

export const ThemedBox = () => {
  const { theme } = useUIContext();

  return (
    <div
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        padding: '20px',
        border: `2px solid ${theme.colors.primary}`,
      }}
    >
      Hello, AnchorDOM!
    </div>
  );
};
```

---

## 5. Nine-Slice Scaling

AnchorDOM makes heavy use of **Nine-Slice Scaling** for components that use background images (like buttons, progress bars, and toggles). This technique allows an image to scale to any width and height without distorting its corners.

In your theme definition, you specify the image path and the slice configuration:
```typescript
button: {
  backgroundImage: '/assets/button-bg.png',
  backgroundSlice: '10 10 10 10 fill', // Top Right Bottom Left + behavior
}
```

Under the hood, AnchorDOM processes this using the `getNineSliceStyle` utility, which generates standard CSS properties (usually `border-image`).

When defining custom components, always extract nine-slice styles independently to avoid "div-soup" (unnecessary DOM wrappers):
```tsx
import { getNineSliceStyle } from '../anchordom/utils/nineSlice';

const sliceStyle = getNineSliceStyle(bgImage, bgSlice);

return <div style={{ ...baseStyle, ...sliceStyle }} />;
```

---

## 6. Asset Preloading

To ensure a smooth user experience, images defined in the theme can be preloaded before the UI is rendered.

The `assets` array in the `Theme` object acts as a manifest.
```typescript
export const defaultTheme: Theme = {
  // ...
  assets: [
    '/assets/button-bg.png',
    '/assets/button-bg-active.png',
    '/assets/progress-track.png',
    // add your custom assets here
  ],
};
```

When building your game or application setup logic, you can map over this `assets` array and preload the images using an `Image` object or a dedicated asset loader before hiding your loading screen.

---

## 7. Safe Areas

When designing for mobile or varying screen aspect ratios, components must respect the device's "safe areas" (e.g., avoiding notches, punch holes, or rounded corners).

AnchorDOM handles safe areas using CSS variables mapped from standard `env()` functions.

1. **CSS Variables Definition**: These are typically defined dynamically on the root container (like the `Panel`) by mapping safe areas:
   ```css
   :root {
     --safe-top: env(safe-area-inset-top, 0px);
     --safe-right: env(safe-area-inset-right, 0px);
     --safe-bottom: env(safe-area-inset-bottom, 0px);
     --safe-left: env(safe-area-inset-left, 0px);
   }
   ```

2. **Integration in Hooks (`useSafeArea`)**: AnchorDOM's hooks read these variables. The logic ensures that safe area offsets are applied dynamically.

3. **Double-Offsetting Prevention**: Safe area logic (`useSafeArea`) is designed to only apply when a component is anchored **directly to the main Panel**. It automatically disables when anchoring relative to another component to prevent pushing UI elements out of bounds by applying the safe area margin twice.
