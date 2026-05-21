import type { ReactNode } from 'react';
import { TopNavBar } from './TopNavBar';
import { SideNavBar } from './SideNavBar';
import { MobileNav } from './MobileNav';
import './Layout.scss';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="layout-container">
      <TopNavBar />
      <SideNavBar />
      <div className="main-wrapper">
        {children}
      </div>
      <MobileNav />
    </div>
  );
}
