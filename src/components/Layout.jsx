import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

const clientNavItems = [
  { to: '/', label: 'Dashboard', icon: 'grid' },
  { to: '/profile', label: 'My Profile', icon: 'brain' },
  { to: '/learn', label: 'Academy', icon: 'academy' },
  { to: '/services', label: 'Services', icon: 'briefcase' },
  { to: '/projects', label: 'Projects', icon: 'folder' },
  { to: '/financial', label: 'Financial', icon: 'wallet' },
  { to: '/help', label: 'Help Desk', icon: 'help' },
];

const adminNavItems = [
  { to: '/', label: 'Command Center', icon: 'grid' },
  { to: '/admin/clients', label: 'Clients', icon: 'users' },
  { to: '/admin/projects', label: 'Projects', icon: 'folder' },
  { to: '/admin/invoices', label: 'Invoices', icon: 'wallet' },
  { to: '/admin/tickets', label: 'Tickets', icon: 'help' },
  { to: '/admin/coaching', label: 'Coaching', icon: 'heart' },
];

const clientQuickLinks = [
  { to: '/profile', label: 'My Profile', icon: 'brain' },
  { to: '/learn', label: 'Academy', icon: 'academy' },
  { to: '/services', label: 'Services', icon: 'briefcase' },
  { to: '/projects', label: 'My Projects', icon: 'folder' },
  { to: '/financial', label: 'Financial', icon: 'wallet' },
  { to: '/help', label: 'Help Desk', icon: 'help' },
];

const icons = {
  grid: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  brain: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a8 8 0 0 0-8 8c0 3.4 2.1 6.3 5 7.4V20h6v-2.6c2.9-1.1 5-4 5-7.4a8 8 0 0 0-8-8z" />
      <path d="M9 10h6" /><path d="M9 14h6" /><path d="M12 10v4" />
    </svg>
  ),
  briefcase: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  folder: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),
  wallet: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  help: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  users: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  heart: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  menu: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  academy: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  close: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

export default function Layout({ client, isAdmin, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const primaryNav = isAdmin ? adminNavItems : clientNavItems;

  return (
    <div className="layout">
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      <aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__header">
          <div className="sidebar__brand">
            <img src={logo} alt="FreedomHub" className="sidebar__logo-img" />
            <span className="sidebar__brand-text">FreedomHub</span>
          </div>
          <button className="sidebar__close" onClick={() => setSidebarOpen(false)}>
            {icons.close}
          </button>
        </div>

        <nav className="sidebar__nav">
          {isAdmin && <div className="sidebar__section-label">Admin</div>}
          {primaryNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              {icons[item.icon]}
              <span>{item.label}</span>
            </NavLink>
          ))}

          {isAdmin && (
            <>
              <div className="sidebar__section-label">My Portal</div>
              {clientQuickLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {icons[item.icon]}
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </>
          )}
        </nav>

        <div className="sidebar__footer">
          <div className="sidebar__client">
            <div className="sidebar__avatar">
              {client?.name?.charAt(0)?.toUpperCase() || client?.businessName?.charAt(0)?.toUpperCase() || 'C'}
            </div>
            <div className="sidebar__client-info">
              <span className="sidebar__client-name">{client?.businessName || client?.company || client?.name}</span>
              <span className="sidebar__client-email">{client?.email}</span>
            </div>
          </div>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <button className="topbar__menu" onClick={() => setSidebarOpen(true)}>
            {icons.menu}
          </button>
          <div className="topbar__title">
            <h1>{isAdmin ? 'Command Center' : 'Client Portal'}</h1>
          </div>
          <div className="topbar__right">
            <span className="topbar__client">{client?.businessName || client?.company || client?.name}</span>
          </div>
        </header>

        <main className="content">{children}</main>
      </div>
    </div>
  );
}
