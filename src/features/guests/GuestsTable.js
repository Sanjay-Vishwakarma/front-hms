import { DataTable } from '../../components/common/DataTable';

export function GuestsTable({ guests, onEdit }) {
  return (
    <DataTable
      columns={['Name', 'Email', 'Phone', 'ID proof', 'Actions']}
      rows={guests.map((guest) => [
        guest.fullName,
        guest.email,
        guest.phone,
        guest.idProof || '-',
        <div className="row-actions">
          <button type="button" onClick={() => onEdit(guest)}>
            Edit
          </button>
        </div>,
      ])}
    />
  );
}
