import { useState } from 'react';
import { Panel } from '../components/common/Panel';
import { GuestForm } from '../features/guests/GuestForm';
import { GuestsTable } from '../features/guests/GuestsTable';

export function GuestsPage({ hotelData }) {
  const [editingGuest, setEditingGuest] = useState(null);

  const submitGuest = (guest) => {
    if (editingGuest) {
      return hotelData.updateGuest(editingGuest.id, guest).then((saved) => {
        if (saved) setEditingGuest(null);
        return saved;
      });
    }

    return hotelData.createGuest(guest);
  };

  return (
    <section className="workspace">
      <Panel title={editingGuest ? 'Update guest' : 'Add guest'}>
        <GuestForm
          editingGuest={editingGuest}
          onCancelEdit={() => setEditingGuest(null)}
          onSubmit={submitGuest}
        />
      </Panel>

      <GuestsTable guests={hotelData.guests} onEdit={setEditingGuest} />
    </section>
  );
}
