import { useState, useRef } from 'react';
import { Panel } from './anchordom/components/Panel';
import { Button, Label, ProgressBar, Toggle, ScrollList, Image } from './anchordom/components/kit';

function App() {
  const [progress, setProgress] = useState(0.5);
  const [toggled, setToggled] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  return (
    <Panel useSafeArea={true}>
      <Label
        anchor="TOP_CENTER"
        y={50}
        text="AnchorDOM Demo"
        style={{ fontSize: 48, color: '#ffeb3b' }}
      />

      <Button
        ref={buttonRef}
        anchor="MIDDLE_CENTER"
        label="Click Me!"
        onClick={() => setProgress(p => (p + 0.1) % 1.1)}
      />

      <Label
        targetRef={buttonRef}
        anchor="BOTTOM_CENTER"
        text="Relative Anchor"
        y={10}
      />

      <ProgressBar
        anchor="BOTTOM_CENTER"
        y={-50}
        progress={progress}
        width={400}
      />

      <Toggle
        anchor="TOP_LEFT"
        x={50}
        y={50}
        toggled={toggled}
        onToggle={setToggled}
      />

      <Image
        anchor="TOP_RIGHT"
        x={-50}
        y={50}
        src="/assets/logo.png"
        width={128}
        height={128}
        alt="Logo"
      />

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
