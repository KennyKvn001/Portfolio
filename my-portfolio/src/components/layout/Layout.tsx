import type { ReactNode } from 'react';
import { TopNavBar } from './TopNavBar';
import PixelBlast from './PixelBlast';
import './Layout.scss';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
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
      <div className="main-wrapper">
        {children}
      </div>
    </div>
  );
}
