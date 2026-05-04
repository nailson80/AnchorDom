# Layout Cookbook: Advanced Recipes

Game UIs often require complex relationships between elements. Here is how to use AnchorDOM to solve common game layout challenges.

---

## 🍳 Recipe 1: The Relative Overlay (Health Bar)
**Goal:** Attach a dynamic health bar perfectly to the bottom of a player portrait, ensuring it stays attached even if the portrait moves.

**Solution:** Use the `targetRef` to anchor the `ProgressBar` relative to the `Image`.

```tsx
import React, { useRef } from 'react';
import { Image, ProgressBar, Label } from 'anchordom/kit';

export const PlayerFrame = () => {
  const avatarRef = useRef<HTMLImageElement>(null);

  return (
    <>
      {/* 1. The Parent anchored to the screen */}
      <Image 
        ref={avatarRef} 
        src="/assets/hero-avatar.png" 
        anchor="TOP_LEFT" 
        x={20} y={20} 
        useSafeArea 
      />

      {/* 2. The Bar anchored to the Avatar */}
      <ProgressBar 
        targetRef={avatarRef} 
        anchor="BOTTOM_CENTER" 
        y={10} // Nudge it 10px below the avatar
        progress={75} 
      />
    </>
  );
};
```

---

## 🍳 Recipe 2: The Scrollable Inventory (ConstraintSpacer)
**Goal:** You have a fixed Header and a fixed Footer. You want an inventory window to perfectly fill the space between them without overlapping, no matter what size monitor the player has.

**Solution:** Use `<ConstraintSpacer>` to bridge the gap, and place a `<ScrollList>` inside it.

```tsx
import React, { useRef } from 'react';
import { Label, Button, ConstraintSpacer, ScrollList } from 'anchordom/kit';

export const InventoryScreen = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* Fixed Top Element */}
      <Label ref={headerRef} text="INVENTORY" anchor="TOP_CENTER" y={50} />

      {/* Fixed Bottom Element */}
      <Button ref={footerRef} label="CLOSE" anchor="BOTTOM_CENTER" y={-50} />

      {/* Dynamic Bridging Element */}
      <ConstraintSpacer 
        topTargetRef={headerRef}
        bottomTargetRef={footerRef}
        topOffset={20}    // 20px margin below header
        bottomOffset={20} // 20px margin above footer
        minHeight={300}   // Don't shrink smaller than 300px
      >
        <ScrollList width="100%" height="100%">
           {/* Your inventory items go here */}
           <ItemGrid />
        </ScrollList>
      </ConstraintSpacer>
    </>
  );
};
```

---

## 🍳 Recipe 3: Notch-Safe HUD (useSafeArea)
**Goal:** Ensure UI elements don't get hidden behind the iPhone "Dynamic Island" or Android camera notches.

**Solution:** Simply pass the `useSafeArea` flag to your absolute components. AnchorDOM will automatically inject `env(safe-area-inset-*)` CSS calculations.

```tsx
// This button will automatically push itself down by exactly 
// the height of the device notch, PLUS your 20px offset.
<Button 
  label="PAUSE" 
  anchor="TOP_RIGHT" 
  x={-20} y={20} 
  useSafeArea 
/>
```