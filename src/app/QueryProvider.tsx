"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const defaultQueryFn = async ({ queryKey }: any) => {
  return fetch(queryKey.join(""))
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }
      return res.json();
    })
    .then((json: any) => {
      if (json.error) {
        throw new Error(`Server responded with ${json.error}`);
      }
      return json;
    });
};

export const queryClient = new QueryClient({
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
