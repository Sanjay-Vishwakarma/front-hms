import { useMemo } from 'react';
import './App.css';
import { Alert } from './components/common/Alert';
import { AppLayout } from './components/layout/AppLayout';
import { APP_ROUTES } from './constants/routes';
import { useAppRoute } from './hooks/useAppRoute';
import { useHotelData } from './hooks/useHotelData';
import { BookingsPage } from './pages/BookingsPage';
import { GuestsPage } from './pages/GuestsPage';
import { RoomsPage } from './pages/RoomsPage';

function App() {
  const { activeRoute, navigate } = useAppRoute(APP_ROUTES);
  const hotelData = useHotelData();

  const activePage = useMemo(() => {
    const pages = {
      rooms: <RoomsPage hotelData={hotelData} />,
      guests: <GuestsPage hotelData={hotelData} />,
      bookings: <BookingsPage hotelData={hotelData} />,
    };

    return pages[activeRoute] || pages.rooms;
  }, [activeRoute, hotelData]);

  return (
    <AppLayout
      activeRoute={activeRoute}
      bookings={hotelData.bookings}
      guests={hotelData.guests}
      loading={hotelData.loading}
      onNavigate={navigate}
      onRefresh={hotelData.refreshAll}
      rooms={hotelData.rooms}
      summary={hotelData.summary}
    >
      {hotelData.error && <Alert tone="error">{hotelData.error}</Alert>}
      {hotelData.notice && <Alert tone="success">{hotelData.notice}</Alert>}
      {activePage}
    </AppLayout>
  );
}

export default App;
