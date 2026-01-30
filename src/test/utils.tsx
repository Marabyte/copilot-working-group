import type { ReactNode } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a custom render function that includes necessary providers
export function renderWithProviders(
  ui: ReactNode,
  {
    queryClient,
    ...renderOptions
  }: RenderOptions & {
    queryClient?: QueryClient;
  } = {}
) {
  function Wrapper({ children }: { children: ReactNode }) {
    if (!queryClient) {
      return <>{children}</>;
    }
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}
