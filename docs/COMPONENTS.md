# AnchorDOM Component API Reference

All visual components in AnchorDOM share a common set of positioning props called `BaseComponentProps`. 

## 🏗️ Base Positioning Props
AnchorDOM uses TypeScript Discriminated Unions to prevent impossible layouts. You must choose either **Absolute** or **Relative** positioning.

### Absolute Mode (Anchored to the Screen)
* `anchor` *(string)*: One of the 9 points (e.g., `'TOP_LEFT'`, `'MIDDLE_CENTER'`).
* `x` *(number)*: Horizontal offset in virtual pixels. Default `0`.
* `y` *(number)*: Vertical offset in virtual pixels. Default `0`.
* `useSafeArea` *(boolean)*: If true, the component avoids hardware notches.

### Relative Mode (Anchored to another Component)
* `targetRef` *(React.RefObject)*: The HTML element to anchor to.
* `anchor` *(string)*: Which corner/side of the *target* to anchor to.
* `x` / `y` *(number)*: Offsets applied *after* the relative position is calculated.
* *(Note: `useSafeArea` is strictly disabled by TypeScript in this mode to prevent double-offsetting).*

---

## 📦 The Component Kit

### `<Panel>`
The root provider that scales your UI and manages themes.
* `resolution`: `{ width: number, height: number }` (Required)
* `theme`: `Theme` object (Required)
* `useSafeArea`: `boolean` (Applies global CSS variables for device notches)
* `children`: `ReactNode`

### `<Button>`
A clickable UI element with 9-slice background support.
* `label`: `string` (Optional text inside the button)
* `onClick`: `() => void`
* `disabled`: `boolean` (Reduces opacity and disables clicks)
* *Inherits `BaseComponentProps`*

### `<Label>`
Scalable text component.
* `text`: `string` (Required)
* *Inherits `BaseComponentProps`*

### `<Image>`
Standard game sprite renderer.
* `src`: `string` (Required)
* `width` / `height`: `number` (Optional virtual dimensions)
* *Inherits `BaseComponentProps`*

### `<ProgressBar>`
A two-part component (Track and Fill) supporting 3-slice textures.
* `progress`: `number` (0 to 100)
* *Inherits `BaseComponentProps`*

### `<Toggle>`
A binary switch with an animated handle.
* `checked`: `boolean`
* `onChange`: `(checked: boolean) => void`
* *Inherits `BaseComponentProps`*

### `<ScrollList>`
A clipped container for overflowing content.
* `children`: `ReactNode`
* `width` / `height`: `number | string`
* *Inherits `BaseComponentProps`*

### `<ConstraintSpacer>`
An invisible layout helper that dynamically calculates its height between two targets.
* `topTargetRef`: `React.RefObject` (Required)
* `bottomTargetRef`: `React.RefObject` (Required)
* `topOffset`: `number` (Margin pushing away from the top target)
* `bottomOffset`: `number` (Margin pushing away from the bottom target)
* `minHeight`: `number` (The floor height before it stops shrinking)
* `width`: `string | number` (Default: `'100%'`)