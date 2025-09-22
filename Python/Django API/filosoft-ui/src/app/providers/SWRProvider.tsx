import { SWRConfig } from "swr";
import { fetcher } from "@/shared/api/http";

export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={{ fetcher, shouldRetryOnError: true, errorRetryCount: 2 }}>
      {children}
    </SWRConfig>
  );
}
