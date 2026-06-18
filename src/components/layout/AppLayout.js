import { APP_ROUTES } from '../../constants/routes';
import { SummaryGrid } from './SummaryGrid';

export function AppLayout({
  activeRoute,
  bookings,
  children,
  guests,
  loading,
  onNavigate,
  onRefresh,
  rooms,
  summary,
}) {
  return (
    <main className="app-shell">
      <section className="topbar">
        <div>
          <p className="eyebrow">Hotel Management System</p>
          <h1>Operations Dashboard</h1>
        </div>
        <button className="secondary-button" type="button" onClick={onRefresh}>
          Refresh
        </button>
      </section>

      <SummaryGrid bookings={bookings} guests={guests} rooms={rooms} summary={summary} />

      <nav className="tabs" aria-label="Dashboard sections">
        {APP_ROUTES.map((route) => (
          <button
            className={activeRoute === route.id ? 'active' : ''}
            key={route.id}
            type="button"
            onClick={() => onNavigate(route.id)}
          >
            {route.label}
          </button>
        ))}
      </nav>

      {loading && <div className="loading">Loading backend data...</div>}
      {children}
    </main>
  );
}
