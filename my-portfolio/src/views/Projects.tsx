import { useEffect, useRef } from 'react';
import { Button } from '../components/ui/Button';
import './Projects.scss';

const projects = [
  {
    id: '01',
    title: 'SYSTEM_01',
    desc: 'Low-latency packet inspection engine built for distributed node clusters. Optimized for ARM64 architecture.',
    tags: ['RUST', 'WASM'],
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfaafnVYPer0bnhMk7-A_tQjFFJbcMzP50qsSyhF62orO2oOkExEV_cJ6Pu1zOMfsDK8EUXrURURm0lltTBZrlVzKRn2HGEAXZ8DzY_ZC4S10jB1tOWAbAducHE_esvvG7-35SB92WjpLzVCtYXOqZ1MjXdx3AbXcZ-i5n3IPxf2zTI0mkEY5BVqSfVyP4RgKboWyFkcMb_oI4vtEGRrGRUpUXH9IuPN_UZ1FHwUmHv62urZf_kAxe9qv8qAY4jnxi_nbRyHQiSew3',
    icon: 'database',
  },
  {
    id: '02',
    title: 'CORE_API',
    desc: 'Scalable GraphQL gateway orchestration layer with automated schema stitching and sub-millisecond resolution.',
    tags: ['GO', 'K8S'],
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDw2kBBvmqDQvQz1PVYhZop7-uuGPFS42-5HueKwLEjS8GoBC6RdSJ8tNDPnYuoe6iicNeqc60MJErpjN9oUcYVxgDS4QfkW6zC_xG9PtUVHz_s5rC4iQpxJqEKLPr-GIKDwklXrspvp-DMcvzDCLBSmwjVaOzQx3yLkCTJVw308FGNcF-kWHP2JBDC_GERphSvCnKmsvj6BcJkylXzf23YXh0jVvWDpPkRpLzKPGKYeeMfQ4lE0KmoHLQ_VESxij-WIzXJPIq9HQEB',
    icon: 'hub',
  },
  {
    id: '03',
    title: 'HEX_V0.1',
    desc: 'Custom reactive UI framework leveraging shadow-DOM-less rendering for maximum performance on embedded devices.',
    tags: ['TS', 'GLSL'],
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjxWhJzVqmToIVErxn58eLGJombKw46juyITemWTSPbP_DmpLCbYmIbHnnzs0_TpZo07CLjXONYVcWbaHz1kw62tb93y3KJnz9SCR0x8IaI-jPUkDc0hFwzYtGt2vz4QsJ1fBL3xIUYJxAUNeWeTQwJw9v93H4wBItdjoNXorsnX0kUV9Dpr26N-QblviJxTZBfcQXXR5svUYXjhRboVpG6MpJszjlpRcN6PFSku0-MSH8MFGt3I7wSvX33mhzAhZmj7_1oVucVDxd',
    icon: 'grid_4x4',
  },
  {
    id: '04',
    title: 'OBS_LOG',
    desc: 'E2E observability platform with real-time stack tracing and automated anomaly detection for microservices.',
    tags: ['ELIXIR', 'BEAM'],
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaOcb2Pln1tf5BLuF_eJ9A98k76aMffIygD6QLoVmIywmCYaXFbf1e69zXhIsYB3hokfk6PWX_wk_aKEGLR9SubvJISYMI-Qf5JhusHUkOUmRtJtSESQ2UGZxJPpBAvdU3fzxhszj48aVP2Hq7AXTw9V9Kd8AZOH43tEcTJanbymXy4sQ0UqViHgKUCTNv7Zf5F5bOinkIxMvG9pt28i0n1dvijzGXBkzSHR24t2Uk5BlUh6eRwWq0kx0Aopm6dxny2pfr7cmKtgqX',
    icon: 'visibility',
  }
];

export function Projects() {
  const scrollRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollRef.current) {
        // Only scroll horizontally if user is scrolling vertically over this section
        if (e.deltaY !== 0) {
          e.preventDefault();
          scrollRef.current.scrollLeft += e.deltaY;
        }
      }
    };
    
    const element = scrollRef.current;
    if (element) {
      element.addEventListener('wheel', handleWheel, { passive: false });
    }
    
    return () => {
      if (element) {
        element.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className="projects-view">
      <header className="projects-header">
        <div className="title-wrapper">
          <h1 className="font-headline-xl text-primary tracking-tighter">// LATEST_BUILDS</h1>
          <span className="font-label-mono text-primary opacity-50 text-sm">[ SESSION_04_PROJECTS ]</span>
        </div>
      </header>

      <section ref={scrollRef} className="projects-showcase custom-scrollbar">
        {projects.map(proj => (
          <article key={proj.id} className="project-card group">
            <div className="card-header">
              <h2 className="font-label-mono text-primary">{proj.title}</h2>
              <span className="indicator-dot bg-primary"></span>
            </div>
            
            <div className="card-image-wrapper">
              <img className="project-img group-hover-img" src={proj.imgUrl} alt={proj.title} />
              <div className="icon-overlay group-hover-icon">
                <span className="material-symbols-outlined text-primary icon">{proj.icon}</span>
              </div>
            </div>

            <div className="card-body">
              <p className="font-body-md text-on-surface-variant desc">
                {proj.desc}
              </p>
              <div className="tags">
                {proj.tags.map(tag => (
                  <span key={tag} className="tag font-label-sm">{tag}</span>
                ))}
              </div>
              <Button variant="secondary" fullWidth>
                VIEW_LOG
              </Button>
            </div>
          </article>
        ))}
      </section>

      <footer className="projects-footer bg-surface-container-lowest">
        <div className="footer-left">
          <div className="status-indicator">
            <span className="dot bg-primary animate-pulse"></span>
            <span className="font-label-mono text-label-sm uppercase opacity-60">LINK_ESTABLISHED: 127.0.0.1</span>
          </div>
          <div className="env-indicator hidden md-block font-label-mono text-label-sm uppercase opacity-40">
            ENV: PRODUCTION_STABLE
          </div>
        </div>
        <div className="page-indicator font-label-mono text-label-sm">
          PAGE <span className="text-primary">01</span> / 04
        </div>
      </footer>
    </div>
  );
}
