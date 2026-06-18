import { formatMoney } from '../../utils/currency';
import { SummaryCard } from './SummaryCard';

export function SummaryGrid({ guests, rooms, summary }) {
  const activeRooms = rooms.filter((room) => room.active);

  return (
    <section className="summary-grid" aria-label="Hotel summary">
      <SummaryCard label="Rooms" value={rooms.length} helper={`${activeRooms.length} active`} />
      <SummaryCard label="Guests" value={guests.length} helper="Registered profiles" />
      <SummaryCard label="Bookings" value={summary?.totalBookings || 0} helper={`${summary?.activeBookings || 0} active`} />
      <SummaryCard label="Revenue" value={formatMoney(summary?.confirmedRevenue)} helper={`${summary?.cancelledBookings || 0} cancelled`} />
    </section>
  );
}
