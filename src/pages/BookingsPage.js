import { Panel } from '../components/common/Panel';
import { BookingForm } from '../features/bookings/BookingForm';
import { BookingsTable } from '../features/bookings/BookingsTable';

export function BookingsPage({ hotelData }) {
  return (
    <section className="workspace">
      <Panel title="Create booking">
        <BookingForm
          guests={hotelData.guests}
          onSubmit={hotelData.createBooking}
          rooms={hotelData.activeRooms}
        />
      </Panel>

      <BookingsTable
        bookings={hotelData.bookings}
        onAction={hotelData.updateBookingStatus}
      />
    </section>
  );
}
