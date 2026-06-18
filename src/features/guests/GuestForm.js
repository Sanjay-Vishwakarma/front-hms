import { useEffect, useState } from 'react';
import { Field } from '../../components/common/Field';
import { EMPTY_GUEST } from '../../constants/forms';

export function GuestForm({ editingGuest, onCancelEdit, onSubmit }) {
  const [form, setForm] = useState(EMPTY_GUEST);

  useEffect(() => {
    if (editingGuest) {
      setForm({
        fullName: editingGuest.fullName,
        email: editingGuest.email,
        phone: editingGuest.phone,
        idProof: editingGuest.idProof || '',
      });
    } else {
      setForm(EMPTY_GUEST);
    }
  }, [editingGuest]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const saved = await onSubmit(form);

    if (saved) {
      setForm(EMPTY_GUEST);
    }
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <Field label="Full name">
        <input
          required
          value={form.fullName}
          onChange={(event) => setForm({ ...form, fullName: event.target.value })}
        />
      </Field>
      <Field label="Email">
        <input
          required
          type="email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
        />
      </Field>
      <Field label="Phone">
        <input
          required
          value={form.phone}
          onChange={(event) => setForm({ ...form, phone: event.target.value })}
        />
      </Field>
      <Field label="ID proof">
        <input
          value={form.idProof}
          onChange={(event) => setForm({ ...form, idProof: event.target.value })}
        />
      </Field>
      <div className="form-actions">
        <button type="submit">{editingGuest ? 'Update guest' : 'Create guest'}</button>
        {editingGuest && (
          <button className="ghost-button" type="button" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
