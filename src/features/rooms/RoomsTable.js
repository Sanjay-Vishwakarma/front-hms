import { DataTable } from '../../components/common/DataTable';
import { formatMoney } from '../../utils/currency';

export function RoomsTable({ onDeactivate, onEdit, rooms }) {
  return (
    <DataTable
      columns={['Room', 'Type', 'Capacity', 'Price', 'Status', 'Actions']}
      rows={rooms.map((room) => [
        room.roomNumber,
        room.type,
        room.capacity,
        formatMoney(room.pricePerNight),
        room.active ? 'Active' : 'Inactive',
        <div className="row-actions">
          <button type="button" onClick={() => onEdit(room)}>
            Edit
          </button>
          {room.active && (
            <button className="danger-button" type="button" onClick={() => onDeactivate(room.id)}>
              Deactivate
            </button>
          )}
        </div>,
      ])}
    />
  );
}
