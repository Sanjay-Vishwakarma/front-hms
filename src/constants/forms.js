import { today } from '../utils/date';

export const ROOM_TYPES = ['SINGLE', 'DOUBLE', 'DELUXE', 'SUITE'];

export const EMPTY_ROOM = {
  roomNumber: '',
  type: 'SINGLE',
  capacity: 1,
  pricePerNight: 1800,
};

export const EMPTY_GUEST = {
  fullName: '',
  email: '',
  phone: '',
  idProof: '',
};

export const EMPTY_BOOKING = {
  roomId: '',
  guestId: '',
  checkInDate: today(),
  checkOutDate: '',
  numberOfGuests: 1,
};

export const EMPTY_AVAILABILITY_SEARCH = {
  checkInDate: today(),
  checkOutDate: '',
  type: '',
};
