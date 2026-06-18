import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    const payload = url.includes('/summary') ? {
      totalBookings: 0,
      activeBookings: 0,
      cancelledBookings: 0,
      confirmedRevenue: 0,
    } : [];

    return Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(payload),
    });
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders hotel dashboard', async () => {
  render(<App />);
  expect(screen.getByText(/operations dashboard/i)).toBeInTheDocument();
  expect(await screen.findByText(/registered profiles/i)).toBeInTheDocument();
});
