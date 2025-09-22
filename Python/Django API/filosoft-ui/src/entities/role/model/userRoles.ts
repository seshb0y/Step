import useSWR from "swr";
import type { Role } from "./role";

export function useAllRoles() {
  const { data, error, isLoading } = useSWR<Role[]>("/api/v1/auth/roles");
  return { data, error, isLoading };
}
