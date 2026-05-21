import './MobileNav.scss';

export function MobileNav() {
  return (
    <div className="mobile-nav hidden-md">
      <div className="nav-item">
        <span className="material-symbols-outlined icon">grid_view</span>
        <span className="label font-label-mono">INDEX</span>
      </div>
      <div className="nav-item active">
        <span className="material-symbols-outlined icon filled">terminal</span>
        <span className="label font-label-mono">CODE</span>
      </div>
      <div className="nav-item">
        <span className="material-symbols-outlined icon">terminal</span>
        <span className="label font-label-mono">WORK</span>
      </div>
      <div className="nav-item">
        <span className="material-symbols-outlined icon">settings</span>
        <span className="label font-label-mono">SETTINGS</span>
      </div>
    </div>
  );
}
