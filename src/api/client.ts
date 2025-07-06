const BASE_URL = import.meta.env.VITE_API_URL || '';

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

const request = async <T = unknown>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  let queryString = '';

  if (options.params) {
    const params = new URLSearchParams(options.params);
    queryString = `?${params.toString()}`;
  }

  if (options.headers) {
    if (options.headers instanceof Headers) {
      options.headers.forEach((value, key) => {
        headers[key] = value;
      });
    } else if (Array.isArray(options.headers)) {
      options.headers.forEach(([key, value]) => {
        headers[key] = value;
      });
    } else {
      Object.assign(headers, options.headers);
    }
  }

  const response = await fetch(`${BASE_URL}${endpoint}${queryString}`, {
    ...options,
    headers,
  });

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
