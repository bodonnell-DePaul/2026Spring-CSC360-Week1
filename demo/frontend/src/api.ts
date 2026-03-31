import type { AuthResponse, Profile, ProjectItem } from './types';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5080/api';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers ?? {});
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const contentType = response.headers.get('content-type');
    const message = contentType?.includes('application/json')
      ? (await response.json()).message ?? 'Request failed'
      : await response.text();
    throw new Error(message || 'Request failed');
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export function getProfile() {
  return request<Profile>('/portfolio/profile');
}

export function getProjects() {
  return request<ProjectItem[]>('/portfolio/projects');
}

export function submitContact(payload: { name: string; email: string; message: string }) {
  return request<{ message: string }>('/portfolio/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function login(payload: { email: string; password: string }) {
  return request<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateProfile(token: string, payload: Omit<Profile, 'id'>) {
  return request<Profile>('/portfolio/profile', {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
}

export function createProject(token: string, payload: Omit<ProjectItem, 'id'>) {
  return request<ProjectItem>('/portfolio/projects', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
}
