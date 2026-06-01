import { useEffect, useRef, type ReactNode } from 'react';
import { TopNavBar } from './TopNavBar';
import PixelBlast from './PixelBlast';
import { attachHorizontalSectionWheel } from './attachHorizontalSectionWheel';
import './Layout.scss';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const mainScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mainScrollRef.current;
    if (!container) {
      return;
    }

    return attachHorizontalSectionWheel(container);
  }, []);

  return (
    <div className="layout-container">
      <div className="global-bg-container">
        <PixelBlast
          variant="triangle"
          pixelSize={5}
          color="var(--color-pixel-grid)"
          patternScale={1.75}
          patternDensity={1.45}
          pixelSizeJitter={0.55}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid={false}
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.5}
          edgeFade={0.17}
          transparent
        />
      </div>
      <TopNavBar />
      <div ref={mainScrollRef} className="main-wrapper custom-scrollbar">
        {children}
      </div>
    </div>
  );
}
