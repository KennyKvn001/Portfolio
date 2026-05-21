import './SideNavBar.scss';

export function SideNavBar() {
  return (
    <aside className="side-nav-bar hidden lg-flex">
      <div className="nav-items top-items">
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
          <span className="material-symbols-outlined icon">mail</span>
          <span className="label font-label-mono">MAIL</span>
        </div>
      </div>
      
      <div className="nav-items bottom-items">
        <div className="nav-item">
          <span className="material-symbols-outlined icon">settings</span>
          <span className="label font-label-mono">SETTINGS</span>
        </div>
        <div className="avatar-container">
          <img 
            alt="Developer Pixel Avatar" 
            className="avatar-img" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjZBzzthTuESBcNXVYZ2URNh30_y_4-0qEwF9Xm9NZMoPunEhXG-1WGcOhEycEKEhr7dUOgbhrGk60VOtfE3jecaZ7S16cT03phlP6cy0DkbvkJXQ3GXJZ7AbRsZQD3vmLaHADa5bS0fYDISEwFSCN37R8lqRrrNLrnMXc7vJ2MqaB6c3Z3ooFh9ghxwjsvwxWmesKDs2TKdCOOoVQt0MF7-1P-dYVoVSly6jVklOyMliMYAZohHa7bu07yuLhFoCIvo1xt3RXnGcl"
          />
        </div>
      </div>
    </aside>
  );
}
