import type { ReactNode } from 'react';
import { TopNavBar } from './TopNavBar';
import { SideNavBar } from './SideNavBar';
import { MobileNav } from './MobileNav';
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
          color="#684024"
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
      <SideNavBar />
      <div className="main-wrapper">
        {children}
      </div>
      <MobileNav />
    </div>
  );
}
