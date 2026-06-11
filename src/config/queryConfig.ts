import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retryOnMount: true,
      refetchOnMount: true,
      retry: 1,
      retryDelay: (attemptIndex) => attemptIndex * 1000,
      staleTime: 60000, //1min
      gcTime: 300000, //5min
    },
    mutations: {
      retry: false,
    },
  },
})
