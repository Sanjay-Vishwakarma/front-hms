import { useEffect, useState } from 'react';
import { Field } from '../../components/common/Field';
import { EMPTY_ROOM, ROOM_TYPES } from '../../constants/forms';

export function RoomForm({ editingRoom, onCancelEdit, onSubmit }) {
  const [form, setForm] = useState(EMPTY_ROOM);

  useEffect(() => {
    if (editingRoom) {
      setForm({
        roomNumber: editingRoom.roomNumber,
        type: editingRoom.type,
        capacity: editingRoom.capacity,
        pricePerNight: editingRoom.pricePerNight,
      });
    } else {
      setForm(EMPTY_ROOM);
    }
  }, [editingRoom]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const saved = await onSubmit(form);

    if (saved) {
      setForm(EMPTY_ROOM);
    }
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <Field label="Room number">
        <input
          required
          value={form.roomNumber}
          onChange={(event) => setForm({ ...form, roomNumber: event.target.value })}
        />
      </Field>
      <Field label="Type">
        <select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })}>
          {ROOM_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Capacity">
        <input
          min="1"
          required
          type="number"
          value={form.capacity}
          onChange={(event) => setForm({ ...form, capacity: event.target.value })}
        />
      </Field>
      <Field label="Price per night">
        <input
          min="1"
          required
          type="number"
          value={form.pricePerNight}
          onChange={(event) => setForm({ ...form, pricePerNight: event.target.value })}
        />
      </Field>
      <div className="form-actions">
        <button type="submit">{editingRoom ? 'Update room' : 'Create room'}</button>
        {editingRoom && (
          <button className="ghost-button" type="button" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
