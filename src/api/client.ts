import { getCookie } from '@/utils/cookie';
import { refreshAccessToken } from '@/api/auth';

const BASE_URL = import.meta.env.VITE_API_URL || '';

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
  _retry?: boolean;
}

const request = async <T = unknown>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  let queryString = '';

  if (options.params) {
    const params = new URLSearchParams(options.params);
    queryString = `?${params.toString()}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}${queryString}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (response.status === 401 && !options._retry) {
    const refreshToken = getCookie('refreshToken');

    if (refreshToken) {
      await refreshAccessToken();
      return request(endpoint, {
        ...options,
        _retry: true,
      });
    } else {
      const currentPath = window.location.pathname;
      window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
    }
  }

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  try {
    return await response.json();
  } catch {
    return undefined as T;
  }
};

export const api = {
  get: <T = unknown>(endpoint: string, options?: RequestOptions): Promise<T> =>
    request<T>(endpoint, { ...options, method: 'GET' }),

  post: <T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> =>
    request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> =>
    request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),

  patch: <T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> =>
    request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T = unknown>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> => request<T>(endpoint, { ...options, method: 'DELETE' }),
} as const;
