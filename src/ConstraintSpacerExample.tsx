import { useRef } from 'react';
import { Panel } from './anchordom/components/Panel';
import { Label, ConstraintSpacer, ScrollList } from './anchordom/components/kit';

function ConstraintSpacerExample() {
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  return (
    <Panel useSafeArea={true} designWidth={1920} designHeight={1080}>
      {/* Top Anchor */}
      <Label
        ref={topRef}
        anchor="TOP_CENTER"
        y={50}
        text="Top Anchor"
        style={{ fontSize: 48, background: '#222', padding: 20, color: '#fff' }}
      />

      {/* Bottom Anchor */}
      <Label
        ref={bottomRef}
        anchor="BOTTOM_CENTER"
        y={-50}
        text="Bottom Anchor"
        style={{ fontSize: 48, background: '#222', padding: 20, color: '#fff' }}
      />

      {/* Dynamic Spacer filling the gap */}
      <ConstraintSpacer
        topTargetRef={topRef}
        bottomTargetRef={bottomRef}
        topOffset={20}
        bottomOffset={20}
        width={600}
        anchor="TOP_CENTER"
        style={{ pointerEvents: 'auto' }}
      >
        {/* Child inherits the spacer's height and position constraints */}
        <ScrollList
          anchor="TOP_CENTER"
          width="100%"
          height="100%"
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} style={{ padding: 20, background: i % 2 === 0 ? '#444' : '#555', color: 'white' }}>
              Dynamic Content {i + 1}
            </div>
          ))}
        </ScrollList>
      </ConstraintSpacer>
    </Panel>
  );
}

export default ConstraintSpacerExample;