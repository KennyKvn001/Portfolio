import { useEffect, useState } from 'react';
import './Hero.scss';

export function Hero() {
  const [uptime, setUptime] = useState('00:00:00:00');

  useEffect(() => {
    let seconds = 0;
    const interval = setInterval(() => {
      seconds++;
      const d = Math.floor(seconds / (3600 * 24)).toString().padStart(2, '0');
      const h = Math.floor((seconds % (3600 * 24)) / 3600).toString().padStart(2, '0');
      const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
      const s = Math.floor(seconds % 60).toString().padStart(2, '0');
      setUptime(`${d}:${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-section">

      {/* Foreground Content */}
      <div className="content-container z-10">
        <div className="status-line">
          <div className="status-dot"></div>
          <p className="font-label-mono uppercase tracking-widest">
            SYSTEM_STATUS: <span className="text-primary">OPERATIONAL</span>
          </p>
        </div>

        <h1 className="font-display-lg text-primary tracking-tighter leading-none mb-4">
          PX_DEV.SYS<span className="terminal-cursor"></span>
        </h1>

        <div className="hero-details">
          <h2 className="font-headline-xl text-secondary uppercase border-left-secondary">
            FULLSTACK<br />ARCHITECT
          </h2>
          <div className="hero-desc">
            <p className="font-body-lg text-on-surface-variant mb-8">
              Building deterministic digital infrastructures through precise pixel-grid alignment and low-level system design.
            </p>
            <div className="hero-actions">
              <button className="primary-btn pixel-shadow pixel-shadow-hover bg-primary text-on-primary font-label-mono transition-all">
                INITIALIZE_PROJECTS
                <span className="material-symbols-outlined icon">arrow_forward</span>
              </button>
              <button className="secondary-btn border-primary text-primary font-label-mono transition-colors">
                VIEW_SOURCE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid Overlay / Info Bar */}
      <div className="info-bar z-20">
        <div className="loc-info">
          <div className="loc-dots">
            <span className="dot bg-primary"></span>
            <span className="dot bg-secondary-container"></span>
            <span className="dot bg-secondary-container"></span>
          </div>
          <p className="font-label-mono text-xs text-outline">LOC: 37.7749° N, 122.4194° W</p>
        </div>
        
        <div className="sys-info font-label-mono text-xs text-outline uppercase tracking-widest">
          <div className="info-block">
            <span className="text-primary-fixed-dim">VERSION</span>
            <span>2.0.4-STABLE</span>
          </div>
          <div className="info-block">
            <span className="text-primary-fixed-dim">CONNECTION</span>
            <span>ENCRYPTED_AES</span>
          </div>
          <div className="info-block">
            <span className="text-primary-fixed-dim">UPTIME</span>
            <span>{uptime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
