import { useState } from 'react';
import { Field } from '../../components/common/Field';
import { EMPTY_BOOKING } from '../../constants/forms';

export function BookingForm({ guests, onSubmit, rooms }) {
  const [form, setForm] = useState(EMPTY_BOOKING);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const saved = await onSubmit(form);

    if (saved) {
      setForm(EMPTY_BOOKING);
    }
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <Field label="Room">
        <select required value={form.roomId} onChange={(event) => setForm({ ...form, roomId: event.target.value })}>
          <option value="">Select room</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.roomNumber} | {room.type}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Guest">
        <select required value={form.guestId} onChange={(event) => setForm({ ...form, guestId: event.target.value })}>
          <option value="">Select guest</option>
          {guests.map((guest) => (
            <option key={guest.id} value={guest.id}>
              {guest.fullName}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Check-in">
        <input
          required
          type="date"
          value={form.checkInDate}
          onChange={(event) => setForm({ ...form, checkInDate: event.target.value })}
        />
      </Field>
      <Field label="Check-out">
        <input
          required
          type="date"
          value={form.checkOutDate}
          onChange={(event) => setForm({ ...form, checkOutDate: event.target.value })}
        />
      </Field>
      <Field label="Guests">
        <input
          min="1"
          required
          type="number"
          value={form.numberOfGuests}
          onChange={(event) => setForm({ ...form, numberOfGuests: event.target.value })}
        />
      </Field>
      <div className="form-actions">
        <button type="submit">Create booking</button>
      </div>
    </form>
  );
}
