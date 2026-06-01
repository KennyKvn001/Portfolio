import { Button } from '../ui/Button';
import './TopNavBar.scss';

export function TopNavBar() {
  return (
    <nav className="top-nav-bar">
      <div className="brand font-headline-lg text-primary tracking-tighter font-bold">
        KENNY_KEVIN.MUG
      </div>
      
      <div className="nav-links hidden md-flex">
        <a href="#stack" className="nav-link font-label-mono">STK/OVR</a>
        <a href="#about" className="nav-link font-label-mono">ABT/ME</a>
        <a href="#projects" className="nav-link font-label-mono active">PRJ/LOG</a>
        <a href="#contact" className="nav-link font-label-mono">CNT/INF</a>
      </div>

      <Button variant="primary">RESUME.BAT</Button>
    </nav>
  );
}
