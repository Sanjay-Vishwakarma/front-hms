import { DataTable } from '../../components/common/DataTable';
import { formatMoney } from '../../utils/currency';
import { BookingActions } from './BookingActions';

export function BookingsTable({ bookings, onAction }) {
  return (
    <DataTable
      columns={['Room', 'Guest', 'Stay', 'Guests', 'Amount', 'Status', 'Actions']}
      rows={bookings.map((booking) => [
        booking.roomNumber,
        booking.guestName,
        `${booking.checkInDate} to ${booking.checkOutDate}`,
        booking.numberOfGuests,
        formatMoney(booking.totalAmount),
        booking.status,
        <BookingActions booking={booking} onAction={onAction} />,
      ])}
    />
  );
}
