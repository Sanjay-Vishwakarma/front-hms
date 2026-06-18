import { useState } from 'react';
import { Panel } from '../components/common/Panel';
import { AvailabilitySearch } from '../features/rooms/AvailabilitySearch';
import { RoomForm } from '../features/rooms/RoomForm';
import { RoomsTable } from '../features/rooms/RoomsTable';

export function RoomsPage({ hotelData }) {
  const [editingRoom, setEditingRoom] = useState(null);

  const submitRoom = (room) => {
    if (editingRoom) {
      return hotelData.updateRoom(editingRoom.id, room).then((saved) => {
        if (saved) setEditingRoom(null);
        return saved;
      });
    }

    return hotelData.createRoom(room);
  };

  return (
    <section className="workspace">
      <Panel title={editingRoom ? 'Update room' : 'Add room'}>
        <RoomForm
          editingRoom={editingRoom}
          onCancelEdit={() => setEditingRoom(null)}
          onSubmit={submitRoom}
        />
      </Panel>

      <Panel title="Find available rooms">
        <AvailabilitySearch
          availableRooms={hotelData.availableRooms}
          onSearch={hotelData.searchAvailability}
        />
      </Panel>

      <RoomsTable
        onDeactivate={hotelData.deactivateRoom}
        onEdit={setEditingRoom}
        rooms={hotelData.rooms}
      />
    </section>
  );
}
