import './About.scss';

const featureCards = [
  {
    icon: 'architecture',
    title: 'LOGIC',
    description: 'Structured architectural systems designed for scale.',
  },
  {
    icon: 'data_object',
    title: 'CODE',
    description: 'Type-safe, performant implementation of complex flows.',
  },
  {
    icon: 'tag',
    title: 'DESIGN',
    description: 'Pixel-perfect interfaces with meticulous grid alignment.',
  },
] as const;

const techStack = ['TYPESCRIPT', 'RUST', 'GO', 'REACT'] as const;

const chartBars = [42, 68, 36, 82, 54, 74] as const;

export function About() {
  return (
    <div className="about-view">
      <div className="about-container container">
        <div className="about-grid">
          <div className="about-left">
            <div className="status-line">
              <div className="status-dot" />
              <p className="font-label-mono uppercase tracking-widest">
                STATUS: <span className="text-primary">ONLINE</span>
              </p>
            </div>

            <h1 className="font-headline-xl text-primary tracking-tight uppercase">
              // ABOUT_ME
            </h1>

            <p className="bio font-body-lg text-on-surface-variant">
              A fullstack developer focused on technical precision and aesthetic utility.
              I bridge the gap between low-level systems architecture and high-fidelity
              digital environments, treating every line of code as a permanent artifact.
            </p>

            <div className="feature-cards">
              {featureCards.map((card) => (
                <article key={card.title} className="feature-card">
                  <span className="material-symbols-outlined card-icon">{card.icon}</span>
                  <h3 className="font-label-mono text-primary">{card.title}</h3>
                  <p className="font-body-md text-on-surface-variant">{card.description}</p>
                </article>
              ))}
            </div>

            <div className="about-meta">
              <div className="meta-block">
                <span className="meta-label font-label-mono">TECH_STACK</span>
                <div className="tech-pills">
                  {techStack.map((tech) => (
                    <span key={tech} className="tech-pill font-label-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="meta-block location-block">
                <span className="meta-label font-label-mono">LOCATION</span>
                <span className="location-value font-label-mono text-primary">
                  REMOTE_HUB_01
                </span>
              </div>
            </div>
          </div>

          <div className="about-divider" aria-hidden="true" />

          <div className="about-right">
            <div className="terminal-panel">
              <div className="terminal-titlebar">
                <div className="window-controls">
                  <div className="control-dot control-dot--dim" />
                  <div className="control-dot control-dot--mid" />
                  <div className="control-dot control-dot--bright" />
                </div>
                <span className="terminal-filename font-label-mono">RENDER_ENGINE.sh</span>
              </div>

              <div className="terminal-content font-label-mono">
                <p className="terminal-line">
                  <span className="text-primary">$</span> systemctl status developer_core
                </p>
                <p className="text-on-surface-variant">[ OK ] loaded development protocols</p>
                <p className="text-on-surface-variant">[ OK ] verified pixel-grid alignment</p>
                <p className="text-on-surface-variant">[ OK ] optimized memory footprint</p>

                <p className="terminal-line terminal-line--spaced">
                  <span className="text-primary">$</span> cat philosophy.txt
                </p>
                <p className="philosophy-quote text-on-surface-variant">
                  &quot;In the architecture of code, the constraints are the poetry. I don&apos;t
                  just build features; I engineer durable digital systems that respect both the
                  machine and the eye.&quot;
                </p>

                <div className="chart-area">
                  <div className="chart-grid" />
                  <div className="chart-axis chart-axis--horizontal" />
                  <div className="chart-axis chart-axis--vertical" />
                  <div className="chart-bars">
                    {chartBars.map((height, index) => (
                      <div
                        key={index}
                        className="chart-bar"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <img
                className="motherboard-img"
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=320&q=80&auto=format&fit=crop"
                alt="Circuit board hardware"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
