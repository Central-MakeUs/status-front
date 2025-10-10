import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/app/providers/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import RouterProvider from '@/app/providers/RouterProvider';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider />
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
