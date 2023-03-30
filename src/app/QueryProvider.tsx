/**Author: Olexiy Prokhvatylo B00847680 */

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { QueryKey } from "@tanstack/react-query";

const defaultQueryFn = async ({ queryKey }: { queryKey: QueryKey }) => {
  return fetch(queryKey.join(""))
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }
      return res.json();
    })
    .then((json: { error: string }) => {
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

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
