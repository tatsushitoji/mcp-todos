"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // 追加
import { useState, PropsWithChildren } from "react";

export function QueryProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
