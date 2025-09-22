import useSWR from "swr";
import type { PaginatedResult } from "@/shared/types/pagination";
import type { Role } from "./role";

export type RolesQuery = {
  page: number;
  pageSize: number;
  q?: string;
  sortOrder?: "asc" | "desc";
};

function key({ page, pageSize, q, sortOrder }: RolesQuery) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (sortOrder) params.set("sortOrder", sortOrder);
  return `/api/v1/roles/${page}/${pageSize}?` + params.toString();
}

export function useRolesList(query: RolesQuery) {
  const k = key(query);
  const { data, error, isLoading, mutate } = useSWR<PaginatedResult<Role>>(k);
  return { data, error, isLoading, mutate };
}
