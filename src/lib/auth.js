export async function registerUser(payload) {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  return response.json();
}

export async function loginUser(payload) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  return response.json();
}

export async function getCurrentUser() {
  const response = await fetch('/api/auth/me', {
    method: 'GET',
    credentials: 'include',
  });

  return response.json();
}

export async function logoutUser() {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });

  return response.json();
}
