import { useCallback, useMemo, useState } from 'react';
import { hotelApi } from '../api/hotelApi';

export function useHotelData() {
  const [rooms, setRooms] = useState([]);
  const [guests, setGuests] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [summary, setSummary] = useState(null);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const activeRooms = useMemo(() => rooms.filter((room) => room.active), [rooms]);

  const showNotice = useCallback((message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 3000);
  }, []);

  const runAction = useCallback(async (action, successMessage) => {
    setError('');

    try {
      const result = await action();
      if (successMessage) {
        showNotice(successMessage);
      }
      return result;
    } catch (apiError) {
      setError(apiError.message);
      return null;
    }
  }, [showNotice]);

  const refreshAll = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const [roomsData, guestsData, bookingsData, summaryData] = await Promise.all([
        hotelApi.getRooms(),
        hotelApi.getGuests(),
        hotelApi.getBookings(),
        hotelApi.getSummary(),
      ]);

      setRooms(roomsData);
      setGuests(guestsData);
      setBookings(bookingsData);
      setSummary(summaryData);
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createRoom = useCallback(async (room) => {
    const saved = await runAction(() => hotelApi.createRoom(normalizeRoom(room)), 'Room created');
    if (saved) refreshAll();
    return saved;
  }, [refreshAll, runAction]);

  const updateRoom = useCallback(async (id, room) => {
    const saved = await runAction(() => hotelApi.updateRoom(id, normalizeRoom(room)), 'Room updated');
    if (saved) refreshAll();
    return saved;
  }, [refreshAll, runAction]);

  const deactivateRoom = useCallback(async (id) => {
    const saved = await runAction(() => hotelApi.deactivateRoom(id), 'Room deactivated');
    refreshAll();
    return saved;
  }, [refreshAll, runAction]);

  const searchAvailability = useCallback(async (criteria) => {
    const results = await runAction(() => hotelApi.getAvailableRooms(criteria));
    if (results) {
      setAvailableRooms(results);
      showNotice(`${results.length} room(s) available`);
    }
    return results;
  }, [runAction, showNotice]);

  const createGuest = useCallback(async (guest) => {
    const saved = await runAction(() => hotelApi.createGuest(guest), 'Guest created');
    if (saved) refreshAll();
    return saved;
  }, [refreshAll, runAction]);

  const updateGuest = useCallback(async (id, guest) => {
    const saved = await runAction(() => hotelApi.updateGuest(id, guest), 'Guest updated');
    if (saved) refreshAll();
    return saved;
  }, [refreshAll, runAction]);

  const createBooking = useCallback(async (booking) => {
    const saved = await runAction(() => hotelApi.createBooking(normalizeBooking(booking)), 'Booking created');
    if (saved) refreshAll();
    return saved;
  }, [refreshAll, runAction]);

  const updateBookingStatus = useCallback(async (id, action) => {
    const actions = {
      'check-in': hotelApi.checkInBooking,
      'check-out': hotelApi.checkOutBooking,
      cancel: hotelApi.cancelBooking,
    };

    const saved = await runAction(() => actions[action](id), 'Booking updated');
    if (saved) refreshAll();
    return saved;
  }, [refreshAll, runAction]);

  return {
    activeRooms,
    availableRooms,
    bookings,
    createBooking,
    createGuest,
    createRoom,
    deactivateRoom,
    error,
    guests,
    loading,
    notice,
    refreshAll,
    rooms,
    searchAvailability,
    summary,
    updateBookingStatus,
    updateGuest,
    updateRoom,
  };
}

function normalizeRoom(room) {
  return {
    ...room,
    capacity: Number(room.capacity),
    pricePerNight: Number(room.pricePerNight),
  };
}

function normalizeBooking(booking) {
  return {
    ...booking,
    roomId: Number(booking.roomId),
    guestId: Number(booking.guestId),
    numberOfGuests: Number(booking.numberOfGuests),
  };
}
