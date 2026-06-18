import { apiRequest } from './client';

export const hotelApi = {
  getRooms: () => apiRequest('/api/rooms'),
  createRoom: (payload) => apiRequest('/api/rooms', postOptions(payload)),
  updateRoom: (id, payload) => apiRequest(`/api/rooms/${id}`, putOptions(payload)),
  deactivateRoom: (id) => apiRequest(`/api/rooms/${id}`, { method: 'DELETE' }),

  getAvailableRooms: ({ checkInDate, checkOutDate, type }) => {
    const params = new URLSearchParams({ checkInDate, checkOutDate });

    if (type) {
      params.append('type', type);
    }

    return apiRequest(`/api/rooms/available?${params.toString()}`);
  },

  getGuests: () => apiRequest('/api/guests'),
  createGuest: (payload) => apiRequest('/api/guests', postOptions(payload)),
  updateGuest: (id, payload) => apiRequest(`/api/guests/${id}`, putOptions(payload)),

  getBookings: () => apiRequest('/api/bookings'),
  createBooking: (payload) => apiRequest('/api/bookings', postOptions(payload)),
  checkInBooking: (id) => apiRequest(`/api/bookings/${id}/check-in`, { method: 'POST' }),
  checkOutBooking: (id) => apiRequest(`/api/bookings/${id}/check-out`, { method: 'POST' }),
  cancelBooking: (id) => apiRequest(`/api/bookings/${id}/cancel`, { method: 'POST' }),
  getSummary: () => apiRequest('/api/bookings/summary'),
};

function postOptions(payload) {
  return {
    method: 'POST',
    body: JSON.stringify(payload),
  };
}

function putOptions(payload) {
  return {
    method: 'PUT',
    body: JSON.stringify(payload),
  };
}
