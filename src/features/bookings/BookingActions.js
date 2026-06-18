export function BookingActions({ booking, onAction }) {
  if (booking.status === 'RESERVED') {
    return (
      <div className="row-actions">
        <button type="button" onClick={() => onAction(booking.id, 'check-in')}>
          Check in
        </button>
        <button className="danger-button" type="button" onClick={() => onAction(booking.id, 'cancel')}>
          Cancel
        </button>
      </div>
    );
  }

  if (booking.status === 'CHECKED_IN') {
    return (
      <div className="row-actions">
        <button type="button" onClick={() => onAction(booking.id, 'check-out')}>
          Check out
        </button>
        <button className="danger-button" type="button" onClick={() => onAction(booking.id, 'cancel')}>
          Cancel
        </button>
      </div>
    );
  }

  return <span className="muted">Closed</span>;
}
