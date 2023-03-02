"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const defaultQueryFn = async ({ queryKey }: any) => {
  const response = await fetch(queryKey.join(''));

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
