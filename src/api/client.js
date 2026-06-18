const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8091';

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

async function getErrorMessage(response) {
  const fallback = response.statusText || `Request failed with status ${response.status}`;

  try {
    const payload = await response.json();
    return payload.details?.join(', ') || payload.error || fallback;
  } catch (parseError) {
    return fallback;
  }
}
