import { useState } from 'react';
import { Field } from '../../components/common/Field';
import { EMPTY_AVAILABILITY_SEARCH, ROOM_TYPES } from '../../constants/forms';
import { formatMoney } from '../../utils/currency';

export function AvailabilitySearch({ availableRooms, onSearch }) {
  const [form, setForm] = useState(EMPTY_AVAILABILITY_SEARCH);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(form);
  };

  return (
    <>
      <form className="form-grid" onSubmit={handleSubmit}>
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
        <Field label="Type">
          <select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })}>
            <option value="">Any</option>
            {ROOM_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>
        <div className="form-actions">
          <button type="submit">Search</button>
        </div>
      </form>

      <div className="mini-list">
        {availableRooms.map((room) => (
          <span key={room.id}>
            {room.roomNumber} | {room.type} | {formatMoney(room.pricePerNight)}
          </span>
        ))}
      </div>
    </>
  );
}
