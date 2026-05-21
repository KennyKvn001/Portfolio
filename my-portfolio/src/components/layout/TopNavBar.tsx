import './TopNavBar.scss';

export function TopNavBar() {
  return (
    <nav className="top-nav-bar">
      <div className="brand font-headline-lg text-primary tracking-tighter font-bold">
        PX_DEV.SYS
      </div>
      
      <div className="nav-links hidden md-flex">
        <a href="#stack" className="nav-link font-label-mono">STK/OVR</a>
        <a href="#projects" className="nav-link font-label-mono active">PRJ/LOG</a>
        <a href="#experience" className="nav-link font-label-mono">EXP/DIR</a>
        <a href="#contact" className="nav-link font-label-mono">CNT/INF</a>
      </div>

      <button className="resume-btn bg-primary text-on-primary font-label-mono pixel-shadow pixel-shadow-hover transition-all">
        RESUME.BAT
      </button>
    </nav>
  );
}
