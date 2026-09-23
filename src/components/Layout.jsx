import { NavLink } from 'react-router-dom';

const NAV = [
  { to: '/', label: 'Accueil', icon: '⌂' },
  { to: '/apprendre', label: 'Apprendre', icon: '◈' },
  { to: '/entrainement', label: "S'entraîner", icon: '✎' },
  { to: '/erreurs', label: 'Mes erreurs', icon: '⚠' },
  { to: '/a-revoir', label: 'À revoir', icon: '↻' },
  { to: '/defi', label: 'Défi transversal', icon: '⬡' },
  { to: '/concours', label: 'Mode concours', icon: '⏱' },
  { to: '/oral', label: 'Oral', icon: '◐' },
  { to: '/projet', label: 'Mon projet', icon: '✺' },
  { to: '/progression', label: 'Progression', icon: '↗' },
];

export default function Layout({ profile, children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100%' }}>
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">AT</span>
          <div>
            <div className="brand-title">Prépa Concours</div>
            <div className="brand-sub">AgroTIC → Bordeaux SA</div>
          </div>
        </div>
        <nav className="nav-list">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}
            >
              <span className="nav-icon" aria-hidden>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        {profile?.prenom && (
          <div className="sidebar-profile">Connecté·e en tant que <strong>{profile.prenom}</strong></div>
        )}
      </aside>

      <main className="main-content">
        <div className="main-inner">{children}</div>
      </main>

      <nav className="mobile-nav" aria-label="Navigation principale">
        {NAV.slice(0, 5).map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => 'mobile-nav-item' + (isActive ? ' active' : '')}
          >
            <span aria-hidden>{item.icon}</span>
            <span className="mobile-nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <style>{`
        .sidebar {
          width: var(--sidebar-width);
          background: var(--color-primary);
          color: #EDF3ED;
          display: flex;
          flex-direction: column;
          padding: 24px 16px;
          position: sticky;
          top: 0;
          height: 100vh;
        }
        .brand { display: flex; align-items: center; gap: 10px; margin-bottom: 28px; padding: 0 8px; }
        .brand-mark {
          width: 36px; height: 36px; border-radius: 10px;
          background: var(--color-accent);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-display); font-weight: 700; color: #fff; font-size: 0.9rem;
        }
        .brand-title { font-family: var(--font-display); font-weight: 600; font-size: 0.98rem; color: #fff; }
        .brand-sub { font-size: 0.72rem; color: #B9CFC2; }
        .nav-list { display: flex; flex-direction: column; gap: 2px; flex: 1; }
        .nav-item {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 10px; border-radius: 8px;
          color: #D9E8DF; text-decoration: none; font-size: 0.88rem; font-weight: 500;
        }
        .nav-item:hover { background: rgba(255,255,255,0.08); }
        .nav-item.active { background: rgba(255,255,255,0.14); color: #fff; }
        .nav-icon { width: 18px; text-align: center; opacity: 0.9; }
        .sidebar-profile { font-size: 0.75rem; color: #B9CFC2; padding: 10px 8px 0; border-top: 1px solid rgba(255,255,255,0.12); margin-top: 10px; }
        .main-content { flex: 1; min-width: 0; }
        .main-inner { max-width: 980px; margin: 0 auto; padding: 32px 28px 96px; }

        .mobile-nav { display: none; }

        @media (max-width: 860px) {
          .sidebar { display: none; }
          .main-inner { padding: 20px 16px 90px; }
          .mobile-nav {
            display: flex; position: fixed; bottom: 0; left: 0; right: 0;
            background: var(--color-surface); border-top: 1px solid var(--color-border);
            justify-content: space-around; padding: 6px 2px calc(6px + env(safe-area-inset-bottom, 0px));
            z-index: 20;
          }
          .mobile-nav-item {
            display: flex; flex-direction: column; align-items: center; gap: 2px;
            color: var(--color-text-muted); text-decoration: none; font-size: 0.62rem;
            padding: 4px 4px; flex: 1;
          }
          .mobile-nav-item.active { color: var(--color-primary); font-weight: 700; }
          .mobile-nav-label { max-width: 60px; text-align: center; line-height: 1.1; }
        }
      `}</style>
    </div>
  );
}
